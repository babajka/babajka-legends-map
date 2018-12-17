#!/usr/bin/env node

const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const request = require('request');
const legends = require('../src/legends.json');

const url = 'https://emojipedia.org/apple';
const codes = legends.map(({ emojiCode }) => emojiCode).filter(Boolean);
const EMOJI_CODE_REGEXP = /_(?!emoji-modifier)(\S+)\.png/;

const saveImage = ({ url, code }) =>
  new Promise((resolve, reject) =>
    request.head(url, (err, res, body) =>
      request(url)
        .pipe(fs.createWriteStream(`public/images/${code}.png`))
        .on('close', resolve)
    )
  );

rp(url)
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
        const url = attribs['data-srcset'].slice(0, -3);
        const [_, code] = attribs['data-srcset'].match(EMOJI_CODE_REGEXP);
        return { url, code };
      });
    return Promise.all(data.map(saveImage));
  })
  .then(res => console.log(`> successfully scraped ${res.length}/${codes.length} images`))
  .catch(console.error);
