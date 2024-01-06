# Given a courseid (Courses table partition key) and student username (Users table partition key),
# this function accesses the Courses DB and appends the student to a list of students enrolled in the course.

# Checks to make sure the course is not at max capacity; and, just in case, also checks
# to make sure the student isn't already enrolled (however, this check was implemented in 
# a different lambda function by Garrett, so this is uneccessary)

# If successful, also increments the current course capacity



import json
import boto3

client = boto3.client('dynamodb')




def lambda_handler(event, context):
    courseid = event.get("courseid")
    if not courseid:
        return {
            "statusCode": 400,
            "body": json.dumps("Missing or empty 'courseid' parameter")
        }
    # Query database for access to course capacity and enrolled students
    data = client.query(
        TableName='Courses',
        KeyConditionExpression='#courseid = :value',
        ExpressionAttributeNames={
            '#courseid': 'courseid'
        },
        ExpressionAttributeValues={
            ':value': {'S': event["courseid"]}
        }
    )
        
    listStudents = data['Items'][0]['enrolledStudents']['L']
    curr_cap = data['Items'][0]['curr_cap']['N']
    max_cap = data['Items'][0]['max_cap']['N']
    print("Curr cap:", curr_cap)
    print("Max cap:", max_cap)
    
    
    # Check to make sure the student isn't already enrolled
    for student in listStudents:
        if event["username"] == student['S']:
            return {
                'statusCode': 400,
                'body': json.dumps('Student is already enrolled in this course.')
            }
    
    
    # Check to make sure the course is not at max capacity
    if curr_cap == max_cap:
        return {
            'statusCode': 401,
            'body': json.dumps('Failed to add student. Course is at max capacity')
        }
        
    new_curr_cap = int(curr_cap) + 1
    print(new_curr_cap)
    # If not at max capacity and student is not enrolled, add him to the course roster (enrolledStudents)
    response = client.update_item(
        TableName = "Courses",
        Key = {
            "courseid": {
                "S": event["courseid"]
            }
        },
        UpdateExpression="SET enrolledStudents = list_append(enrolledStudents, :student), curr_cap = :new_cap",
        ExpressionAttributeValues={
        ":student": {
            "L": [
                {"S": event["username"]}
            ]
        },
        ":new_cap": {
            "N": str(new_curr_cap)
        }
        },
        )
        
    print(response)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successfully added student')
    }