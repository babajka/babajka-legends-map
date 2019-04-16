#!/usr/bin/env node

/*
  eslint-disable import/no-extraneous-dependencies
 */

// 112
// 30

const request = require('request');
const rp = require('request-promise');
const $ = require('cheerio');
const sharp = require('sharp');

const legends = require('../src/legends.json');

const emojisUrl = 'https://emojipedia.org/apple';
const codes = legends.map(({ emojiCode }) => emojiCode).filter(Boolean);
const EMOJI_CODE_REGEXP = /_(?!emoji-modifier)(\S+)\.png/;

const saveImage = (url, code) =>
  new Promise(resolve =>
    // request.head(url, () =>
    //   request(url)
    //     .pipe(fs.createWriteStream(`public/images/${code}-${size}.png`))
    //     .on('close', resolve)
    // )
    request.get({ url, encoding: 'binary' }, (err, res) =>
      resolve(
        sharp(res.body)
          .resize(30)
          .png({ compressionLevel: 9 })
          .toFile(`public/images/${code}-small.png`)
      )
    )
  );

// eslint-disable-next-line
const saveImages = ({ smallUrl, largeUrl, code }) =>
  Promise.all([
    // sharp(largeUrl)
    //   .resize(30)
    //   .png({ compressionLevel: 9 })
    //   .toFile(`public/images/${code}-small.png`),
    saveImage(largeUrl, code, '144'),
  ]);

rp(emojisUrl)
  .then(html => {
    const images = Object.values($('a > img', html));
    const data = images
      .filter(({ attribs }) => attribs && attribs['data-src'])
      .filter(({ attribs }) => {
        const [_, code] = attribs['data-src'].match(EMOJI_CODE_REGEXP);
        return codes.includes(code);
      })
      .map(({ attribs }) => {
        // cut trailing '_2x' string
        const smallUrl = attribs['data-src'];
        const largeUrl = attribs['data-srcset'].slice(0, -3);
        const [_, code] = attribs['data-srcset'].match(EMOJI_CODE_REGEXP);
        return { smallUrl, largeUrl, code };
      });
    return Promise.all(data.map(saveImages));
  })
  // eslint-disable-next-line no-console
  .then(res => console.log(`> successfully scraped ${res.length}/${codes.length} images`))
  .catch(console.error);
