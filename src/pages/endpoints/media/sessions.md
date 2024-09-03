---
title: Session endpoints
description: Handle the session state for a visitor.
---
# Session endpoints

Session endpoints handle the session state of a visitor. Once a session is created, it expires if any of the following are met:

* No events are received for 10 minutes
* No playhead movement happens for 30 minutes
* The `sessionEnd` endpoint is called

<InlineAlert variant="error" slots="text" />

If you use a session ID that is either invalid or expired, that data is irretrievably lost! 

## `sessionStart`

The `sessionstart` endpoint creates a media tracking session for a visitor. A successful response includes a session ID, which is required for all other endpoints. Make sure that you follow [Getting started](index.md) to obtain a datastream ID.
 
**`POST https://edge.adobedc.net/ee/va/v1/sessionStart?configId={datastream ID}`**

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/sessionStart?configId={datastreamId}" \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
      "xdm": {
        "eventType": "media.sessionStart",
        "mediaCollection": {
          "sessionDetails": {
            "name": "Media Analytics API Sample",
            "playerName": "sample-html5-api-player",
            "contentType": "VOD",
            "length": 60,
            "channel": "sample-channel",
          },
          "playhead": 0
        }
      }
    }
  ]
}'
```

#### Response

```json
{
  "requestId": "55d4b[...]a219f",
  "handle": [
    {
      "payload": [
        {
          "sessionId": "979a3[...]08505"
        }
      ],
      "type": "media-analytics:new-session",
      "eventIndex": 0
    },
    {
      "payload": [
        {
          "scope": "Target",
          "hint": "35",
          "ttlSeconds": 1800
        },
        {
          "scope": "AAM",
          "hint": "9",
          "ttlSeconds": 1800
        },
        {
          "scope": "EdgeNetwork",
          "hint": "or2",
          "ttlSeconds": 1800
        }
      ],
      "type": "locationHint:result"
    },
    {
      "payload": [
        {
          "key": "kndctr_53A[...]C99_AdobeOrg_identity",
          "value": "CiYyN[...]KmzI=",
          "maxAge": 34128000
        },
        {
          "key": "kndctr_53A[...]C99_AdobeOrg_cluster",
          "value": "or2",
          "maxAge": 1800
        }
      ],
      "type": "state:store"
    }
  ]
}
```

This endpoint requires the following payload properties within the `xdm` object:

| Property | Description |
| --- | --- |
| `eventType` | The category of the event. Always set this property to `media.sessionStart` for this endpoint. |
| `mediaCollection` | An object containing media collection details. See the table below for details. |

The `mediaCollection` object requires several properties. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information.

| Property | Description |
| --- | --- |
| `playhead` | The current playback position within the media content.<br/>Live content: The current second of the day, between 0 and 86400.<br/>Recorded content: The current second of the content's duration, between 0 and the total content length. |
| `sessionDetails` | An object containing details on the session. See the table below for details. |

The `sessionDetails` object requires several properties. See [Session Details Collection data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/session-details-collection) in the Experience Data Model guide for more information.

| Property | Description |
| --- | --- |
| `name` | The content ID, or unique identifier for the content played. |
| `playerName` | The name of the content player. |
| `contentType` | The broadcast content type. Media libraries provide preset values such as `song`, `audiobook`, or `VoD`. You can set thi
| `length` | The total length of the content, in seconds. |
| `channel` | The content channel where the content is played. |

## Session Complete event request

The Session Complete event is sent when the end of the main content is reached. To make a Session Complete event request, use your `sessionId` in the payload of a call to the following endpoint:

**POST**  `https://edge.adobedc.net/ee-pre-prd/va/v1/sessionComplete \`

### Example request

The following example shows a Session Complete cURL request:

```sh
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