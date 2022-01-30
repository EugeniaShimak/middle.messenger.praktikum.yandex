// @ts-ignore
import {JSDOM} from 'jsdom';

const dom = new JSDOM(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
    </html>`,
    {
        url: 'http://localhost:8080'
    }
);

global.window = dom.window;
global.document = dom.window.document;
global.localStorage = dom.window.localStorage;
export default global.DOMParser = dom.window.DOMParser;
