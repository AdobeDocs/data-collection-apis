---
title: Performance guardrails for Edge Network API
description: Learn how to use the API within optimal performance guardrails.
---

# Performance guardrails

Performance guardrails define usage limits related to your API use cases. Exceeding these limits can result in performance degradation. Adobe is not responsible for performance degradation caused by exceeded usage limits.

If you frequently encounter these limits, you can request additional processing capacity to avoid performance degradation. Check your license entitlements in your contract and corresponding [Product Description](https://helpx.adobe.com/legal/product-descriptions.html) for actual usage limits.

All performance guardrails described in this page apply at the IMS Organization level. For users with multiple IMS Organizations configured, each organization is individually subject to the performance guardrails below. See the [Experience Platform glossary](https://experienceleague.adobe.com/en/docs/experience-platform/landing/glossary) for more details about IMS Organizations.

## Definitions

- **Availability**: Calculated for each five-minute interval as the percentage of requests processed by the Experience Platform Edge Network that do not fail with errors and relate solely to the provisioned Edge Network APIs. If no requests are made in a given five-minute interval, that interval is considered to be 100% available.
- **Monthly uptime percentage**: Calculated as the average of the availability for all five-minute intervals in a month for a given region.
- **Upstream**: A service behind the Edge Network, enabled for a specific datastream, such as Adobe Server Side Forwarding, Adobe Edge Segmentation, or Adobe Target.
- **Request unit**: Corresponds to an 8 KB fragment of a request and one upstream configured for a datastream.
- **Request**: A single message sent by a customer-owned application to the API, which can contain one or more request units.
- **Error**: Any request that fails due to an Edge Network [internal service error](troubleshooting.md).

## Service limits

All datastreams enforce certain usage limits, which mainly control how many events can be sent concurrently, their size, and the number of upstream services that those requests are routed to.

### Request units

All limits are applied and normalized over a **request unit**, defined as a **8 KB fragment** of a request going to one upstream service configured in a datastream.

| Upstreams configured per datastream | Average request size | Request units |
| --- | --- | --- |
| 1 (Adobe Platform) | 8 KB (1 fragment) | 1 |
| 2 (Adobe Platform, Adobe Target) | 8 KB (1 fragment)  | 2 |
| 2 (Adobe Platform, Adobe Target) | 16 KB (2 fragments)  | 4 |
| 2 (Adobe Platform, Adobe Target) | 64 KB (8 fragments)  | 16 |

### Request units limits

The table below shows the default limit values. If you need higher request unit limits, reach out to your Adobe Account Team.

| Endpoint | Requests units per second |
| --- | --- |
| `/v2/interact` | 4000 |
| `/v2/collect` | 6000 |

### HTTP Request size limit

| Payload format | Max size for a request | Max 8 KB request fragments |
| --- | --- | --- |
| JSON plain-text | 64 KB | 8 |

Depending on the payload itself, binary formats are generally 20-40% more compact, allowing you to push more data than you would in plain-text JSON. Contact Customer Care if you need a higher capacity for your datastreams.
