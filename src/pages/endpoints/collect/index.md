---
title: Collect endpoint (non-interactive collection)
description: Learn how the Adobe Experience Platform Edge Network Server API performs non-interactive data collection.
---
# Collect endpoint (non-interactive collection)

The `collect` endpoint sends a batch of events to a datastream. This endpoint is recommended when events are queued locally for a short period of time. For example, in mobile applications where a lack of network connection is common.

Batch events do not necessarily need to belong to the same visitor, meaning that events can hold different identities within their `identityMap` object.

This endpoint supports both [authenticated](../../getting-started/authentication.md) and non-authenticated events. The payload for each endpoint use an identical format. Make sure that you use the correct endpoint for your organization's use case.

* **Non-authenticated**: **`POST https://edge.adobedc.net/ee/v2/collect?datastreamId={Datastream ID}`**

* **Authenticated**: **`POST https://server.adobedc.net/ee/v2/collect?datastreamId={Datastream ID}`**

<CodeBlock slots="heading, code" repeat="3" languages="CURL,CURL,JSON"/>

#### Non-authenticated request

```sh
curl -X POST "https://server.adobedc.net/ee/v2/collect?dataStreamId={DATASTREAM_ID}"
-H "Content-Type: application/json" 
-d '{
   "events": [
      {
         "xdm": {
            "identityMap": {
               "FPID": [
                  {
                     "id": "79bf8e83-f708-414b-b1ed-5789ff33bf0b",
                     "primary": "true"
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
      },
      {
         "xdm": {
            "identityMap": {
               "FPID": [
                  {
                     "id": "871e8460-a329-4e96-a5b6-ff359fb0afb9",
                     "primary": "true"
                  }
               ]
            },
            "eventType": "web.webinteraction.linkClicks",
            "web": {
               "webInteraction": {
                  "linkClicks": {
                     "value": 1
                  }
               },
               "name": "My Custom Link",
               "URL": "https://example.com"
            },
            "timestamp": "YYYY-08-09T14:09:20.859Z"
         }
      }
   ]
}'
```

#### Authenticated request

```sh
curl -X POST "https://server.adobedc.net/ee/v2/collect?dataStreamId={DATASTREAM_ID}" 
-H "Authorization: Bearer {TOKEN}" 
-H "x-gw-ims-org-id: {ORG_ID}" 
-H "x-api-key: {API_KEY}" 
-H "Content-Type: application/json" 
-d '{
   "events": [
      {
         "xdm": {
            "identityMap": {
               "FPID": [
                  {
                     "id": "79bf8e83-f708-414b-b1ed-5789ff33bf0b",
                     "primary": "true"
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
      },
      {
         "xdm": {
            "identityMap": {
               "FPID": [
                  {
                     "id": "871e8460-a329-4e96-a5b6-ff359fb0afb9",
                     "primary": "true"
                  }
               ]
            },
            "eventType": "web.webinteraction.linkClicks",
            "web": {
               "webInteraction": {
                  "linkClicks": {
                     "value": 1
                  }
               },
               "name": "My Custom Link",
               "URL": "https://example.com"
            },
            "timestamp": "YYYY-08-09T14:09:20.859Z"
         }
      }
   ]
}'
```

#### Response

```json
{
  "requestId": "f567a988-4b3c-45a6-9ed8-f283188a445e"
}
```

This endpoint provides the following query string parameters:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStreamId` | `String` | Yes | The ID of the datastream used by the data collection endpoint. |
| `requestId` | `String` | No | Provide an external request tracing ID. If none is provided, the Edge Network will generate one for you and return it back in the response body / headers.|
| `silent` | `Boolean` | No | Optional boolean parameter indicating whether the Edge Network should return a `204 No Content` response with an empty payload or not. Critical errors are reported using the corresponding HTTP status code and payload.|


A successful response returns one of the following statuses, and a `requestID` if none was provided in the requst.

* `202 Accepted` when the request was successfully processed;
* `204 No Content` when the request was successfully processed and the `silent` parameter was set to `true`;
* `400 Bad Request` when the request was not properly formed (e.g., the mandatory primary identity was not found).
