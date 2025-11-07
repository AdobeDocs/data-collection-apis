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

The `sessionstart` endpoint creates a media tracking session for a visitor. A successful response includes a session ID, which is required for all other endpoints. Make sure that you follow [Getting started](index.md) to obtain a datastream ID. See [Media Edge API implementation examples](../../getting-started/media-edge-examples.md) for more examples calling this endpoint.
 
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
            "channel": "sample-channel"
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

### Request object

This endpoint requires the following payload properties within the `xdm` object:

| XDM property | Description |
| --- | --- |
| `eventType` | The category of the event. Always set this property to `media.sessionStart` for this endpoint. |
| `mediaCollection` | An object containing media collection details. See the table below for details. |

The `mediaCollection` object requires several properties. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information.

| Media collection property | Description |
| --- | --- |
| `playhead` | The current playback position within the media content.  Live content: The current second of the day, between 0 and 86400.  Recorded content: The current second of the content's duration, between 0 and the total content length. |
| `sessionDetails` | An object containing details on the session. See the table below for details. |

The `sessionDetails` object requires several properties. See [Session Details Collection data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/session-details-collection) in the Experience Data Model guide for more information.

| Session details property | Description |
| --- | --- |
| `name` | The content ID, or unique identifier for the content played. |
| `playerName` | The name of the content player. |
| `contentType` | The broadcast content type. Media libraries provide preset values such as `song`, `audiobook`, or `VoD`. Any string is valid. |
| `length` | The total length of the content, in seconds. |
| `channel` | The content channel where the content is played. |

### Response object

If successfully processed, the API returns an object with the following properties:

| Response property | Description |
| --- | --- |
| `requestId` | The unique identifier for the request. Note that this property is not the `sessionID` required for all other endpoints; it is merely a unique identifier for the response itself. |
| `handle[]` | An array of payloads returned from Adobe. Types of payloads include `media-analytics:new-session`, `locationHint:result`, and `state:store`. The desired payload is `media-analytics:new-session`, which contains a `sessionId` property. If your response payload does not contain `sessionId`, check your datastream settings to make sure that Media Analytics is enabled. |

## `sessionComplete`

The `sessionComplete` endpoint indicates that the visitor reached the end of the main content. It does not immediately end a session; if you want to immediately end a session, call the [`sessionEnd`](#sessionend) endpoint. See [Media Edge API implementation examples](../../getting-started/media-edge-examples.md) for more examples calling this endpoint.

Usage of this endpoint requires an active session. Make sure that you call the [`sessionStart`](#sessionstart) endpoint first to obtain a valid session ID.

**`POST https://edge.adobedc.net/ee/va/v1/sessionComplete?configId={datastreamID}`**

<CodeBlock slots="heading, code" repeat="1" languages="CURL"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/sessionComplete?configId={datastreamID}" \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
      "xdm": {
        "eventType": "media.sessionComplete",
        "mediaCollection": {
          "sessionID": "ffab5[...]45ec3",
          "playhead": 0
        },
        "timestamp": "YYYY-08-20T22:41:40+00:00"
      }
    }
  ]
}'
```

If successfully processed, the API returns `204 No Content`.

This endpoint requires the following payload properties within the `xdm` object:

| XDM property | Description |
| --- | --- |
| `eventType` | The category of the event. Always set this property to `media.sessionComplete` for this endpoint. |
| `mediaCollection` | An object containing media collection details. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information. The `sessionID` and `playhead` properties are required. |
| `timestamp` | The timestamp of the event. |

## `sessionEnd`

The `sessionEnd` endpoint immediately ends a media playback session. Sessions end automatically when no events are received for 10 minutes, or when no playhead movement happens for 30 minutes. You can call this endpoint when you consider a session "done" and do not want any subsequent events tracked as part of the same session. See [Media Edge API implementation examples](../../getting-started/media-edge-examples.md) for more examples calling this endpoint.

Usage of this endpoint requires an active session. Make sure that you call the [`sessionStart`](#sessionstart) endpoint first to obtain a valid session ID. Calling this endpoint immediately ends the session for the given session ID, meaning that you cannot use that same session ID in subsequent API calls. If you want to track additional events after calling this endpoint, call the [`sessionStart`](#sessionstart) endpoint to obtain a new session ID.

**`POST https://edge.adobedc.net/ee/va/v1/sessionEnd?configId={datastreamID}`**

<CodeBlock slots="heading, code" repeat="1" languages="CURL"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/sessionEnd?configId={datastreamID}" \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
      "xdm": {
        "eventType": "media.sessionEnd",
        "mediaCollection": {
          "sessionID": "ffab5[...]45ec3",
          "playhead": 0
        },
        "timestamp": "YYYY-08-20T22:41:40+00:00"
      }
    }
  ]
}'
```

If successfully processed, the API returns `204 No Content`.

This endpoint requires the following payload properties within the `xdm` object:

| XDM property | Description |
| --- | --- |
| `eventType` | The category of the event. Always set this property to `media.sessionEnd` for this endpoint. |
| `mediaCollection` | An object containing media collection details. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information. The `sessionID` and `playhead` properties are required. |
| `timestamp` | The timestamp of the event. |
