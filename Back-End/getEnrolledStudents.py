# This function returns a list of students enrolled in a Course. It is used
# in the Instructor View, so that instructors can view the students currently
# enrolled in courses they are teaching.

import json
import boto3

client=boto3.client('dynamodb')

def lambda_handler(event, context):
    
    data = client.query(
        TableName = 'Courses',
        KeyConditionExpression = 'courseid = :value',
        ExpressionAttributeValues={':value': {'S': event["courseid"]}}
        )
        
    print("Data:", data)
    print(data['Items'][0]['enrolledStudents'])
    return {
        'statusCode': 200,
        'body': data['Items'][0]['enrolledStudents']
    }
