import json
import boto3

client = boto3.client('dynamodb')

Table = 'User'
Index = 'role-index'


def lambda_handler(event, context):
    try:
        data = client.query(
            TableName=Table,
            IndexName=Index,
            KeyConditionExpression='#schoolRole = :value',
            ExpressionAttributeNames={'#schoolRole': 'schoolRole'},
            ExpressionAttributeValues={
                ':value': {
                    'S': event['schoolRole']
                }
            },
            ScanIndexForward=False
        )

        response = {
            'statusCode': 200,
            'body': json.dumps(data),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }

    except KeyError as e:
        response = {
            'statusCode': 400,
            'body': json.dumps({'error': f'Missing required parameter: {str(e)}'}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

    return response
