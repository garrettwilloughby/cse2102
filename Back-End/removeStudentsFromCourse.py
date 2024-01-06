# Given a courseid and a username, remove the student from
# a course's list of enrolled students. It also decrements the
# current capacity of the course upon successful removal

import json
import boto3

client = boto3.client('dynamodb')




def lambda_handler(event, context):
    
    # Query database for access to course capacity and enrolled students
    data = client.query(
        TableName='Courses',
        KeyConditionExpression='courseid = :value',
        ExpressionAttributeValues={
            ':value': {'S': event["courseid"]}
        }
        )
        
    listStudents = data['Items'][0]['enrolledStudents']['L']
    curr_cap = data['Items'][0]['curr_cap']['N']
    max_cap = data['Items'][0]['max_cap']['N']
    print(listStudents)
    
    # Check to make sure the student is actually enrolled (should be, but just in case we'll send back a 400 error....)
    # If so, remove from list
    studentFound = False;
    for student in listStudents:
        if event["username"] == student['S']:
            studentFound = True;
            listStudents.remove({'S': event["username"]})
    if (studentFound == False):
        return {
                'statusCode': 400,
                'body': json.dumps('Could not find student in course enrollment list')
        }
        
    print("List students:", listStudents)
    new_curr_cap = int(curr_cap) - 1
    # Remove student from course roster and decrement course capacity on DynamoDB 
    response = client.update_item(
        TableName = "Courses",
        Key = {
            "courseid": {
                "S": event["courseid"]
            }
        },
        UpdateExpression="SET enrolledStudents = :listStudents, curr_cap = :new_cap",
        ExpressionAttributeValues={
            ":listStudents": {
                "L": listStudents
            },
            ":new_cap": {
                "N": str(new_curr_cap)
            }
        },
        )
        
    print("RESPONSE:", response)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successfully removed student')
    }
