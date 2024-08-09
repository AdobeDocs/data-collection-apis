## Play event request

The Play event is sent when the media player changes its state to "playing" from another state, such as "buffering," "paused," or "error." To make a Play event request, use your `sessionId` in the payload of a call to the following endpoint:

**POST**  `https://edge.adobedc.net/ee-pre-prd/va/v1/play \`

### Example request

The following example shows a Play cURL request:

```curl
curl -X 'POST' \
  'https://edge.adobedc.net/ee-pre-prd/va/v1/play' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "events": [
    {
      "xdm": {
        "eventType": "media.play",
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

The successful respone indicates a status of 200 and does not include any content.

For more information on Play endpoint parameters and examples, see the [Media Edge Swagger](swagger.md) file.