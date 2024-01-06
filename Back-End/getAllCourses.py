# A simple scan to retrieve all items in the Courses DB.

# These items are parsed in the web app, and their relevant info is displayed
# as needed.


import json
import boto3

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    response = client.scan(
        TableName = "Courses"
        )
    items = response['Items']
    return {
        'statusCode': 200,
        'body': json.dumps(items)
    }