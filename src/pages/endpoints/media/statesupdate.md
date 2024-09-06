---
title: States update endpoint
description: Start or end a player state
---
# States update endpoint

The `statesUpdate` endpoint allows you to start or end the media player in a given state. The media player can be in multiple states simulataneously. You can start and end multiple player states in the same API call. The following states are available to start or end:

* **Full screen**: The media player is in a full screen state.
* **Mute**: The media player is muted.
* **Closed captioning**: The media has closed captioning enabled.
* **Picture in picture**: The media player is in PiP mode, typically shown on top of other content floating in a corner.
* **In focus**: The media player is in focus.

Usage of this endpoint requires an active session. Make sure that you call the [`sessionStart`](sessions.md#sessionstart) endpoint first to obtain a valid session ID.

**`POST https://edge.adobedc.net/ee/va/v1/statesUpdate?configId={datastreamID}`**

<CodeBlock slots="heading, code" repeat="1" languages="CURL"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/statesUpdate?configId={datastreamID}" \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
      "xdm": {
        "eventType": "media.statesUpdate",
        "mediaCollection": {
          "sessionID": "ffab5[...]45ec3",
          "playhead": 0,
          "statesStart": [
            {
              "name": "fullscreen"
            },
            {
              "name": "mute"
            }
          ],
          "statesEnd": [
            {
            "name": "closedCaptioning"
            }
          ]
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
| `eventType` | The category of the event. Always set this property to `media.statesUpdate` for this endpoint. |
| `mediaCollection` | An object containing media collection details. See the table below for details. |
| `timestamp` | The timestamp of the event. |

The `mediaCollection` object requires several properties. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information.

| Media collection property | Description |
| --- | --- |
| `sessionID` | The session ID obtained from the [`sessionStart`](sessions.md#sessionstart) endpoint. |
| `playhead` | The current playback position within the media content.<br/>Live content: The current second of the day, between 0 and 86400.<br/>Recorded content: The current second of the content's duration, between 0 and the total content length. |
| `statesStart[]` | An array of enumerated names that represent the start of that state. See [List of States Start data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/list-of-states-start-collection) for more information. The `name` property is required. |
| `statesEnd[]` | An array of enumerated names that represent the end of that states. See [List of States End data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/list-of-states-end-collection) for more information. The `name` property is required. |

Valid values for the `name` property include `fullscreen`, `mute`, `closedCaptioning`, `pictureInPicture`, and `inFocus`.
