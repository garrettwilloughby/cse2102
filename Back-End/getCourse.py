# Given a courseid (parition key of Courses table) it retrieves 
# detailed info (description, prereqs, capacity, etc)

import json
import boto3

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    
    
    data = client.query(
        TableName = 'Courses',
        KeyConditionExpression='courseid = :value',
        ExpressionAttributeValues={':value': {'S': event["courseid"]}}
        )
    return {
        'statusCode': 200,
        'body': json.dumps(data)
    }
