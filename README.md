# Adobe Experience Platform data collection API documentation

This is the source repository for the [Adobe Experience Platform data collection API documentation](https://developer.adobe.com/data-collection-apis/docs/). See the [Contributing](.github/CONTRIBUTING.md) page to learn how to make edits or improvements to this repository so they are reflected in the published documentation.

Most help content is located under `src/pages/endpoints/`.

For prod:
see https://developer.adobe.com/data-collection-apis/docs/

For stage:
see https://developer-stage.adobe.com/data-collection-apis/docs/

## Git config
git config core.ignorecase false

## How to set navigation
Create a directory hierarchy in `src/pages/config.md`

## Local development
This is not possible at the moment (we're still working on it)

## Launching a deploy
Go to Actions > Deployment > Run workflow
Select the branch you like to deploy from.
Select the environment to deploy to.  
Only the most recently committed files will be deployed by default.
You may specify a particular commit using its SHA to initiate the deployment from that point.
Alternatively, you may choose to deploy all files in a single operation.

## Check Links
Run the yarn checkLinks command to identify any broken local or external links.

## Where to ask for help

The slack channel #adobe-developer-website is our main point of contact for help. Feel free to join the channel and ask any questions.

## Troubleshoot

https://wiki.corp.adobe.com/display/AdobeCloudPlatform/The+Next+Generation+Developer+Website+-+DevDocs+and+DevBiz#DeveloperWebsite--63309052
