## Session Complete event request

The Session Complete event is sent when the end of the main content is reached. To make a Session Complete event request, use your `sessionId` in the payload of a call to the following endpoint:

**POST**  `https://edge.adobedc.net/ee-pre-prd/va/v1/sessionComplete \`

### Example request

The following example shows a Session Complete cURL request:

```curl
curl -X 'POST' \
  'https://edge.adobedc.net/ee-pre-prd/va/v1/sessionComplete' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "events": [
    {
      "xdm": {
        "eventType": "media.sessionComplete",
        "mediaCollection": {
          "sessionID": "af8bb22766e458fa0eef98c48ea42c9e351c463318230e851a19946862020333",
          "playhead": 25
        },
        "timestamp": "YYYY-03-04T13:39:00+00:00"
      }
    }
  ]
}'
```

The successful respone indicates a status of 200 and does not include any content.

For more information on Session Complete endpoint parameters and examples, see the [Media Edge Swagger](swagger.md) file.