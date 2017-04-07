const path = require('path');
const fs = require('fs');
const zlib = require('zlib');

const mimetypes = {
  js : 'application/javascript',
  html: 'text/html',
  css: 'text/css'
}

function main(args) {
  let urlpath = args.__ow_path;
  console.log(`path: ${urlpath}`);

  // Only serve /index.html or /assets/...
  if (!urlpath.startsWith('/assets'))
    urlpath = '/index.html';

  try {
    let filepath = path.join(__dirname, urlpath);
    console.log(`load ${filepath}`);
    let content = fs.readFileSync(filepath, 'utf8').toString();

    let ext = path.extname(urlpath);
    if (ext) {
      ext = ext.substring(1);
      console.log(`ext: ${ext}`);

      let type = mimetypes[ext];
      console.log(`mime: ${type}`);

      return {
        statusCode: 200,
        headers: {
          'Content-Type': type,
          'Cache-Control':  'max-age=86400'
        },
        body: content
      };
    }

    // TODO: better error
    return {
      statusCode: 404
    };
  } catch (e) {
    console.log(`error: ${e}`);
    return {
      statusCode: 404
    };
  }
}

exports.main = main;
