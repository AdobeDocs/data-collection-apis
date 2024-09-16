---
title: Getting started using the Data collection APIs
description: Learn how you can create an environment ready to send tracking data to Adobe via API.
---
# Getting started using the Data collection APIs

The Adobe Experience Platform data collection APIs provide an easy way to send data to the Adobe Experience Platform Edge Network. The Edge Network parses each event and passes it along to each connected app or service, such as Adobe Experience Platform or Adobe Analytics.

Adobe recommends starting out with a basic `interact` call to begin sending data to a datastream. The following steps allow you to successfully collect data in a new datastream.

## Create a schema

A _schema_ organizes your data so it is stored in a consistent format.

1. Log in to [experience.adobe.com](https://experience.adobe.com)
1. Select the 9-grid menu in the top right, then select **Experience Platform**.
1. In the left navigation menu, select **Schemas** within the Data Management section.
1. Select **Create schema** in the top right.
1. Select **Experience Event** as the base class for this schema. Click **Next**.
1. Give the schema a name, then click **Finish**.

## Create a dataset

A _dataset_ is a location in Adobe Experience Platform where your data is stored.

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
1. Select the dataset created in the previous step under **Event Dataset**. Click **Save**.

Everything is now configured to start sending data. Copy the **Datastream ID** on the right to your clipboard.

## Send data to the datastream

You can use [Postman](https://www.postman.com/downloads/) to test API calls before implementing them in your project.

1. Download, install, and open Postman.
1. Create a request with the following settings:
   * HTTP method: **`POST`**
   * URL: **`https://edge.adobedc.net/ee/v2/interact?datastreamId={DATASTREAM_ID}`**
   * Make sure that you replace `{DATASTREAM_ID}` with the Datastream ID copied from the Platform UI.
1. Select the **Pre-request Script** tab and paste the following code. This snippet automatically grabs the current time so that you do not need to worry about the `timestamp` property.

    ```js
    pm.variables.set("currentTimestamp", new Date().toISOString());
    ```

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
        },
        "timestamp": "{{currentTimestamp}}"
        }
      }
    }
    ```

1. Hit **Send**.

In the response body, you should get a `200 OK`, indicating that data was successfully sent to the datastream. After approximately 30 minutes, you can log in to **Adobe Experience Platform** > **Datasets** to view all ingested and failed batches.
