# Although it's called get STUDENT SCHEDULE, it can retrieve the course info
# necessary to display for any user. This allows Students and Instructors to view the courses they 
# are taking/teaching in the Schedule views in our web app (which parses
# the info and displays it in a block schedule format)


import json
import boto3
import http.client

client=boto3.client('dynamodb')


def lambda_handler(event, context):
    
    student_courses = {}
    
    api_host = 'zdofbsyu1g.execute-api.us-east-1.amazonaws.com'
    api_endpoint = '/test?username=' + event["username"]
    # Create an HTTPS connection
    connection = http.client.HTTPSConnection(api_host)

    try:
        connection.request("GET", api_endpoint)
        response = connection.getresponse()

        if response.status == 200:
            api_response = json.loads(response.read().decode())
            body_json = json.loads(api_response.get("body", "{}"))

            items_list = body_json.get("Items", [])

            if items_list:
                # Access the "courses" field directly
                courses_list = items_list[0].get("courses", {}).get('L', [])

                # Iterate through each course item
                for course_item in courses_list:
                    if 'S' in course_item:
                        course_id = course_item['S']
                        print("Course ID:", course_id)
                        student_courses[course_id] = None
                    else:
                        print("Error: 'S' key not found in course_item.")
        else:
            print(f"Error: {response.status} - {response.read().decode()}")
    except Exception as e:
        # Print an error message if an exception occurs
        print(f"Error: {str(e)}")
    finally:
        connection.close()
        
        
        
    #print("STUDENT_COURSES:", student_courses)
    
    for course in student_courses:
        if (course != "hojdoisjoipoipd"):
            data = client.query(
                TableName = 'Courses',
                KeyConditionExpression='courseid = :value',
                ExpressionAttributeValues={':value': {'S': course}}
            )
            schedule = data.get('Items', [])[0].get('schedule', {}).get('M', None)
            student_courses[course] = schedule
        
    
    print("STUDENT_COURSES:", student_courses)
        

    return {
        'statusCode': 200,
        'body': student_courses
    }
    
