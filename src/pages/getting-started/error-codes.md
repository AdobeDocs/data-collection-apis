---
title: Error codes
description: Look up Adobe Experience Platform Edge Network API error codes, whether each error is retriable, and the recommended action to resolve it.
---

# Error codes

This page lists all Edge Network API error codes, whether each error is retriable, and the recommended action to resolve it. To learn how the API returns errors and how to build a retry strategy, see [Troubleshooting](troubleshooting.md).

## Find the error code

Each error object includes a `type` property that identifies the error code, in the format `https://ns.adobe.com/aep/errors/EXEG-<CODE>-<STATUS>`. For example, `https://ns.adobe.com/aep/errors/EXEG-0104-422` identifies error code `EXEG-0104-422`, where `422` is the HTTP status of the error. Search this page for the error code to find its description and recommended action.

Values in curly braces, such as `{serviceName}` or `{fieldPath}`, are placeholders. The error returned by the API contains the actual value for your request.

## How to read the tables

The description of each error starts with its severity. See [Error severity](troubleshooting.md#error-severity) for details.

* **Fatal**: The request was rejected and not processed.
* **Non-fatal**: The request was accepted and your data was collected, but an upstream service failed. The HTTP status of the response is `207 Multi-Status`.
* **Warning**: The request was processed successfully, but an upstream service reported a condition that might have partially affected the result.

The **Retriable** column indicates whether you should retry the request:

| Value | Meaning |
| --- | --- |
| Yes | The error is transient. Retry the request using the [retry strategy](troubleshooting.md#retry-strategy). |
| No | Retrying the same request won't succeed or isn't recommended. Follow the recommended action instead. |
| Conditional | Retry only after you resolve the stated condition, such as refreshing an expired access token. |
| N/A | The request was processed successfully, so no retry is needed. |

## Service and datastream errors

Error codes `EXEG-0000` through `EXEG-0099` relate to the Edge Network service and datastream configuration.

| Error code | Message | Retriable | Description and recommended action |
| --- | --- | --- | --- |
| `EXEG-0001-500` | Unexpected error | No | **Fatal.** An unexpected error has occurred while processing the request. Do not retry. Contact Adobe Customer Care and include the `requestId` from the error report. |
| `EXEG-0002-400` | Missing datastream parameter | No | **Fatal.** The required datastream parameter `{paramName}` is missing from your request. Add the datastream ID to your request, using the `datastreamId` query parameter, or `configId` for v1 endpoints. See the [Edge Network API reference](../api/index.md). |
| `EXEG-0003-400` | Invalid datastream ID | No | **Fatal.** The datastream ID `{dataStreamId}` referenced in your request does not exist. Verify the datastream ID in Adobe Experience Platform Data Collection. Make sure that the ID is correct and that the [datastream](https://experienceleague.adobe.com/en/docs/experience-platform/datastreams/overview) has not been deleted. |
| `EXEG-0004-422` | Datastream disabled | No | **Fatal.** The datastream with the ID `{dataStreamId}` is disabled. Enable the datastream in Adobe Experience Platform Data Collection, or use the ID of a different, active datastream. |
| `EXEG-0010-422` | Invalid datastream configuration | No | **Fatal.** The Experience Platform datastream configuration is missing for IMS Org `{imsOrg}`. Verify that your datastream has the Adobe Experience Platform service configured for the correct IMS Organization. See [Create and configure datastreams](https://experienceleague.adobe.com/en/docs/experience-platform/datastreams/configure). |
| `EXEG-0012-422` | The referenced sandbox cannot be resolved | No | **Fatal.** The referenced sandbox `{sandboxName}` does not exist or is not owned by IMS Org `{imsOrg}`. Verify that the sandbox name is correct and belongs to your organization. You can list the available sandboxes using the [Sandbox API](https://experienceleague.adobe.com/en/docs/experience-platform/sandbox/api/sandboxes). |
| `EXEG-0013-422` | The referenced identity namespace code `{identityNamespaceCode}` cannot be resolved | No | **Fatal.** The referenced identity namespace code `{identityNamespaceCode}` does not exist for IMS Org `{orgId}` and sandbox `{sandboxName}`. Verify that the identity namespace exists in your organization and sandbox. See [Identity namespace overview](https://experienceleague.adobe.com/en/docs/experience-platform/identity/features/namespaces). |

## Request errors

Error codes `EXEG-0100` through `EXEG-0199` relate to the format and content of your request.

| Error code | Message | Retriable | Description and recommended action |
| --- | --- | --- | --- |
| `EXEG-0100-500` | JSON processing error | No | **Fatal.** An error occurred while processing your JSON request. This is a server-side processing error. Do not retry. Contact Adobe Customer Care and include the `requestId` from the error report. |
| `EXEG-0101-400` | Invalid JSON request | No | **Fatal.** The JSON request is invalid. Validate your JSON payload with a JSON linter, fix any syntax errors, and send the request again. |
| `EXEG-0102-400` | Invalid request field | No | **Fatal.** The value supplied for the `{fieldPath}` field does not match your input schema. Check the value at the specified field path against your [XDM schema](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/home). Make sure that the data type and format match the schema definition. |
| `EXEG-0103-400` | Missing required value | No | **Fatal.** The `{fieldPath}` field is mandatory. Add the missing field to your request payload. See your XDM schema for the list of mandatory fields. |
| `EXEG-0104-422` | Input validation error | No | **Fatal.** The request is invalid. Review the `report` object in the response for the specific validation failures. Fix all reported issues before you send the request again. |
| `EXEG-0105-400` | Input validation error | No | **Fatal.** The request is invalid. Review the error details, fix the invalid fields in your request payload, and send the request again. |
| `EXEG-0106-400` | Invalid Content-Type header | No | **Fatal.** The provided `Content-Type` header value is invalid. Set the `Content-Type` header to one of the supported values, which are listed in the error message as `{supportedContentTypes}`. For JSON payloads, use `application/json`. |
| `EXEG-0107-400` | Missing required parameter | No | **Fatal.** The required parameter `{paramName}` is missing from your request. Add the missing parameter to your request. See the [Edge Network API reference](../api/index.md) for the required parameters of each endpoint. |
| `EXEG-0108-400` | Invalid parameter type | No | **Fatal.** The `{parameterName}` parameter type is not supported. Check the [Edge Network API reference](../api/index.md) for the expected parameter type, and correct your request. |
| `EXEG-0109-408` | Empty request | No | **Fatal.** The request body is empty. Include a valid request body with your API call. |
| `EXEG-0110-400` | Missing parameter value | No | **Fatal.** The `{parameterName}` value is required when cookie support is enabled. Provide the required parameter value, or disable cookie support if you don't need it. |
| `EXEG-0112-413` | Invalid request | No | **Fatal.** The request payload is too large. The maximum accepted size for request payloads is `{maxSize}`. Reduce the size of your request payload, or split it into multiple smaller requests. See [Performance guardrails](guardrails.md#http-request-size-limit) for request size limits. |
| `EXEG-0113-400` | Invalid request | No | **Fatal.** The configuration override payload is invalid. The override payload is either malformed, or references an override that is not enabled in your datastream configuration. Review the `report` object in the response for details. Make sure that all overrides in your request are valid and explicitly enabled in your datastream settings. See [Configure datastream overrides](https://experienceleague.adobe.com/en/docs/experience-platform/datastreams/overrides). |

## Upstream service errors

Error codes `EXEG-0200` through `EXEG-0299` relate to upstream services, such as Adobe Target or Adobe Journey Optimizer. These errors are returned in the `errors` or `warnings` array of the response body. See [Non-fatal errors](troubleshooting.md#non-fatal-errors) for the list of upstream service IDs that replace the `{serviceName}` placeholder.

| Error code | Message | Retriable | Description and recommended action |
| --- | --- | --- | --- |
| `EXEG-0200-504` | The service call has timed out | No | **Non-fatal.** The service call to `{serviceName}` exceeded the allowed time and was canceled. The real-time response from this service is missed, but data collection is not affected. Retrying is not recommended. If you retry, apply [event deduplication](https://experienceleague.adobe.com/en/docs/experience-platform/collection/use-cases/event-duplication). |
| `EXEG-0201-503` | The service is temporarily unavailable | No | **Non-fatal.** The `{serviceName}` service is temporarily unable to serve this request. The real-time response from this service is missed, but data collection is not affected. Retrying is not recommended. If you retry, apply [event deduplication](https://experienceleague.adobe.com/en/docs/experience-platform/collection/use-cases/event-duplication). |
| `EXEG-0202-502` | The service failed to process this request | No | **Non-fatal.** The `{serviceName}` service failed to process this request. This error typically indicates an issue with the request input or configuration. Review your request payload and datastream configuration. If the error persists, contact Adobe Customer Care and include the `requestId` and the name of the failing service. |
| `EXEG-0203-502` | The service call has failed | No | **Non-fatal.** An error occurred while calling the `{serviceName}` service for this request. The real-time response from this service is missed, but data collection is not affected. Retrying is not recommended. If you retry, apply [event deduplication](https://experienceleague.adobe.com/en/docs/experience-platform/collection/use-cases/event-duplication). If the error persists, contact Adobe Customer Care. |
| `EXEG-0204-200` | The service call completed with warning(s) | N/A | **Warning.** A warning occurred while calling the `{serviceName}` service for this request. The request was processed successfully, so no retry is needed. Review the warning details in the response to determine whether you need to change future requests to avoid this warning. If this warning persists, contact Adobe Customer Care. |

## Identity and consent errors

Error codes `EXEG-0300` through `EXEG-0399` relate to user consent and identities.

| Error code | Message | Retriable | Description and recommended action |
| --- | --- | --- | --- |
| `EXEG-0301-200` | User consent missing | No | **Warning.** This request was ignored due to lack of user consent. Collect the required user consent before you send data. See [Consent processing in Adobe Experience Platform](https://experienceleague.adobe.com/en/docs/experience-platform/landing/governance-privacy-security/consent/adobe/overview). |
| `EXEG-0303-200` | Unauthorized to fetch identities | No | **Warning.** Unauthorized to fetch identities from the following namespaces: `{unauthorizedNamespaces}`. The allowed namespaces are `{allowedNamespaces}`. Update your request to only reference the identity namespaces that your integration is authorized to access. |
| `EXEG-0304-400` | Unexpected identities provided | No | **Fatal.** The unexpected identities `{unexpectedIdentities}` were provided for the following event: `#{index}`. Remove the unexpected identities from the event. Only include identities that match your datastream configuration. |
| `EXEG-0305-400` | Invalid identity provided | No | **Fatal.** The request contains an invalid identity (`{invalidIdValue}`) in the `{invalidIdNamespace}` namespace. Fix the identity value for the specified namespace. Make sure that identity values conform to the format requirements of the [namespace](https://experienceleague.adobe.com/en/docs/experience-platform/identity/features/namespaces). |
| `EXEG-0306-400` | Event is missing primary identity | No | **Fatal.** There was no primary identity provided for event `#{index}`. Include a primary identity for the event by setting `"primary": true` on one identity in the `identityMap`. |
| `EXEG-0307-502` | User consent update error | Yes | **Fatal.** An error occurred while updating user consent settings. This error only occurs on consent update requests to the `/v1/privacy/set-consent` endpoint. The consent update was not partially applied, so you can safely retry using the [retry strategy](troubleshooting.md#retry-strategy). |

## Geographic restriction errors

Error codes `EXEG-0400` through `EXEG-0499` relate to the geographic origin of your request.

| Error code | Message | Retriable | Description and recommended action |
| --- | --- | --- | --- |
| `EXEG-0400-403` | Request ignored due to geographical restrictions | No | **Fatal.** Requests from this country are not allowed. This restriction is based on the origin of your request. Make sure that your requests originate from an allowed region. If you believe that this is an error, contact Adobe Customer Care. |

## Authorization errors

Error codes `EXEG-0500` through `EXEG-0599` relate to authentication and authorization. See [Authentication](authentication.md) to learn how to authenticate your requests.

| Error code | Message | Retriable | Description and recommended action |
| --- | --- | --- | --- |
| `EXEG-0500-401` | Invalid authorization token | No | **Fatal.** The required authorization token is missing or has an invalid format. This error occurs when the `Authorization` header is missing, doesn't include the required `Bearer` token, or has an invalid format. It also occurs when the datastream requires authentication, but the request is missing required headers. Include a valid `Bearer` access token in the `Authorization` header. You can generate a new token in the Adobe Developer Console. |
| `EXEG-0501-401` | Invalid user authorization token | No | **Fatal.** The required user token is missing or has an invalid format. Check the `{headerName}` header value. Provide a valid user access token, regenerated through your OAuth flow or the Adobe Developer Console. |
| `EXEG-0502-401` | Invalid authorization token signature | No | **Fatal.** The authorization token has a correct format, but its signature is invalid. Generate a new access token, and make sure that your OAuth client credentials and configuration are correct. |
| `EXEG-0503-401` | Authorization token expired | Conditional | **Fatal.** The authorization token has expired. Refresh your access token, then retry the request. To avoid this error, refresh access tokens proactively in your integration. |
| `EXEG-0504-401` | Missing required product context | No | **Fatal.** The user authorization token is missing the following required product context: `{productContext}`. This error occurs when the developer account doesn't have access to the Adobe Experience Platform product context, or when the company account is not yet entitled to Adobe Experience Platform. Make sure that your user account has the required product profiles assigned in the Adobe Admin Console. |
| `EXEG-0505-401` | Missing required authorization token scope | No | **Fatal.** The service authorization token is missing the following required scope: `{scope}`. This error applies only to service account authentication. Make sure that your Adobe Developer Console project includes the Experience Platform API with the appropriate product profile. The required scope is typically `acp.foundation`. See [Authenticate and access Experience Platform APIs](https://experienceleague.adobe.com/en/docs/experience-platform/landing/platform-apis/api-authentication). |
| `EXEG-0506-401` | Missing sandbox write permissions | No | **Fatal.** The user authorization token does not have `DATASET.WRITE` permissions for the `{sandboxName}` sandbox. Make sure that the user's product profile in the Adobe Admin Console includes access to the target sandbox, and the **Manage Datasets** permission under **Data Management**. See [Access control overview](https://experienceleague.adobe.com/en/docs/experience-platform/access-control/home). |
| `EXEG-0507-503` | Authorization service error | Yes | **Fatal.** An error occurred while authorizing the request. This is a transient failure in the authorization service. Retry using the [retry strategy](troubleshooting.md#retry-strategy). If the error persists for more than 10 minutes, contact Adobe Customer Care. |

## Errors without an error code

Some `502 Bad Gateway`, `503 Service Unavailable`, and `504 Gateway Timeout` errors occur at the network or infrastructure level. These responses don't include a structured `EXEG` error code.

These errors are retriable. Retry using the [retry strategy](troubleshooting.md#retry-strategy). If the error persists for more than 10 minutes, contact Adobe Customer Care.
