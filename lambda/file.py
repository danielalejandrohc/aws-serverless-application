import boto3, logging, json


def lambda_handler(event, context):
    logging.getLogger().setLevel(logging.INFO)
    logging.info('looking at event {}'.format(event))

    # Access to dynamodb and entities table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('generic-entities')
    response = None

    code = ' '

    if 'queryStringParameters' in event:
        logging.info('looking at queryStringParameters {}'.format(event['queryStringParameters']))
        method = event['httpMethod']

        if method == 'GET':
            # Read data from database
            response = table.scan(
                Select="ALL_ATTRIBUTES",
            )
            # Read specific code of entity
            try:
                if 'code' in event['queryStringParameters']:
                    code = event['queryStringParameters']['code']
            except:
                code = ''

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
