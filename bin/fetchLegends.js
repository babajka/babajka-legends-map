#!/usr/bin/env node
/*
    https://docs.google.com/spreadsheets/d/1wSHPtMNAA34D2B4GGKA_N3Hfh0Pkfj176OpUArsnrME
 */
const { writeFileSync } = require('fs');
const keyBy = require('lodash/keyBy');
const GoogleSpreadsheet = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1wSHPtMNAA34D2B4GGKA_N3Hfh0Pkfj176OpUArsnrME');

doc.getInfo((err, info) => {
  const legendsSheet = keyBy(info.worksheets, 'title')['legends'];

  new Promise(resolve => {
    legendsSheet.getRows({}, (error, rows) => {
      resolve(
        rows.map(({ title, lat, lng, text, emoji }, id) => ({
          id,
          title,
          coordinates: [+lng, +lat],
          text,
          emoji,
        }))
      );
    });
  }).then(legends => {
    writeFileSync('src/legends.json', JSON.stringify(legends));
  });
});
