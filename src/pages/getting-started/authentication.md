---
title: Authentication
description: Learn how to configure authentication for the Adobe Experience Platform Edge Network API.
---

# Authentication

Some endpoints, such as [`collect`](../endpoints/collect/index.md) or [`interact`](../endpoints/interact/index.md), support both authenticated events and non-authenticated events.

* Non-authenticated events are best suited for client-to-server data collection. For example, a visitor arrives on your site, and the API call is sent from the visitor's browser.
* Authenticated events are best suited for server-to-server data collection. For example, a visitor arrives on your site, and the API call is generated from your server when the visitor requests your website content.

You can configure a datastream to accept either authenticated or non-authenticated events, or you can configure it to only accept authenticated events. See the documentation on how to [create and configure datastreams](https://experienceleague.adobe.com/en/docs/experience-platform/datastreams/configure#@advanced-options) for more information. A datastream accepts both authenticated and non-authenticated events by default.

All authenticated events require the following three headers in every API call:

* [`Authorization`](#authorization)
* [`x-api-key`](#x-api-key)
* [`x-gw-ims-org-id`](#x-gw-ims-org-id)

## Prerequisites {#prerequisites}

Before you make calls to the Edge Network API, make sure that you meet the following prerequisites:

* You have an account with access to Adobe Experience Platform in the desired IMS org.
* You are added as both a developer and a user for Adobe Experience Platform in the Adobe Admin Console. Contact your organization's product or system admin to be added to the correct product profiles or user groups.

If you meet both of the above criteria, you can perform both of the following vital tasks:

* [Create or edit datastreams](https://experienceleague.adobe.com/en/docs/experience-platform/datastreams/configure) within the Adobe Experience Platform UI
* [Create or edit API projects](https://developer.adobe.com/developer-console/docs/guides/projects/projects-empty/) within the Adobe Developer Console

## `Authorization` {#authorization}

The `Authorization` header contains a token that authenticates your API call. You can quickly generate an access token in your Adobe Developer project using the following steps:

1. Log in to the [Adobe Developer Console](https://developer.adobe.com/console).
1. Navigate to **Projects**, and select the desired project (or create one).
1. Under **Credentials**, select **OAuth Server-to-Server**.
1. Click the **Generate access token** button.

See [server to server authentication](https://developer.adobe.com/developer-console/docs/guides/authentication/ServerToServerAuthentication/) in the Adobe Developer authentication guide for instructions on how to programmatically obtain this token. This header uses the following format:

`Authorization: Bearer eyJ[...]rtw`

## `x-api-key` {#x-api-key}

The `x-api-key` header contains the API sandbox identifier. You can obtain this key in your Adobe Developer project:

1. Log in to the [Adobe Developer Console](https://developer.adobe.com/console).
1. Navigate to **Projects**, and select the desired project (or create one).
1. Under **Credentials**, select **OAuth Server-to-Server**.
1. Copy the **Client ID** on the page.

This header uses the following format:

`x-api-key: a52cf[...]1ed71`

## `x-gw-ims-org-id` {#x-gw-ims-org-id}

The `x-gw-ims-org-id` contains the IMS org of the API project you're working in. You can obtain this identifier using the following steps:

1. Log in to [Adobe Experience Platform](https://platform.adobe.com)
1. On any page in the Platform UI, press `[Ctrl]` + `[I]`.
1. Locate the **Currnt Org ID** in the **User Information** tab. You might need to scroll to locate this field.

This header uses the following format:

`x-gw-ims-org-id: 53A[...]C99@AdobeOrg`

## Troubleshooting {#troubleshooting}

See the following table for common authorization issue and how to resolve them.

| Error code | Error message | Description |
| --- | --- | --- |
| `EXEG-0500-401` | Invalid authorization token | This error message is displayed in any of the following situations:  <ul><li>The `Authorization` header value is missing.</li><li>The `Authorization` header value does not include the required `Bearer` token.</li><li>The provided authorization token has an invalid format.</li><li>The datastream requires authentication but the request is missing required headers.</li></ul> |
| `EXEG-0502-401` | Invalid authorization token | The authorization token is in a correct format, but the token itself is invalid. |
| `EXEG-0503-401` | Invalid authorization token | The authorization token is expired. Generate a new token to resolve this issue. |
| `EXEG-0504-401` | Required product context is missing | This error message is displayed in any of the following situations: <ul><li>The developer account does not have access to Adobe Experience Platform product context.</li><li>The company account is not yet entitled to Adobe Experinece Platform.</li></ul> |
| `EXEG-0505-401` | Required authorization token scope is missing | This error applies only to service account authentication. The error message is displayed when the service authorization token included in the call belongs to a service account which does not have access to the `acp.foundation` IMS scope.|
| `EXEG-0506-401` | Sandbox not accessible for write | This error message is displayed when the developer account does not have `WRITE` access to the Experience Platform sandbox that the datastream belongs in. |
