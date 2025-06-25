---
title: Data collection API endpoints
description: Learn what endpoints are available and how you can use them.
---
# Data collection API endpoints

The Adobe Experience Platform Edge Network provides an optimized way for you to send data to any Adobe Experience Cloud product or Adobe Experience Platform service.

You can use these API endpoints for various data collection, personalization, advertising and marketing use cases. Since they do not rely on any libraries to load, they provide a lightning-fast way to interact with the Edge Network and supported solutions.

<Embed slots="video"/>

https://video.tv.adobe.com/v/341448/

Adobe offers several endpoints that facilitate the interaction with the Edge Network, through the APIs below:

* **Edge Network API**: Includes the [`interact`](interact/index.md) and [`collect`](collect/index.md) endpoints, sending data directly to a datastream
* **Media Edge API**: Includes 18 endpoints that allow you to compose a streaming media session on Adobe's servers. When the session completes, those events are aggregated into a smaller number of events and sent to the desired datastream.

The benefits of using these endpoints include:

* Reduced page load time
* Improved latency
* First-party data collection
* Streamlined, server-side communication between services

<InlineAlert variant="warning" slots="text" />

These endpoints are subject to additive changes and their behavior can evolve without notice. For example, Adobe may add new objects or properties to response payloads in the future.

Make sure that any implementations using these APIs can accommodate additional fields without failing. Any breaking changes, such as the removal of request or response objects, are released as a new incremental API version.

## Authenticated data collection

The Edge Network API supports both client-to-server and server-to-server API calls.

Authenticated API calls enable use cases that allow for secure collection of sensitive data according to your organization's privacy policies. In addition to authentication, the Edge Network API supports marking datastreams to accept only authenticated communication.

The Media Edge API currently supports client-to-server API calls only.

* Authenticated API calls use `server.adobedc.net` endpoints.
* Non-authenticated API calls use `edge.adobedc.net` endpoints.
