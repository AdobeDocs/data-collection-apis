---
title: Interact endpoint (interactive collection)
description: Learn how the Adobe Experience Platform Edge Network API performs interactive data collection.
---

# Interact endpoint (interactive collection)

The `interact` endpoint sends a single event to a datastream. When sending an event to this endpoint, a response is returned that can contain content from Edge Network services. These types of interactions are valuable for both collecting data and personalizing content.

This endpoint does not support batch events. If you need to queue events or send multiple events simultaneously, use the [`collect`](../collect/index.md) endpoint instead.

This endpoint supports both [authenticated](../../getting-started/authentication.md) and non-authenticated events. The payloads for each endpoint use an identical format. Make sure that you use the correct endpoint for your organization's use case.

* Authenticated: **`POST https://server.adobedc.net/ee/v2/interact?datastreamId={Datastream ID}`**
* Non-authenticated: **`POST https://edge.adobedc.net/ee/v2/interact?datastreamId={Datastream ID}`**

<CodeBlock slots="heading, code" repeat="3" languages="CURL,CURL,JSON"/>

#### Non-authenticated request

```sh
curl -X POST "https://edge.adobedc.net/ee/v2/collect?datastreamId={DATASTREAM_ID}"
-H "Content-Type: application/json" 
-d '{
   "event": {
      "xdm": {
         "identityMap": {
            "Email_LC_SHA256": [
               {
                  "id": "0c7e6[...]e8a3b",
                  "primary": true
               }
            ]
         },
         "eventType": "web.webpagedetails.pageViews",
         "web": {
            "webPageDetails": {
               "URL": "https://example.com/",
               "name": "home-demo-Home Page"
            }
         },
         "timestamp": "YYYY-08-09T14:09:20.859Z"
      },
      "data": {
         "prop1": "custom value"
      }
   }
}'
```

#### Authenticated request

```sh
curl -X POST "https://server.adobedc.net/ee/v2/collect?datastreamId={DATASTREAM_ID}" 
-H "Authorization: Bearer {TOKEN}" 
-H "x-gw-ims-org-id: {ORG_ID}" 
-H "x-api-key: {API_KEY}" 
-H "Content-Type: application/json" 
-d '{
   "event": {
      "xdm": {
         "identityMap": {
            "Email_LC_SHA256": [
               {
                  "id": "0c7e6[...]e8a3b",
                  "primary": true
               }
            ]
         },
         "eventType": "web.webpagedetails.pageViews",
         "web": {
            "webPageDetails": {
               "URL": "https://example.com/",
               "name": "home-demo-Home Page"
            }
         },
         "timestamp": "YYYY-08-09T14:09:20.859Z"
      },
      "data": {
         "prop1": "custom value"
      }
   }
}'
```

#### Response

```json
{
  "requestId": "60a2f[...]2294d",
  "handle": [
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
          "value": "CiYzM[...]snTI=",
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

The following query string parameters are available for this endpoint:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `datastreamId` | `String` | Yes | The ID of the datastream used by the data collection endpoint. |
| `requestId` | `String` | No | Provide an external request tracing ID. If none is provided, the Edge Network generates one for you and includes it in the response. |

A successful response returns HTTP status `200 OK`, with one or more `Handle` objects, depending on the real-time edge services enabled in the datastream configuration.
