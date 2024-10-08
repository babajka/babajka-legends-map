#!/usr/bin/env node
/*
  https://docs.google.com/spreadsheets/d/1wSHPtMNAA34D2B4GGKA_N3Hfh0Pkfj176OpUArsnrME
 */
require('dotenv').config();
const { writeFileSync } = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const twemoji = require('twemoji');

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const serviceAccountAuth = new JWT({
  // env var values here are copied from service account credentials generated by google
  // see "Authentication" section in docs for more info
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(
  '1wSHPtMNAA34D2B4GGKA_N3Hfh0Pkfj176OpUArsnrME',
  serviceAccountAuth
);

const outPath = 'src/data/legends.json';

async function fetchLegends() {
  // eslint-disable-next-line no-console
  console.log('Fetching legends...');

  try {
    await doc.loadInfo(); // loads document properties and worksheets
    const rows = await doc.sheetsByTitle.legends.getRows();

    const legends = rows.map(({ _rawData }) => {
      const [id, title, lat, lng, text, emoji, emojicode] = _rawData;
      return {
        id,
        title,
        coordinates: [+lng, +lat],
        text,
        emoji,
        emojiCode: emojicode || twemoji.convert.toCodePoint(emoji),
      };
    });

    writeFileSync(outPath, JSON.stringify(legends));

    // eslint-disable-next-line no-console
    console.log(`Legends fetched and saved to "${outPath}"`);
  } catch (error) {
    console.error(error);
    console.error(error.message);
  }
}

fetchLegends();
