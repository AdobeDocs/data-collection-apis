/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || '/data-collection-apis/docs/',
  siteMetadata: {
    pages: [
      {
        title: 'Data collection APIs',
        path: '/'
      },
      {
        title: 'Getting started',
        path: '/getting-started/'
      },
      {
        title: 'Endpoint guides',
        path: '/endpoints/'
      },
      {
        title: 'API references',
        menu: [
          {
            title: 'Edge Network API',
            path: '/api/'
          },
          {
            title: 'Media Edge API',
            path: '/api/media-edge/'
          }
        ]
      },
      {
        title: 'Support',
        path: '/support/'
      }
    ],
    subPages: [
      {
        title: 'Getting Started',
        path: '/getting-started/',
        pages: [
          {
            title: 'Authentication',
            path: '/getting-started/authentication/'
          },
          {
            title: 'Guardrails',
            path: '/getting-started/guardrails/'
          },
          {
            title: 'Location hints',
            path: '/getting-started/location-hints/'
          },
          {
            title: 'Personalization',
            path: '/getting-started/personalization/'
          },
          {
            title: 'Troubleshooting',
            path: '/getting-started/troubleshooting/'
          }
        ]
      },
      {
        title: 'Endpoint guides',
        path: '/endpoints/',
        pages: [
          {
            title: 'Collect',
            path: '/endpoints/collect/'
            /* In case we need to add more pages
            pages: [
              {
                title: 'Another page',
                path: '/endpoints/collect/anotherpage/'
              }
            ]*/
          },
          {
            title: 'Interact',
            path: '/endpoints/interact/'
          },
          {
            title: 'Media Edge',
            path: '/endpoints/media/',
            pages: [
              {
                title: 'Ads',
                path: '/endpoints/media/ads/'
              },
              {
                title: 'Bitrate change',
                path: '/endpoints/media/bitratechange/'
              },
              {
                title: 'Buffer start',
                path: '/endpoints/media/bufferstart/'
              },
              {
                title: 'Chapters',
                path: '/endpoints/media/chapters/'
              },
              {
                title: 'Error',
                path: '/endpoints/media/error/'
              },
              {
                title: 'Pause start',
                path: '/endpoints/media/pausestart/'
              },
              {
                title: 'Ping',
                path: '/endpoints/media/ping/'
              },
              {
                title: 'Play',
                path: '/endpoints/media/ping/'
              },
              {
                title: 'Sessions',
                path: '/endpoints/media/sessions/'
              },
              {
                title: 'States update',
                path: '/endpoints/media/statesupdate'
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
