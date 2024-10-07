---
title: Buffer start endpoint
description: Indicates when a media player enters a buffering state.
---
# Buffer start endpoint

The `bufferStart` endpoint lets you track the quality and consistency of content playback based on the visitor's connection or media availability. Call this endpoint whenever the media player enters a buffering state. See [Media Edge API implementation examples](../../getting-started/media-edge-examples.md) for more examples calling this endpoint.

A "Buffer resume" endpoint does not exist using this API; instead, it is inferred when you call the `play` endpoint following `bufferStart`. Call the `play` endpoint when the media player exits a buffered state and resumes playing content.

Usage of this endpoint requires an active session. Make sure that you call the [`sessionStart`](sessions.md#sessionstart) endpoint first to obtain a valid session ID.

## `bufferStart`

**`POST https://edge.adobedc.net/ee/va/v1/bufferStart?configId={datastreamID}`**

<CodeBlock slots="heading, code" repeat="1" languages="CURL"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/bufferStart?configId={datastreamID}" \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
      "xdm": {
        "eventType": "media.bufferStart",
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
| `eventType` | The category of the event. Always set this property to `media.bufferStart` for this endpoint. |
| `mediaCollection` | An object containing media collection details. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information. The `sessionID` and `playhead` properties are required. |
| `timestamp` | The timestamp of the event. |
