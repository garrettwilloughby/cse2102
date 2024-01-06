import json
import boto3

client = boto3.client('dynamodb')


def lambda_handler(event, context):
    # Retrieve parameters from the event
    username = event.get('username', None)
    current_credits = event.get('currentCredits', None)
    total_credits = event.get('totalCredits', None)
    courses = event.get('Courses', [])

    if not username or current_credits is None or total_credits is None:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Missing required parameters'}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }

    # Convert 'Courses' to the expected format (a list of dictionaries)
    courses_list = [{'S': course} for course in courses]

    data = client.update_item(
        TableName='User',
        Key={
            'username': {
                'S': username,
            }
        },
        AttributeUpdates={
            'currentCredits': {
                'Value': {
                    'N': str(current_credits),
                },
                'Action': 'PUT'
            },
            'totalCredits': {
                'Value': {
                    'N': str(total_credits),
                },
                'Action': 'PUT'
            },
            'courses': {
                'Value': {
                    'L': courses_list,
                },
                'Action': 'PUT'
            }
        }
    )

    response = {
        'statusCode': 200,
        'body': json.dumps(data),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }
    return response
