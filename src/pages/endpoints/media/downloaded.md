---
title: Downloaded endpoint
description: Track media sessions with downloaded or offline content.
---
# Downloaded endpoint

The `downloaded` endpoint allows you to track media consumption while a user is offline. When a user plays content from a device's storage using your app, you can store media session data on the device regardless of the device's connectivity. When the user finishes the playback session and the device returns online, you can use this endpoint to send the stored media session to Adobe in a single payload. Adobe dynamically assigns a session ID and processes the media session as if it was traditionally collected online.

## `downloaded`

The `downloaded` endpoint represents a full media session from start to finish. Media sessions collected using this endpoint have the following properties:

* Each event in the `events[]` payload represents a complete media session. You cannot append or prepend online data to downloaded media sessions.
* Every media session using this endpoint must start with a media event type of `media.sessionStart`.
* Do not generate or include a session ID in the payload. Adobe automatically generates a session ID when ingesting the media session.
* If you omit the media event type `media.sessionComplete` in a given session, Adobe automatically adds one. It uses the last media event timestamp in the payload, and also sets `xdm.mediaReporting.sessionDetails.isCompleted` to `false`. See [Session Details Reporting data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/session-details-reporting) in the Experience Data Model guide for more information.
  * In Adobe Analytics, downloaded media sessions missing `media.sessionComplete` do not increment the [Content completes](https://experienceleague.adobe.com/en/docs/analytics/components/metrics/sm-core) metric.
* Adobe automatically sets `xdm.mediaReporting.sessionDetails.isDownloaded` to `true` for all media sessions using this endpoint. It is set on the same event as `media.sessionStart`. You can use this field to determine the ratio of online/downloaded media sessions, or create a segment that focuses on only downloaded media sessions.
  * Adobe Analytics users can assign the `a.media.downloaded` context data variable to a dimension or metric using [Processing rules](https://experienceleague.adobe.com/en/docs/analytics/admin/admin-tools/manage-report-suites/edit-report-suite/report-suite-general/processing-rules/pr-overview) to obtain this flag in reports.

**`POST https://edge.adobedc.net/ee/va/v1/downloaded?configId={datastreamID}`**

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/downloaded?configId={datastreamID}" \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
      "xdm": {
        "identityMap": {
          "email": [
            {
              "id": "user@example.com",
              "primary": true
            }
          ]
        },
        "eventType": "media.downloaded",
        "mediaDownloadedEvents": [
          {
            "mediaEventTimestamp": "YYYY-09-26T15:52:24+00:00",
            "mediaEventType": "media.sessionStart",
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
          },
          {
            "mediaEventTimestamp": "YYYY-09-26T15:53:08+00:00",
            "mediaEventType": "media.sessionComplete",
            "mediaCollection": {
              "playhead": 60
            }
          }
        ],
        "timestamp": "{{currentTimestamp}}"
      }
    }
  ]
}'
```

#### Response

```json
{
  "requestId": "7b551[...]54492",
  "handle": [
    {
      "type": "locationHint:result",
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
      ]
    },
    {
      "type": "state:store",
      "payload": [
        {
          "key": "kndctr_53A[...]C99_AdobeOrg_identity",
          "value": "CiYy[...]ZpTM=",
          "maxAge": 34128000
        },
        {
          "key": "kndctr_53A[...]C99_AdobeOrg_cluster",
          "value": "or2",
          "maxAge": 1800
        }
      ]
    }
  ]
}
```

This endpoint requires the following payload properties within the `events[].xdm` object:

| XDM property | Description |
| --- | --- |
| `eventType` | The category of the event. Always set this property to `media.downloaded` for this endpoint. |
| `mediaDownloadedEvents` | An array of `mediaEvent` objects representing each media event within a session. See the table below. |

Each `mediaEvent` object within `mediaDownloadedEvents` requires several fields. See [Media Event Information data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-event-information) in the Experience Data Model guide for more information.

| Media event property | Description |
| --- | --- |
| `mediaEventTimestamp` | The timestamp when the media event happened. |
| `mediaEventType` | The media event type, such as `media.sessionStart`, `media.play`, or `media.error`. | 
| `mediaCollection` | Contains information specific to the media event. Required fields in this object depend on `mediaEventType`. See [Media Collection Details data type](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/data-types/media-collection-details) in the Experience Data Model guide for more information. |

### Response object

If successfully processed, the API returns an object with the following properties:

| Response property | Description |
| --- | --- |
| `requestId` | The unique identifier for the request. |
| `handle[]` | An array of payloads returned from Adobe. Types of payloads include `locationHint:result` and `state:store`. |
