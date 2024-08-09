---
title: Personalization overview
description: Learn how to use the Adobe Experience Platform Edge Network Server API to retrieve personalized content from Adobe personalization solutions.
exl-id: 11be9178-54fe-49d0-b578-69e6a8e6ab90
---
# Personalization overview

With the [!DNL Server API], you can retrieve personalized content from Adobe personalization solutions, including [Adobe Target](https://business.adobe.com/products/target/adobe-target.html), [Adobe Journey Optimizer](https://experienceleague.adobe.com/en/docs/journey-optimizer/using/ajo-home), and [Offer Decisioning](https://experienceleague.adobe.com/docs/offer-decisioning/using/get-started/starting-offer-decisioning.html).

Additionally, the [!DNL Server API] powers same-page and next-page personalization capabilities through Adobe Experience Platform personalization destinations, such as [Adobe Target](../destinations/catalog/personalization/adobe-target-connection.md) and the [custom personalization connection](../destinations/catalog/personalization/custom-personalization.md). To learn how to configure Experience Platform for same-page and next-page personalization, see the [dedicated guide](../destinations/ui/activate-edge-personalization-destinations.md).

When using the Server API, you must integrate the response provided by the personalization engine with the logic used to render content on your site. Unlike the [Web SDK](../web-sdk/home.md), the [!DNL Server API] does not have a mechanism to automatically apply content returned by Adobe personalization solutions.

## Terminology {#terminology}

Before working with Adobe personalization solutions, make sure to understand the following concepts:

* **Offer**: An offer is a marketing message that may have rules associated with it that specify who is eligible to see the offer.
* **Decision**: A decision (previously known as offer activity) informs the selection of an offer.
* **Schema**: The schema of a decision informs the type of offer returned.
* **Scope**: The scope of the decision.
  * In Adobe Target, this is the [!DNL mbox]. The [!DNL global mbox] is the `__view__` scope
  * For [!DNL Offer Decisioning], these are the Base64-encoded strings of JSON containing the activity and placement IDs you want the offer decisioning service to use to propose offers.

## The `query` object {#query-object}

Retrieving personalized content requires an explicit request query object for a request example. The query object has the following format:

```json
{
  "query": {
    "personalization": {
      "schemas": [
        "https://ns.adobe.com/personalization/html-content-item",
        "https://ns.adobe.com/personalization/json-content-item",
        "https://ns.adobe.com/personalization/redirect-item",
        "https://ns.adobe.com/personalization/dom-action"
      ],
      "decisionScopes": [
        "alloyStore",
        "siteWide",
        "__view__",
        "eyJhY3Rpdml0eUlkIjoieGNvcmU6b2ZmZXItYWN0aXZpdHk6MTFjZmIxZmE5MzM4MWFjYSIsInBsYWNlbWVudElkIjoieGNvcmU6b2ZmZXItcGxhY2VtZW50OjExNzUwMDk2MTJiMDEwMGMifQ"
      ],
      "surfaces": [
        "web://mywebpage.html/",
        "web://mywebpage.html/#sample-json-content"
      ]
    }
  }
}
```



| Attribute | Type |Required / Optional| Description |
| --- | --- | --- | ---|
| `schemas` | `String[]` | Required for Target personalization. Optional for Offer Decisioning. | List of schemas used in the decision, to select the type of offers returned.|
| `scopes` | `String[]` | Optional| List of decision scopes. Maximum 30 per request. |

## The handle object {#handle}

The personalized content retrieved from personalization solutions is presented in a `personalization:decisions` handle, which has the following format for its payload:

```json
{
   "type":"personalization:decisions",
   "payload":[
      {
         "id":"AT:eyJhY3Rpdml0eUlkIjoiMTMxMDEwIiwiZXhwZXJpZW5jZUlkIjoiMCJ9",
         "scope":"__view__",
         "scopeDetails":{
            "decisionProvider":"TGT",
            "activity":{
               "id":"131010"
            },
            "experience":{
               "id":"0"
            },
            "strategies":[
               {
                  "algorithmID":"0",
                  "trafficType":"0"
               }
            ]
         },
         "items":[
            {
               "id":"0",
               "schema":"https://ns.adobe.com/personalization/dom-action",
               "meta":{
                  "offer.name":"Default Content",
                  "experience.id":"0",
                  "activity.name":"Luma target reporting",
                  "activity.id":"131010",
                  "experience.name":"Experience A",
                  "option.id":"2",
                  "offer.id":"0"
               },
               "data":{
                  "type":"setHtml",
                  "format":"application/vnd.adobe.target.dom-action",
                  "content":"Customer Service not chrome",
                  "selector":"HTML > BODY > DIV.page-wrapper:eq(0) > FOOTER.page-footer:eq(0) > DIV.footer:eq(0) > DIV.links:eq(0) > DIV.widget:eq(0) > UL.footer:eq(0) > LI.nav:eq(1) > A:nth-of-type(1)",
                  "prehidingSelector":"HTML > BODY > DIV:nth-of-type(1) > FOOTER:nth-of-type(1) > DIV:nth-of-type(1) > DIV:nth-of-type(2) > DIV:nth-of-type(1) > UL:nth-of-type(1) > LI:nth-of-type(2) > A:nth-of-type(1)"
               }
            }
         ]
      }
   ]
}
```

| Attribute | Type | Description |
| --- | --- | --- |
| `payload.id` | String | The decision ID. |
| `payload.scope` | String | The decision scope that resulted in the proposed offers. |
| `payload.scopeDetails.decisionProvider`|String| Set to `TGT` when using Adobe Target.|
| `payload.scopeDetails.activity.id` | String | The unique ID of the offer activity. |
| `payload.scopeDetails.experience.id` | String | The unique ID of the offer placement. |
| `items[].id` | String | The unique ID of the offer placement. |
| `items[].data.id` | String | The ID of the proposed offer. |
| `items[].data.schema` | String | The schema of the content associated with the proposed offer. |
| `items[].data.format` | String | The format of the content associated with the proposed offer. |
| `items[].data.language` | String | An array of languages associated with the content from the proposed offer. |
| `items[].data.content` | String | Content associated with the proposed offer in the format of a string. |
| `items[].data.selector` | String | HTML selector used to identify the target DOM element for a DOM action offer. |
| `items[].data.prehidingSelector` | String | HTML selector used to identify the DOM element to be hidden while handling a DOM action offer. |
| `items[].data.deliveryUrl` | String | Image content associated with the proposed offer in the format of a URL. |
| `items[].data.characteristics` | String | Characteristics associated with the proposed offer in the format of a JSON object. |

## Sample API call {#sample-call}

**API format**

```http
POST /ee/v2/interact
```

### Request {#request}

```shell
curl -X POST "https://server.adobedc.net/ee/v2/interact?dataStreamId={DATASTREAM_ID}"
-H "Authorization: Bearer {TOKEN}"
-H "x-gw-ims-org-id: {ORG_ID}"
-H "x-api-key: {API_KEY}"
-H "Content-Type: application/json"
-d '{
   "event":{
      "xdm":{
         "identityMap":{
            "Email_LC_SHA256":[
               {
                  "id":"0c7e6a405862e402eb76a70f8a26fc732d07c32931e9fae9ab1582911d2e8a3b",
                  "primary":true
               }
            ]
         },
         "eventType":"web.webpagedetails.pageViews",
         "web":{
            "webPageDetails":{
               "URL":"https://alloystore.dev/",
               "name":"home-demo-Home Page"
            }
         },
         "timestamp":"2021-08-09T14:09:20.859Z"
      }
   },
   "query":{
      "personalization":{
         "schemas":[
            "https://ns.adobe.com/personalization/html-content-item",
            "https://ns.adobe.com/personalization/json-content-item",
            "https://ns.adobe.com/personalization/redirect-item",
            "https://ns.adobe.com/personalization/dom-action"
         ],
         "decisionScopes":[
            "__view__",
            "eyJhY3Rpdml0eUlkIjoieGNvcmU6b2ZmZXItYWN0aXZpdHk6MTFjZmIxZmE5MzM4MWFjYSIsInBsYWNlbWVudElkIjoieGNvcmU6b2ZmZXItcGxhY2VtZW50OjExNzUwMDk2MTJiMDEwMGMifQ"
         ]
      }
   }
}'
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `configId` | String | Yes | The datastream ID. |
| `requestId` | String | No | Provide an external request tracing ID. If none is provided, the Edge Network will generate one for you and return it back in the response body / headers.|

### Response {#response}

Returns a `200 OK` status and one or more `Handle` objects, depending on the edge services that are enabled in the datastream configuration.

```json
{
   "requestId":"da20d11d-adac-458c-91ac-15bf4e420a15",
   "handle":[
      {
         "payload":[
            {
               "id":"AT:eyJhY3Rpdml0eUlkIjoiMTMxMDEwIiwiZXhwZXJpZW5jZUlkIjoiMCJ9",
               "scope":"__view__",
               "scopeDetails":{
                  "decisionProvider":"TGT",
                  "activity":{
                     "id":"131010"
                  },
                  "experience":{
                     "id":"0"
                  },
                  "strategies":[
                     {
                        "algorithmID":"0",
                        "trafficType":"0"
                     }
                  ]
               },
               "items":[
                  {
                     "id":"0",
                     "schema":"https://ns.adobe.com/personalization/dom-action",
                     "meta":{
                        "offer.name":"Default Content",
                        "experience.id":"0",
                        "activity.name":"Luma target reporting",
                        "activity.id":"131010",
                        "experience.name":"Experience A",
                        "option.id":"2",
                        "offer.id":"0"
                     },
                     "data":{
                        "type":"setHtml",
                        "format":"application/vnd.adobe.target.dom-action",
                        "content":"Customer Service not chrome",
                        "selector":"HTML > BODY > DIV.page-wrapper:eq(0) > FOOTER.page-footer:eq(0) > DIV.footer:eq(0) > DIV.links:eq(0) > DIV.widget:eq(0) > UL.footer:eq(0) > LI.nav:eq(1) > A:nth-of-type(1)",
                        "prehidingSelector":"HTML > BODY > DIV:nth-of-type(1) > FOOTER:nth-of-type(1) > DIV:nth-of-type(1) > DIV:nth-of-type(2) > DIV:nth-of-type(1) > UL:nth-of-type(1) > LI:nth-of-type(2) > A:nth-of-type(1)"
                     }
                  }
               ]
            }
         ],
         "type":"personalization:decisions"
      }
   ]
}
```

## Notifications {#notifications}

Notifications should be fired when a prefetched content or view has been visited or rendered to the end user. In order for notifications to be fired off for the right scope, make sure to keep track of the corresponding `id` for each scope. 

Notifications with the right `id` for the corresponding scopes are required to be fired in order for reporting to be reflected correctly.

**API format**

```http
POST /ee/v2/collect
```

### Request {#notifications-request}

```shell
curl -X POST "https://server.adobedc.net/ee/v2/collect?dataStreamId={DATASTREAM_ID}" 
-H "Authorization: Bearer {TOKEN}" 
-H "x-gw-ims-org-id: {ORG_ID}" 
-H "x-api-key: {API_KEY}"
-H "Content-Type: application/json"
-d '{
   "events":[
      {
         "xdm":{
            "identityMap":{
               "Email_LC_SHA256":[
                  {
                     "id":"0c7e6a405862e402eb76a70f8a26fc732d07c32931e9fae9ab1582911d2e8a3b",
                     "primary":true
                  }
               ]
            },
            "eventType":"web.webpagedetails.pageViews",
            "web":{
               "webPageDetails":{
                  "URL":"https://alloystore.dev/",
                  "name":"home-demo-Home Page"
               }
            },
            "timestamp":"2021-08-09T14:09:20.859Z",
            "_experience":{
               "decisioning":{
                  "propositions":[
                     {
                        "id":"AT:eyJhY3Rpdml0eUlkIjoiMTMxMDEwIiwiZXhwZXJpZW5jZUlkIjoiMCJ9",
                        "scope":"__view__",
                        "items":[
                           {
                              "id":"0"
                           }
                        ]
                     }
                  ]
               }
            }
         }
      }
   ]
}'
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStreamId` | `String` | Yes | The ID of the datastream used by the data collection endpoint. |
| `requestId` | `String` | No | External external request tracing ID. If none is provided, the Edge Network will generate one for you and return it back in the response body / headers.|
| `silent` | `Boolean` | No | Optional boolean parameter indicating whether the Edge Network should return a `204 No Content` response with an empty payload. Critical errors are reported using the corresponding HTTP status code and payload.|

### Response {#notifications-response}

A successful response returns one of the following statuses, and a `requestID` if none was provided in the requst.

* `202 Accepted` when the request was successfully processed;
* `204 No Content` when the request was successfully processed and the `silent` parameter was set to `true`;
* `400 Bad Request` when the request was not properly formed (e.g., the mandatory primary identity was not found).

```json
{
  "requestId": "f567a988-4b3c-45a6-9ed8-f283188a445e"
}
```



---
title: Personalization via Offer Decisioning
description: Learn how to use the Server API to deliver and render personalized experiences via Offer Decisioning.
exl-id: 5348cd3e-08db-4778-b413-3339cb56b35a
---
# Personalization via Offer Decisioning

## Overview {#overview}

The Edge Network Server API can deliver personalized experiences managed in [Offer Decisioning](https://experienceleague.adobe.com/docs/journey-optimizer/using/offer-decisioniong/get-started-decision/starting-offer-decisioning.html) to the web channel.

[!DNL Offer Decisioning] supports a non-visual interface to create, activate, and deliver your activities and personalization experiences.

## Prerequisites {#prerequisites}

Personalization via [!DNL Offer Decisioning] requires that you have access to [Adobe Journey Optimizer](https://experienceleague.adobe.com/docs/journey-optimizer/using/ajo-home.html) before you configure your integration.

## Configure your datastream {#configure-your-datastream}

Before you can use the Server API in conjunction with Offer Decisioning, you must enable Adobe Experience Platform personalization on your datastream configuration, and enable the **[!UICONTROL Offer Decisioning]** option.

See the [guide on adding services to a datastream](../datastreams/overview.md#adobe-experience-platform-settings), for detailed information on how to enable Offer Decisioning.

![UI image showing the datastream service configuration screen, with Offer Decisioning selected](assets/aep-od-datastream.png)

## Audience creation {#audience-creation}

[!DNL Offer Decisioning] relies on the Adobe Experience Platform Segmentation Service for audience creation. You can find the documentation for the [!DNL Segmentation Service] [here](../segmentation/home.md).

## Defining decision scopes {#creating-decision-scopes}

The [!DNL Offer Decision Engine] uses Adobe Experience Platform data and [Real-Time Customer profiles](../profile/home.md), along with the [!DNL Offer Library], to deliver offers to the right customers and channels at the right time.

To learn more about the [!DNL Offer Decisioning Engine], see the dedicated [documentation](https://experienceleague.adobe.com/docs/journey-optimizer/using/offer-decisioniong/get-started-decision/starting-offer-decisioning.html).

After [configuring your datastream](#configure-your-datastream), you must define the decision scopes to be used in your personalization campaign.

[Decision scopes](https://experienceleague.adobe.com/docs/journey-optimizer/using/offer-decisioniong/create-manage-activities/create-offer-activities.html#add-decision-scopes) are the Base64-encoded JSON strings containing the activity and placement IDs that you want the [!DNL Offer Decisioning Service] to use when proposing offers.

**Decision scope JSON**

```json
{
   "activityId":"xcore:offer-activity:11cfb1fa93381aca",
   "placementId":"xcore:offer-placement:1175009612b0100c"
}
```

**Decision scope Base64-encoded string**

```shell
"eyJhY3Rpdml0eUlkIjoieGNvcmU6b2ZmZXItYWN0aXZpdHk6MTFjZmIxZmE5MzM4MWFjYSIsInBsYWNlbWVudElkIjoieGNvcmU6b2ZmZXItcGxhY2VtZW50OjExNzUwMDk2MTJiMDEwMGMifQ=="
```

After you have created your offers and collections, you need to define a [decision scope](https://experienceleague.adobe.com/docs/journey-optimizer/using/offer-decisioniong/create-manage-activities/create-offer-activities.html#add-decision-scopes).

Copy the Base64-encoded decision scope. You will use it in the `query` object of the Server API request. 

![UI image showing the Offer Decisioning UI, highlighting the decision scope.](assets/decision-scope.png)

```json
"query":{
   "personalization":{
      "decisionScopes":[
         "eyJ4ZG06YWN0aXZpdHlJZCI6Inhjb3JlOm9mZmVyLWFjdGl2aXR5OjE0ZWZjYTg5NDE4OTUxODEiLCJ4ZG06cGxhY2VtZW50SWQiOiJ4Y29yZTpvZmZlci1wbGFjZW1lbnQ6MTJkNTQ0YWU1NGU3ZTdkYiJ9"
      ]
   }
}
```

## API call example {#api-example}

**API format**

```http
POST /ee/v2/interact
```

### Request {#request}

A full request that includes a complete XDM object, data object and an Offer Decisioning query is outlined below.

>[!NOTE]
>
>The `xdm` and `data` objects are optional and are only required for Offer Decisioning if you have created segments with conditions that use fields in either of those objects.

```shell
curl -X POST 'https://server.adobedc.net/ee/v2/interact?dataStreamId={DATASTREAM_ID}' \
--header 'x-api-key: {API_KEY}' \
--header 'x-gw-ims-org: {ORG_ID}' \
--header 'Authorization: Bearer {TOKEN}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "event": {
        "xdm": {
            "eventType": "web.webpagedetails.pageViews",
            "identityMap": {
                "ECID": [
                    {
                        "id": "05907638112924484241029082405297151763",
                        "authenticatedState": "ambiguous",
                        "primary": true
                    }
                ]
            },
            "web": {
                "webPageDetails": {
                    "URL": "https://alloystore.dev",
                    "name": "Home Page"
                },
                "webReferrer": {
                    "URL": ""
                }
            },
            "device": {
                "screenHeight": 1440,
                "screenWidth": 3440,
                "screenOrientation": "landscape"
            },
            "environment": {
                "type": "browser",
                "browserDetails": {
                    "viewportWidth": 3440,
                    "viewportHeight": 1440
                }
            },
            "placeContext": {
                "localTime": "2022-03-22T22:45:21.193-06:00",
                "localTimezoneOffset": 360
            },
            "timestamp": "2022-03-23T04:45:21.193Z",
            "implementationDetails": {
                "name": "https://ns.adobe.com/experience/alloy/reactor",
                "version": "1.0",
                "environment": "serverapi"
            }
        },
        "data": {
            "page": {
                "pageInfo": {
                    "pageName": "Promotions",
                    "siteSection": "Home"
                },
                "promos": {
                    "heroPromos": "purse,shoes,sunglasses"
                },
                "customVariables": {
                    "testGroup": "orange/black theme"
                },
                "events": {
                    "homePage": true
                },
                "products": [
                    {
                        "productSKU": "abc123",
                        "productName": "shirt"
                    }
                ]
            },
            "__adobe.target": {
                "profile.eyeColor": "brown",
                "profile.hairColor": "brown"
            }
        }
    },
    "query": {
        "personalization": {
            "decisionScopes": [
                "eyJ4ZG06YWN0aXZpdHlJZCI6Inhjb3JlOm9mZmVyLWFjdGl2aXR5OjE0ZWZjYTg5NDE4OTUxODEiLCJ4ZG06cGxhY2VtZW50SWQiOiJ4Y29yZTpvZmZlci1wbGFjZW1lbnQ6MTJkNTQ0YWU1NGU3ZTdkYiJ9"
            ]
        }
    }
}'
```

### Response {#response}

The Edge Network will return a response similar to the one below.

```json
{
   "requestId":"b375077d-7e1d-4c18-b7d3-e4da0fb4fbc5",
   "handle":[
      {
         "payload":[
            
         ],
         "type":"personalization:decisions",
         "eventIndex":0
      },
      {
         "payload":[
            {
               "id":"120d5db7-181c-42c5-8653-88b3cd3e1e69",
               "scope":"eyJ4ZG06YWN0aXZpdHlJZCI6Inhjb3JlOm9mZmVyLWFjdGl2aXR5OjE0ZWZjYTg5NDE4OTUxODEiLCJ4ZG06cGxhY2VtZW50SWQiOiJ4Y29yZTpvZmZlci1wbGFjZW1lbnQ6MTJkNTQ0YWU1NGU3ZTdkYiJ9",
               "activity":{
                  "id":"xcore:offer-activity:14efca8941895181",
                  "etag":"1"
               },
               "placement":{
                  "id":"xcore:offer-placement:12d544ae54e7e7db",
                  "etag":"1"
               },
               "items":[
                  {
                     "id":"xcore:personalized-offer:14efc848a3577d92",
                     "etag":"2",
                     "schema":"https://ns.adobe.com/experience/offer-management/content-component-json",
                     "data":{
                        "id":"xcore:personalized-offer:14efc848a3577d92",
                        "format":"application/json",
                        "language":[
                           "en-us"
                        ],
                        "content":"{\n\t\"ODEFirstTest\" : \"Personalizaton Content\"\n}",
                        "characteristics":{
                           "reporting":"testRequest"
                        }
                     }
                  }
               ]
            }
         ],
         "type":"personalization:decisions",
         "eventIndex":0
      },
      {
         "payload":[
            {
               "key":"kndctr_53A16ACB5CC1D3760A495C99_AdobeOrg_identity",
               "value":"CiYwNTkwNzYzODExMjkyNDQ4NDI0MTAyOTA4MjQwNTI5NzE1MTc2M1IOCLr6xb39LxgBKgNPUjLwAbr6xb39Lw==",
               "maxAge":34128000
            }
         ],
         "type":"state:store"
      }
   ]
}
```

If the visitor qualifies for a personalization activity based on data sent to [!DNL Offer Decisioning], the relevant activity content will be found under the `handle` object, where the type is `personalization:decisions`.

Other content will be returned under the `handle` object as well. Other content types are not relevant to [!DNL Offer Decisioning] personalization. If the visitor qualifies for multiple activities, they will be contained in an array. 

The table below explains the key elements of that portion of the response.

|Property | Description |Example |
|---|---|---|
|`scope`| The decision scope associated with the proposed offers that were returned. | `"scope": "eyJhY3Rpdml0eUlkIjoieGNvcmU6b2ZmZXItYWN0aXZpdHk6MTFjZmIxZmE5MzM4MWFjYSIsInBsYWNlbWVudElkIjoieGNvcmU6b2ZmZXItcGxhY2VtZW50OjExNzUwMDk2MTJiMDEwMGMifQ=="`|
|`activity.id`| The unique ID of the offer activity.| `"id": "xcore:offer-activity:11cfb1fa93381aca"` |
|`placement.id`| The unique ID of the offer placement.| `"id": "xcore:offer-placement:1175009612b0100c"`|
|`items.id`| The unique ID of the proposed offer.| `"id": "xcore:personalized-offer:124cc332095cfa74"`|
|`schema`| The schema of the content associated with the proposed offer. | `"schema": "https://ns.adobe.com/experience/offer-management/content-component-html"`|
|`data.id`| The unique ID of the proposed offer. | `"id": "xcore:personalized-offer:124cc332095cfa74"`|
|`format`| The format of the content associated with the proposed offer. | `"format": "text/html"`|
|`language`| An array of languages associated with the content from the proposed offer.| `"language": [ "en-US" ]`|
|`content`| Content associated with the proposed offer in the format of a string. | `"content": "<p style="color:red;">20% Off on shipping</p>"`|
|`deliveryUrl`| Image content associated with the proposed offer in the format of a URL. | `"deliveryURL": "https://image.jpeg"`|
|`characteristics`| JSON object containing the characteristics associated with the proposed offer. | `"characteristics": { "foo": "bar", "foo1": "bar1" }`|
