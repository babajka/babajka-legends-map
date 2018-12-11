#!/usr/bin/env node
const { writeFileSync } = require('fs');

const keyBy = require('lodash/keyBy');
const pick = require('lodash/pick');

const GoogleSpreadsheet = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1wSHPtMNAA34D2B4GGKA_N3Hfh0Pkfj176OpUArsnrME');

doc.getInfo((err, info) => {
  legendsSheet = keyBy(info.worksheets, 'title')['legends'];

  legends = [];

  new Promise(resolve => {
    legendsSheet.getRows({}, (error, rows) => {
      rows.forEach(row => {
        legends.push(pick(row, ['title', 'lat', 'lng', 'text']))
      })
      resolve();
    })
  }).then(() => {
    writeFileSync('data/legends.json', JSON.stringify(legends));
  })
});
