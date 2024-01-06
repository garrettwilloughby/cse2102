import json
import boto3

client = boto3.client('dynamodb')

Table = 'User'
Index = 'username'


def lambda_handler(event, context):
    try:

        data = client.query(
            TableName=Table,
            KeyConditionExpression='username = :value',
            ExpressionAttributeValues={
                ':value': {
                    'S': event['username']
                }

            }
        )
        response = {
            'statusCode': 200,
            'body': json.dumps(data),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'

            },

        }
    except KeyError as e:
        response = {
            'statusCode': 400,
            'body': json.dumps({'error': f'Missing required parameter: {str(e)}'}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            }
        }

    return response
