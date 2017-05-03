/*
 * Copyright 2017 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const app = require('./app');
const request = require('supertest');

function main(args) {
  return new Promise((resolve, reject) => {

    app.locals.baseurl = 'https://openwhisk.ng.bluemix.net/api/v1/web/villard@us.ibm.com_dev/default/express/';

    let req = request(app)[args.__ow_method](args.__ow_path);
    if (args.__ow_headers)
      req.set(args.__ow_headers);
    if (args.__ow_query)
      req.set(args.__ow_query);

    if (args.__ow_method === 'post' || args.__ow_method === 'put') {
      req = req.send(args.__ow_body || '');
    }

    req.end((err, res) => {
      if (err) reject(err);

      return resolve({
        statusCode: res.status,
        headers: res.headers,
        body: res.text
      });
    });
  });
}

exports.main = main;
