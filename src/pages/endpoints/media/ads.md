---
title: Ad endpoints
description: Endpoints that you can call related to ad tracking
---
# Ad endpoints

These endpoints allow you to track media ads that play before or during content playback. They consist of two types of advertising events:

* **Ad break:** A sequence of ads. A single ad break can consist of one or more ads.
* **Ad:** An individual ad. Multiple ads can potentially play during a single ad break.

Usage of these endpoints require an active session. Make sure that you call the [`sessionStart`](sessions.md#sessionstart) endpoint first to obtain a valid session ID.

## `adBreakStart`

The `adBreakStart` endpoint indicates the start of a sequence of ads. Adobe recommends setting both ad break and ad events, even when a single advertisement is shown.

**`POST https://edge.adobedc.net/ee/va/v1/adBreakStart?configId={datastreamID}`**

<CodeBlock slots="heading, code" repeat="1" languages="CURL"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/adBreakStart?configId={datastreamID}" \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
    "xdm": {
        "eventType": "media.adBreakStart",
        "mediaCollection": {
          "sessionID": "ffab5[...]45ec3",
          "playhead": 0,
          "advertisingPodDetails": {
            "index": 0,
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

| Property | Description |
| --- | --- |
| `eventType` | The category of the event. Always set this property to `media.adBreakStart` for this endpoint. |
| `mediaCollection` | An object containing media collection details. See the table below for details. |
| `timestamp` | The timestamp of the hit. |

The `mediaCollection` object requires several properties. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information.

| Property | Description |
| --- | --- |
| `sessionID` | The session ID obtained from the [`sessionStart`](sessions.md#sessionstart) endpoint. |
| `playhead` | The current playback position within the media content. |
| `advertisingPodDetails` | An object containing details on the ad pod. See [Advertising Pod Details Collection](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/advertising-pod-details-collection) for more information. |

## `adBreakComplete`

The `adBreakComplete` endpoint indicates the completion of a sequence of ads. Call this endpoint when a visitor finishes all ads in a pod.

**`POST https://edge.adobedc.net/ee/va/v1/adBreakComplete?configId={datastreamID}`**


