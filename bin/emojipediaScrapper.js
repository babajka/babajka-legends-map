#!/usr/bin/env node

/*
  eslint-disable import/no-extraneous-dependencies
 */

const fs = require('fs');
const request = require('request');
const rp = require('request-promise');
const $ = require('cheerio');
const legends = require('../src/data/legends.json');

const emojisUrl = 'https://emojipedia.org/apple';
const codes = legends.map(({ emojiCode }) => emojiCode).filter(Boolean);
const nameByCode = legends.reduce((acc, { emojiCode, id }) => {
  acc[emojiCode] = id;
  return acc;
}, {});
const EMOJI_CODE_REGEXP = /_(?!emoji-modifier)(\S+)\.png/;

const saveImage = ({ url, code }) =>
  new Promise(resolve =>
    request.head(url, () =>
      request(url)
        .pipe(fs.createWriteStream(`temp/${nameByCode[code]}.png`))
        .on('close', resolve)
    )
  );

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
        const url = attribs['data-srcset'].slice(0, -3);
        const [_, code] = attribs['data-srcset'].match(EMOJI_CODE_REGEXP);
        return { url, code };
      });
    return Promise.all(data.map(saveImage));
  })
  // eslint-disable-next-line no-console
  .then(res => console.log(`> successfully scraped ${res.length}/${codes.length} images`))
  .catch(console.error);
