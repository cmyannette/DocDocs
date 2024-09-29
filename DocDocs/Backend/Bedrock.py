import boto3
import json

bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-west-2')

with open('C:\\Users\\carte\\OneDrive\\Documents\\HackMidwest\\DocDocs\\output.txt', 'r') as file:
    file_contents = file.read()

prompt = "You are a medical professional who is in charge of generate official SOAP style notes. Generate notes for the following transcript: " + file_contents

kwargs = {
  "modelId": "anthropic.claude-3-5-sonnet-20240620-v1:0",
  "contentType": "application/json",
  "accept": "application/json",
  "body": json.dumps({
    "anthropic_version": "bedrock-2023-05-31",
    "max_tokens": 1000,
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": prompt
          }
        ]
      }
    ]
  })
}

response = bedrock_runtime.invoke_model(**kwargs)

body = json.loads(response['body'].read())

print(body)