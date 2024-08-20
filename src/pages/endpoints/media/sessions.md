---
title: sessionstart endpoint
description: Signals the start of a session. Returns a session ID, which is required for all other endpoints.
---
# `sessionstart` endpoint

The `sessionstart` endpoint creates a media tracking session for a visitor. A successful response includes a session ID, which is required for all other endpoints. Make sure that you follow [Getting started](#) to obtain a datastream ID.
 
**`POST https://edge.adobedc.net/ee/va/v1/sessionStart?configId={datastream ID}`**

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST "https://edge.adobedc.net/ee/va/v1/sessionStart?configId={datastreamId}" \
--header 'Content-Type: application/json' \
--data-raw '{
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
            "channel": "sample-channel",
            "appVersion": "va-api-1.0.0"
          },
          "playhead": 0
        }
      }
    }
  ]
}'
```

#### Response

```json
{
  "requestId": "df14bca1-ba0f-4574-ae80-a4e24a960c00",
  "handle": [
    {
      "payload": [
        {
          "sessionId": "af8bb22766e458fa0eef98c48ea42c9e351c463318230e851a19946862020333"
        }
      ],
      "type": "media-analytics:new-session",
      "eventIndex": 0
    },
    {
      "payload": [
        {
          "key": "kndctr_6D9FE18C5536A5E90A4C98A6_AdobeOrg_cluster",
          "value": "irl1",
          "maxAge": 1800
        },
        {
          "key": "kndctr_6D9FE18C5536A5E90A4C98A6_AdobeOrg_identity",
          "value": "CiY1MTkxMDM4OTc1MzkwMTY4NTQ1NjAxNDg4OTgzODU5MTAzMDcyMVIPCKKt8KnsMBgBKgRJUkwx8AGirfCp7DA=",
          "maxAge": 34128000
        }
      ],
      "type": "state:store"
    }
  ]
}
```

In the example request above, the `eventType` value contains the prefix `media.` according to the [Experience Data Model (XDM)](https://experienceleague.adobe.com/docs/experience-platform/xdm/home.html) for specifying domains.

Also, the datatypes mapping for `eventType` in the example above are as follows:

| eventType | datatypes |
| -------- | ------ |
| media.SessionStart | [sessionDetails](https://github.com/adobe/xdm/blob/master/docs/reference/datatypes/sessiondetails.schema.md) |
| media.chapterStart | [chapterDetails](https://github.com/adobe/xdm/blob/master/docs/reference/datatypes/chapterdetails.schema.md) |
| media.adBreakStart | [advertisingPodDetails](https://github.com/adobe/xdm/blob/master/docs/reference/datatypes/advertisingpoddetails.schema.md) |
| media.adStart | [advertisingDetails](https://github.com/adobe/xdm/blob/master/docs/reference/datatypes/advertisingdetails.schema.md) |
| media.error | [errorDetails](https://github.com/adobe/xdm/blob/master/docs/reference/datatypes/errordetails.schema.md) |
| media.statesUpdate | [statesStart](https://github.com/adobe/xdm/blob/master/docs/reference/datatypes/mediadetails.schema.md#xdmstatesstart): Array[playerStateData], [statesEnd](https://github.com/adobe/xdm/blob/master/docs/reference/datatypes/mediadetails.schema.md#xdmstatesend): Array[playerStateData] |
| media.sessionStart, media.chapterStart, media.adStart | [customMetadata](https://github.com/adobe/xdm/blob/master/docs/reference/datatypes/mediadetails.schema.md#xdmcustommetadata) |
|all | [qoeDataDetails](https://github.com/adobe/xdm/blob/master/docs/reference/datatypes/qoedatadetails.schema.md) |

### Example response

The following example shows a successful response for the session start request:

```curl
HTTP/2 200
x-request-id: 99603f5c-95cf-49ad-9afb-0ba6c5867fd7
x-rate-limit-remaining: 599
vary: Origin
date: Tue, 07 Mar 2023 14:37:58 GMT
x-konductor: 23.3.2:367bc7dc
x-adobe-edge: IRL1;6
server: jag
content-type: application/json;charset=utf-8
strict-transport-security: max-age=31536000; includeSubDomains
cache-control: no-cache, no-store, max-age=0, no-transform
x-xss-protection: 1; mode=block
x-content-type-options: nosniff

{
    "requestId": "df14bca1-ba0f-4574-ae80-a4e24a960c00",
    "handle": [
        {
            "payload": [
                {
                    "sessionId": "af8bb22766e458fa0eef98c48ea42c9e351c463318230e851a19946862020333"
                }
            ],
            "type": "media-analytics:new-session",
            "eventIndex": 0
        },
        {
            "payload": [
                {
                    "key": "kndctr_6D9FE18C5536A5E90A4C98A6_AdobeOrg_cluster",
                    "value": "irl1",
                    "maxAge": 1800
                },
                {
                    "key": "kndctr_6D9FE18C5536A5E90A4C98A6_AdobeOrg_identity",
                    "value": "CiY1MTkxMDM4OTc1MzkwMTY4NTQ1NjAxNDg4OTgzODU5MTAzMDcyMVIPCKKt8KnsMBgBKgRJUkwx8AGirfCp7DA=",
                    "maxAge": 34128000
                }
            ],
            "type": "state:store"
        }
    ]
}
```

In the example response above, the `sessionId` is shown as `af8bb22766e458fa0eef98c48ea42c9e351c463318230e851a19946862020333`. You will use this ID in subsequent event requests as a required parameter.

For more information on Session Start endpoint parameters and examples, see the [Media Edge Swagger](swagger.md) file.

For more information on XDM media data parameters, see [Media Details Information Schema](https://github.com/adobe/xdm/blob/master/docs/reference/datatypes/mediadetails.schema.md#xdmplayhead). 

## Session Complete event request

The Session Complete event is sent when the end of the main content is reached. To make a Session Complete event request, use your `sessionId` in the payload of a call to the following endpoint:

**POST**  `https://edge.adobedc.net/ee-pre-prd/va/v1/sessionComplete \`

### Example request

The following example shows a Session Complete cURL request:

```curl
curl -X 'POST' \
  'https://edge.adobedc.net/ee-pre-prd/va/v1/sessionComplete' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "events": [
    {
      "xdm": {
        "eventType": "media.sessionComplete",
        "mediaCollection": {
          "sessionID": "af8bb22766e458fa0eef98c48ea42c9e351c463318230e851a19946862020333",
          "playhead": 25
        },
        "timestamp": "YYYY-03-04T13:39:00+00:00"
      }
    }
  ]
}'
```

The successful respone indicates a status of 200 and does not include any content.

For more information on Session Complete endpoint parameters and examples, see the [Media Edge Swagger](swagger.md) file.