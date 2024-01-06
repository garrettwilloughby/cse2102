# Adds a Course to the Courses DB table.

# Checks to make sure the required fields are filled out before continuing
# Also checks to make sure that the course doesn't already exists (by checking
# the Courses DB using the given courseid, which is the parition key)


import boto3

client = boto3.client('dynamodb')


def lambda_handler(event, context):
    
    # Check if required fields have values
    required_fields = ["courseid", "course_name", "course_description", "instructor", "credits", "max_cap", "location", "schedule"]
    for field in required_fields:
        if field not in event or not event[field] or event[field] == '':
            return {
                'statusCode': 400,
                'body': f'Missing or empty value for {field}',
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            }
            
    # Check to make sure the course isn't a duplicate
    dup_check = client.query(
        TableName='Courses',
        KeyConditionExpression='courseid = :courseid',
        ExpressionAttributeValues={
            ':courseid': {'S': event["courseid"]
            }
        }
        )
        
    # dup_check will either have a list of course attributes, or an empty list
    if len(dup_check['Items']) > 0:
        fail = {
            'statusCode': 401,
            'body': 'Course already exists!',
            'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        }
        return fail
    
    
    # Prereqs should be separated by comma in input form, want to have each as its own string within the prereqs list in DB
    prereq = [pre.strip() for pre in event["prereq"].split(',') if pre.strip()]
    data = client.put_item(
        TableName='Courses',
        Item={
            'courseid': {
                'S': event["courseid"]
            },
            'course_name': {
                'S': event["course_name"]
            },
            'course_description': {
                'S': event["course_description"]
            },
            'instructor': {
                'S': event["instructor"]
            },
            "enrolledStudents": {
                "L": []
            },
            'credits': {
                'N': event["credits"]
            },
            'curr_cap': {
                'N': "0"
            },
            'max_cap': {
                'N': event["max_cap"]
            },
            'location': {
                'S': event["location"]
            },
            'prereq': {
                'L': [{'S': pre} for pre in prereq]
            },
            'schedule': event["schedule"],
            'enrolledStudents': {
                "L": []
            }
        })
        
    response = {
        'statusCode': 200,
        'body': 'Successfully added a course to the Courses DB',
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }
    
    return response