## Buffer Start event request

The Buffer Start event signals when buffering starts on the media player. Buffer Resume is not an event in the API service; instead, it is inferred when a play event is sent after the Buffer Start. To make a Buffer Start event request, use your `sessionId` in the payload of a call to the following endpoint:

**POST**  `https://edge.adobedc.net/ee-pre-prd/va/v1/bufferStart \`

### Example request

The following example shows a Buffer Start cURL request:

```curl
curl -X 'POST' \
  'https://edge.adobedc.net/ee-pre-prd/va/v1/bufferStart' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "events": [
    {
      "xdm": {
        "eventType": "media.bufferStart",
        "mediaCollection": {
          "sessionID": "af8bb22766e458fa0eef98c48ea42c9e351c463318230e851a19946862020333",
          "playhead": 25
        },
        "timestamp": "2022-03-04T13:39:00+00:00"
      }
    }
  ]
}'
```

In the example request above, the same `sessionId` that is returned in the previous call is used as the required parameter in the Buffer Start request.

The successful respone indicates a status of 200 and does not include any content.

For more information on the Buffer Start endpoint parameters and examples, see the [Media Edge Swagger](swagger.md) file.