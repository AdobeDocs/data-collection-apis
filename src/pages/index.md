---
title: Adobe Experience Platform data collection APIs
description: The data collection APIs overview page.
---

<Hero slots="image, heading, text" background="rgb(154, 23, 34)"/>

![Hero image](assets/platform-hero.png)

# Adobe Experience Platform data collection APIs

The Adobe Experience Platform data collection APIs provide a universal way to ingest, standardize, and persist customer data from across your organization.

<Resources slots="heading, links"/>

#### Resources

* [Quick start guide](getting-started/index.md)
* [Endpoint guides](endpoints/index.md)
* [API reference](api/index.md)
* [Github repository](https://github.com/AdobeDocs/data-collection-apis)

## Overview

The Adobe Experience Platform data collection APIs provide endpoints for sending data to Adobe Experience Platform.

Data collection libraries, such as the Web SDK or Mobile SDK, provide methods that facilitate the usage of these endpoints. You can call data collection endpoints directly instead of using the Web SDK or Mobile SDK. This option is valuable when your project is in a code base that neither the Web SDK nor the Mobile SDK supports.

There are two main categories of endpoints:

* The **Edge Network API** provides the most straightforward way to send data to Adobe. These endpoints offer both authenticated and non-authenticated methods to send data to Adobe.
* The **Media Edge API** provides a set of endpoints which allow you to send media tracking data to Adobe. Usage of these endpoints require the Streaming Media Collection Add-on. Contact your Adobe Account Team for more information.

If you are looking for the API that allows you to use Adobe Experience Platform, see the [Adobe Experience Platform API documentation](https://developer.adobe.com/experience-platform-apis/).

This user guide adheres to Adobe's Code of Conduct. Contributions are encouraged and appreciated. See Adobe's [Code of Conduct](https://github.com/AdobeDocs/analytics-2.0-apis/blob/main/CODE_OF_CONDUCT.md) and [Contribution guidelines](https://github.com/AdobeDocs/analytics-2.0-apis/blob/main/.github/CONTRIBUTING.md) on GitHub for more information.
