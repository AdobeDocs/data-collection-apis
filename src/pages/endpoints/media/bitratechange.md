---
title: Bitrate change endpoint
description: Indicates a change in bitrate during playback.
---
# Bitrate change endpoint

The `bitrateChange` endpoint allows you to track changes in the quality of playback content to a user. Call this endpoint whenever the user experiences a change in the bitrate of the media player.

Usage of this endpoint requires an active session. Make sure that you call the [`sessionStart`](sessions.md#sessionstart) endpoint first to obtain a valid session ID.

## `bitrateChange`

**`POST https://edge.adobedc.net/ee/va/v1/bitrateChange?configId={datastreamID}`**

<CodeBlock slots="heading, code" repeat="1" languages="CURL"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/bitrateChange?configId={datastreamID}" \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
      "xdm": {
        "eventType": "media.bitrateChange",
        "mediaCollection": {
          "sessionID": "ffab5[...]45ec3",
          "playhead": 0,
          "qoeDataDetails": {
            "bitrate": 100
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
| `eventType` | The category of the event. Always set this property to `media.bitrateChange` for this endpoint. |
| `mediaCollection` | An object containing media collection details. See the table below for details. |
| `timestamp` | The timestamp of the event. |

The `mediaCollection` object requires several properties. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information.

| Media collection property | Description |
| --- | --- |
| `sessionID` | The session ID obtained from the [`sessionStart`](sessions.md#sessionstart) endpoint. |
| `playhead` | The current playback position within the media content.<br/>Live content: The current second of the day, between 0 and 86400.<br/>Recorded content: The current second of the content's duration, between 0 and the total content length. |
| `qoeDataDetails` | An object containing details on the quality of experience (QoE). See [QoE Data Details collection](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/qoe-data-details-collection) for more information. The object itself is only required, and can be empty. The `bitrate` property however is recommended. |
