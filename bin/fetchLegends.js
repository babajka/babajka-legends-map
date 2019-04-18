#!/usr/bin/env node
/*
  https://docs.google.com/spreadsheets/d/1wSHPtMNAA34D2B4GGKA_N3Hfh0Pkfj176OpUArsnrME
 */
const { writeFileSync } = require('fs');
const keyBy = require('lodash/keyBy');
const GoogleSpreadsheet = require('google-spreadsheet');
const twemoji = require('twemoji');

const doc = new GoogleSpreadsheet('1wSHPtMNAA34D2B4GGKA_N3Hfh0Pkfj176OpUArsnrME');

doc.getInfo((err, info) => {
  const legendsSheet = keyBy(info.worksheets, 'title').legends;

  new Promise(resolve => {
    legendsSheet.getRows({}, (error, rows) => {
      resolve(
        rows.map(({ id, title, lat, lng, text, emoji, emojicode }) => ({
          id,
          title,
          coordinates: [+lng, +lat],
          text,
          emoji,
          emojiCode: emojicode || twemoji.convert.toCodePoint(emoji),
        }))
      );
    });
  }).then(legends => {
    writeFileSync('src/legends.json', JSON.stringify(legends));
  });
});
