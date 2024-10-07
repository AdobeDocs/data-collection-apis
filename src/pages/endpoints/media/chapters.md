---
title: Chapter endpoints
description: Endpoints that you can call related to tracking chapters of content.
---
# Chapter endpoints

These endpoints allow you to track content consumption in context of chapters. 

Usage of these endpoints require an active session. Make sure that you call the [`sessionStart`](sessions.md#sessionstart) endpoint first to obtain a valid session ID.

## `chapterStart`

The `chapterStart` endpoint indicates the start of a chapter. See [Media Edge API implementation examples](../../getting-started/media-edge-examples.md) for more examples calling this endpoint.

**`POST https://edge.adobedc.net/ee/va/v1/chapterStart?configId={datastreamID}`**

<CodeBlock slots="heading, code" repeat="1" languages="CURL"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/chapterStart?configId={datastreamID}" \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
      "xdm": {
        "eventType": "media.chapterStart",
        "mediaCollection": {
          "sessionID": "ffab5[...]45ec3",
          "playhead": 0,
          "chapterDetails": {
            "index": 0,
            "length": 0,
            "offset": 0
          }
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
| `eventType` | The category of the event. Always set this property to `media.chapterStart` for this endpoint. |
| `mediaCollection` | An object containing media collection details. See the table below for details. |
| `timestamp` | The timestamp of the event. |

The `mediaCollection` object requires several properties. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information.

| Media collection property | Description |
| --- | --- |
| `sessionID` | The session ID obtained from the [`sessionStart`](sessions.md#sessionstart) endpoint. |
| `playhead` | The current playback position within the media content.<br/>Live content: The current second of the day, between 0 and 86400.<br/>Recorded content: The current second of the content's duration, between 0 and the total content length. |
| `chapterDetails` | An object containing details on the chapter. See [Chapter Details Collection](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/chapter-details-collection) for more information. The `index`, `length`, and `offset` properties are required. |

## `chapterComplete`

The `chapterComplete` endpoint indicates the completion of a chapter. See [Media Edge API implementation examples](../../getting-started/media-edge-examples.md) for more examples calling this endpoint.

**`POST https://edge.adobedc.net/ee/va/v1/chapterComplete?configId={datastreamID}`**

<CodeBlock slots="heading, code" repeat="1" languages="CURL"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/chapterComplete?configId={datastreamID}" \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
      "xdm": {
        "eventType": "media.chapterComplete",
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
| `eventType` | The category of the event. Always set this property to `media.chapterComplete` for this endpoint. |
| `mediaCollection` | An object containing media collection details. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information. The `sessionID` and `playhead` properties are required. |
| `timestamp` | The timestamp of the event. |

The `chapterDetails` object is not allowed when using this endpoint.

## `chapterSkip`

The `chapterSkip` endpoint indicates that the user skipped a chapter.

**`POST https://edge.adobedc.net/ee/va/v1/chapterSkip?configId={datastreamID}`**

<CodeBlock slots="heading, code" repeat="1" languages="CURL"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/chapterSkip?configId={datastreamID}" \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
      "xdm": {
        "eventType": "media.chapterSkip",
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
| `eventType` | The category of the event. Always set this property to `media.chapterSkip` for this endpoint. |
| `mediaCollection` | An object containing media collection details. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information. The `sessionID` and `playhead` properties are required. |
| `timestamp` | The timestamp of the event. |

The `chapterDetails` object is not allowed when using this endpoint.
