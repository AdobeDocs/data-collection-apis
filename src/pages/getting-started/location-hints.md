---
title: Location hints
description: Route requests to the same server for processing.
---
# Location hints

The Adobe Experience Platform Edge Network uses several globally-distributed servers to ensure fast response times regardless of the end user location. It also uses DNS-based routing to ensure that requests are always routed to the Edge Network location that is closest to the end users.

If end users connect to a VPN or switch network types on their mobile devices during a session, Edge Network requests can often be routed to a different location. Mid-session routing between servers can be problematic, as Adobe Experience Platform and Adobe Experience Cloud solutions store end user profile information on the Edge Network.

Location hints help maintain consistency for user profile processing to ensure that events are processed on the same server. This feature allows users to have a consistent experience, no matter what network changes they experience during a session.

## Location hints usage

Location hints are included in the response of the initial Edge Network request and in all subsequent requests, as shown in the example below:


```json
{
   "payload":[
      {
         "scope":"EdgeNetwork",
         "hint":"or2",
         "ttlSeconds":1800
      }
   ],
   "type":"locationHint:result"
}
```

The hint associated with the `EdgeNetwork` scope can contain one of the following values:

* `or2`
* `va6`
* `irl1`
* `ind1`
* `jpn3`
* `sgp3`
* `aus3`

## API format

To ensure subsequent requests are routed correctly, insert the location hint in the URL path of subsequent API calls between the base path, typically `ee`, and `v2` API version.

`POST https://edge.adobedc.net/ee/{LOCATION_HINT}/v2/interact?datastreamId={DataStream_ID}`

## Storing location hints in cookies

To ensure the location hint returned by the Edge Network persists for the duration of the session, you can store the location hint value in a cookie, along with the cookie lifetime, which is contained in the `ttlSeconds` field (typically 1800 seconds).

As with most cookies, extend the lifetime of this cookie each time there is a response from the Edge Network. To ensure maximum compatibility with the Web SDK, use the cookie name `kndctr_{IMSORG}_AdobeOrg_cluster`. Organization IDs typically end with `@AdobeOrg`. The `@` value must be converted to an underscore to ensure that the cookie is in the correct format.
