---
title: Getting started using the Data collection APIs
description: Learn how to set up your environment to send tracking data to Adobe via the data collection APIs.
---

# Getting started using the Data collection APIs

The Adobe Experience Platform data collection APIs provide an easy way to send data to the Adobe Experience Platform Edge Network. The Edge Network parses each event and passes it along to each connected app or service, such as Adobe Experience Platform or Adobe Analytics.

Adobe recommends starting out with a basic [`interact`](../endpoints/interact/index.md) call to begin sending data to a [datastream](https://experienceleague.adobe.com/en/docs/experience-platform/datastreams/overview). The following steps allow you to successfully collect data in a new datastream.

## Create a schema

A [schema](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/schema/composition) organizes your data so it is stored in a consistent format. Follow the steps in the documentation on [how to create a new schema](https://experienceleague.adobe.com/en/docs/experience-platform/xdm/ui/resources/schemas#create), and select **Experience Event** as the base class for this schema. Give the schema a name, then select **Finish**.

## Create a dataset

A [dataset](https://experienceleague.adobe.com/en/docs/experience-platform/catalog/datasets/overview) is a location in Adobe Experience Platform where your data is stored. See the documentation on [how to create a dataset](https://experienceleague.adobe.com/en/docs/experience-platform/catalog/datasets/user-guide#create) for more information.

1. In the left navigation menu, select **Datasets** within the Data Management section.
1. Select **Create dataset** in the top right.
1. Select **Create dataset from schema**.
1. Select the schema created in the previous step, then click **Next**.
1. Give the dataset a name, then click **Finish**.

## Create a datastream

A _datastream_ is a location in the Edge Network that forwards your data to configured apps and services in the correct format.

1. In the left navigation menu, select **Datastreams** within the Data Collection section.
1. Select **New Datastream** in the top right.
1. Give the datastream a name, and select the schema created previously under **Mapping Schema**. Click **Save**.
1. Select **Add Service** in the center.
1. Select **Adobe Experience Platform** in the drop-down menu.
1. Select the dataset created in the previous step under **Event Dataset**.
1. Make sure that Offer Decisioning, Edge Segmentation, Personalization Destinations, and Adobe Journey Optimizer are all **unchecked**.
1. Click **Save**.

Everything is now configured to start sending data. Copy the **Datastream ID** on the right to your clipboard.

## Send data to the datastream

You can use [Postman](https://www.postman.com/downloads/) to test API calls before implementing them in your project.

1. Download, install, and open Postman.
1. Create a request with the following settings:
   * HTTP method: **`POST`**
   * URL: **`https://edge.adobedc.net/ee/v2/interact?datastreamId={DATASTREAM_ID}`**
   * Make sure that you replace `{DATASTREAM_ID}` with the Datastream ID copied from the Platform UI.
1. Select the **Body** tab and set the content type to **raw JSON**.
1. Paste the following into the body:

    ```json
    {
      "event": {
        "xdm": {
          "identityMap": {
            "email": [
              {
                "id": "user@example.com",
                "primary": true
              }
            ]
          },
          "eventType": "web.webpagedetails.pageViews",
          "web": {
            "webPageDetails": {
              "URL": "https://example.com/",
              "name": "home-demo-Home Page"
            }
          }
        }
      }
    }
    ```

1. Hit **Send**.

If successful, the API returns a `200 OK` response, indicating that data was sent to the datastream. After approximately 30 minutes, you can log in to **Adobe Experience Platform** > **Datasets** to view all ingested batches.
