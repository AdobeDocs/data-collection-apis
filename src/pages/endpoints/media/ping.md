---
title: Ping endpoint
description: Track the state of the media player at regular intervals.
---
# Ping endpoint

The `ping` endpoint allows you to track the state of the media player at regular intervals, regardless of other API events that you send. Adobe recommends sending the first ping 10 seconds after main playback starts, and every 10 seconds after that. Adobe recommends sending ping events every 1 second during ad tracking. See [Media Edge API implementation examples](../../getting-started/media-edge-examples.md) for more examples calling this endpoint.

Usage of this endpoint requires an active session. Make sure that you call the [`sessionStart`](sessions.md#sessionstart) endpoint first to obtain a valid session ID.

## `ping`

**`POST https://edge.adobedc.net/ee/va/v1/ping?configId={datastreamID}`**

<CodeBlock slots="heading, code" repeat="1" languages="CURL"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/ping?configId={datastreamID}" \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
      "xdm": {
        "eventType": "media.ping",
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
| `eventType` | The category of the event. Always set this property to `media.ping` for this endpoint. |
| `mediaCollection` | An object containing media collection details. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information. The `sessionID` and `playhead` properties are required. |
| `timestamp` | The timestamp of the event. |
