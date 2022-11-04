/*!
MIT License

Copyright (c) 2020 Wilson Lin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/wilsonzlin/minify-html/blob/master/nodejs/postinstall.js
*/

const fs = require('fs');
const https = require('https');
const path = require('path');
const pkg = require('./package.json');
const cp = require('child_process');

const MAX_DOWNLOAD_ATTEMPTS = 4;

const binaryName = [process.platform, process.arch].join('__');
const binaryPath = path.join(__dirname, 'index.node');

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class StatusError extends Error {
  constructor(status) {
    super(`Bad status of ${status}`);
    this.status = status;
  }
}

const fetch = url =>
  new Promise((resolve, reject) => {
    const stream = https.get(url, resp => {
      if (!resp.statusCode || resp.statusCode < 200 || resp.statusCode > 299) {
        return reject(new StatusError(resp.statusCode));
      }
      const parts = [];
      resp.on('data', chunk => parts.push(chunk));
      resp.on('end', () => resolve(Buffer.concat(parts)));
    });
    stream.on('error', reject);
  });

const downloadNativeBinary = async() => {
  for (let attempt = 0; ; attempt++) {
    let binary;
    try {
      binary = await fetch(
        `https://archive.zsq.im/hexo-word-counter/bin/nodejs/${pkg.version}/${binaryName}.node`
      );
    } catch (e) {
      if (
        e instanceof StatusError
        && e.status !== 404
        && attempt < MAX_DOWNLOAD_ATTEMPTS
      ) {
        await wait((Math.random() * 2500) + 500);
        continue;
      }
      throw e;
    }

    fs.writeFileSync(binaryPath, binary);
    break;
  }
};

if (
  !fs.existsSync(path.join(__dirname, '.no-postinstall'))
  && !fs.existsSync(binaryPath)
) {
  downloadNativeBinary().then(
    () => console.log(`Downloaded ${pkg.name}`),
    err => {
      console.error(
        `Failed to download ${pkg.name}, will build from source: ${err}`
      );
      const out = cp.spawnSync('npm', ['run', 'build-release'], {
        cwd: __dirname,
        stdio: ['ignore', 'inherit', 'inherit']
      });
      process.exitCode = out.exitCode;
      if (out.error) {
        throw out.error;
      }
    }
  );
}
