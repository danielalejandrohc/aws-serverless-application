import boto3, logging, json


def lambda_handler(event, context):
    logging.getLogger().setLevel(logging.INFO)
    logging.info('looking at event {}'.format(event))

    # Access to dynamodb and entities table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('generic-entities')
    response = None

    code = ''

    if 'queryStringParameters' in event:
        logging.info('looking at queryStringParameters {}'.format(event['queryStringParameters']))
        method = event['httpMethod']

        if method == 'GET':
            try:
                if 'pathParameters' in event:
                    code = event['pathParameters']['code']
            except Exception as e:
                code = ''

            if code == '':
                # Read data from database
                response = table.scan(
                    Select="ALL_ATTRIBUTES",
                )
            else:
                response = table.get_item(
                    Key={
                        'code': code
                    }
                )

        if method == 'PUT':
            # Create object based on the payload
            body = event['body']
            table.put_item(
                Item = json.loads(body)
            )
    else:
        code = ''

    logging.info('looking at dynamodb {}'.format(response))

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : "true"
        },
        "body": json.dumps(response),
        #"body": "parameteer: " + json.dumps(event) + ", query parameteer " + str(code) ,
        #"body": "method " + (method) + " body " + body,
        "isBase64Encoded": 'false'
    }
