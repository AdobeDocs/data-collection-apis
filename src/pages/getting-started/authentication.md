---
title: Authentication
description: Learn how to configure authentication for the Adobe Experience Platform Edge Network API.
---

# Authentication

Some endpoints, such as [`collect`](../endpoints/collect/index.md) or [`interact`](../endpoints/interact/index.md), support both authenticated events and non-authenticated events.

* Non-authenticated events are best suited for client-to-server data collection. For example, a visitor arrives on your site, and the API call is sent from the visitor's browser.
* Authenticated events are best suited for server-to-server data collection. For example, a visitor arrives on your site, and the API call is generated from your server when the visitor requests your website content.

Authenticated API calls allow for secure collection of sensitive data according to your organization's privacy policies. Each type of call uses a different hostname:

* Authenticated API calls use `server.adobedc.net` endpoints.
* Non-authenticated API calls use `edge.adobedc.net` endpoints.

You can configure a datastream to accept either authenticated or non-authenticated events, or you can configure it to only accept authenticated events. See the documentation on how to [create and configure datastreams](https://experienceleague.adobe.com/en/docs/experience-platform/datastreams/configure#@advanced-options) for more information. A datastream accepts both authenticated and non-authenticated events by default.

All authenticated events require the following three headers in every API call:

* `Authorization`
* `x-api-key`
* `x-gw-ims-org-id`

## Prerequisites

Before you make calls to the Edge Network API, make sure that you meet the following prerequisites:

* You have an account with access to Adobe Experience Platform in the desired IMS org.
* You are added as both a developer and a user for Adobe Experience Platform in the Adobe Admin Console. Contact your organization's product or system admin to be added to the correct product profiles or user groups.

If you meet both of the above criteria, you can perform both of the following vital tasks:

* [Create or edit datastreams](https://experienceleague.adobe.com/en/docs/experience-platform/datastreams/configure) within the Adobe Experience Platform UI
* [Create or edit API projects](https://developer.adobe.com/developer-console/docs/guides/projects/projects-empty) within the Adobe Developer Console

## `Authorization`

The `Authorization` header contains a token that authenticates your API call. You can quickly generate an access token in your Adobe Developer project using the following steps:

1. Log in to the [Adobe Developer Console](https://developer.adobe.com/console).
1. Navigate to **Projects**, and select the desired project (or create one).
1. Under **Credentials**, select **OAuth Server-to-Server**.
1. Click the **Generate access token** button.

See [server to server authentication](https://developer.adobe.com/developer-console/docs/guides/authentication/ServerToServerAuthentication/) in the Adobe Developer authentication guide for instructions on how to programmatically obtain this token. This header uses the following format:

`Authorization: Bearer eyJ[...]rtw`

## `x-api-key`

The `x-api-key` header contains the API sandbox identifier. You can obtain this key in your Adobe Developer project:

1. Log in to the [Adobe Developer Console](https://developer.adobe.com/console).
1. Navigate to **Projects**, and select the desired project (or create one).
1. Under **Credentials**, select **OAuth Server-to-Server**.
1. Copy the **Client ID** on the page.

This header uses the following format:

`x-api-key: a52cf[...]1ed71`

## `x-gw-ims-org-id`

The `x-gw-ims-org-id` contains the IMS org of the API project you're working in. You can obtain this identifier using the following steps:

1. Log in to [Adobe Experience Platform](https://platform.adobe.com)
1. On any page in the Platform UI, press `[Ctrl]` + `[I]`.
1. Locate the **Current Org ID** in the **User Information** tab. You might need to scroll to locate this field.

This header uses the following format:

`x-gw-ims-org-id: 53A[...]C99@AdobeOrg`

## Troubleshooting

If an authenticated request fails with an `EXEG-05xx` error code, see [Authorization errors](error-codes.md#authorization-errors) for the cause of each error, whether it is retriable, and how to resolve it.
