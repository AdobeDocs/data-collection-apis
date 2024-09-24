---
title: Media Edge API overview
description: Get started using the Media Edge API endpoints.
---
# Media Edge API overview

The Adobe Experience Platform Media Edge APIs allow you to send media data within the framework of [XDM schemas](https://experienceleague.adobe.com/docs/experience-platform/xdm/home.html). Use of these APIs require the Streaming Media Collection Add-on.

* With [Adobe Customer Journey Analytics](https://experienceleague.adobe.com/docs/analytics-platform/using/cja-overview/cja-overview.html), you can get near real-time, granular details of duration, starts, and stops to evaluate and combine for media metrics. If migrating from Adobe Analytics, all reporting metrics are available in Customer Journey Analytics.
* With [Adobe Real-Time Customer Data Platform](https://experienceleague.adobe.com/docs/experience-platform/rtcdp/overview.html), you can enrich real-time profiles with media consumption data.
* With [Adobe Journey Optimizer](https://experienceleague.adobe.com/docs/journey-optimizer/using/get-started/get-started.html), you can optimize omnichannel campaigns and automate journeys with media consumption signals.

## Optimizing media tracking data flows

Both [Media Collection APIs](https://experienceleague.adobe.com/docs/media-analytics/using/implementation/streaming-media-apis/mc-api-overview.html#media-tracking-data-flows) and Media Edge APIs provide media tracking data as RESTful services. The Media Edge service offers the following advantages:

* It is the easiest way to incorporate XDM schemas into your data flow. 
* Calls are directed from a media player directly to the Experience Platform Edge Network.
* It tracks media events efficiently with a minimum of cross-server calls. 

The following table shows a possible Adobe API service for various media analytics cases:

| Use case | API service |
| -------- | ----------- |
| Adobe Experience Platform solution | Media Edge |
| Real-Time CDP + Customer Journey Analytics | Media Edge |
| Adobe Analytics + Adobe Experience Platform solution | Media Edge |
| Adobe Analytics only (already tracking) | Media Collection |

The Media Collection API service for Analytics still receives XDM data, but is not optimized for it to the extent that Media Edge service is. Depending on the data sent from the Media Player, some Analytics-only data can also be routed through the Media Edge API service.

## Including custom meta data

Custom meta data allows the inclusion of additional user-defined data that can be customized for specific needs. It is useful when default media schemas do not cover desired data points. Since media calls go through a different processing pipeline, you must use the `xdm.customMetadata` object array to include non-media schema fields in your tracking.

Include the `xdm.customMetadata` object array in your payload when you call the [`sessionStart`](sessions.md#sessionstart), [`chapterStart`](chapters.md#chapterstart), or [`adStart`](ads.md#adstart) endpoints.

<InlineAlert variant="warning" slots="text" />

Make sure that your schema accommodates the XDM path for each key in the meta data that you include in each request. If your schema does not include the XDM fields that the API request provides and there is no datastream mapping for these fields, that meta data is irretrievably lost!

The following example `sessionStart` request includes a single key-value pair; a custom user ID that is ultimately mapped to `xdm._expath.customUserID`. You can include as many custom key-value pairs in the `xdm.customMetadata` object as you'd like.

<CodeBlock slots="heading, code" repeat="1" languages="CURL"/>

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
          "playhead": 0,
          "customMetadata": [
            {
              "name": "_expath.customUserID",
              "value": "5791626"
            }
          ]
        }
      }
    }
  ]
}'
```

If successfully processed, the API returns `200 OK` for the `sessionStart` endpoint or `204 No Content` for all other endpoints.
