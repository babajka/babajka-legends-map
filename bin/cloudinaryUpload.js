const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const config = require('./secret.json');
const urlsMap = require('../src/data/emojis.json');

const { apiKey, apiSecret, cloudName } = config.services.cloudinary;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const tempDir = fs.readdirSync('temp').filter(fileName => !urlsMap[fileName.slice(0, -4)]);

Promise.all(
  tempDir.map(fileName => {
    const file = fs.createReadStream(`temp/${fileName}`);
    return new Promise((resolve, reject) =>
      file.pipe(
        cloudinary.uploader.upload_stream({ folder: 'map.wir.by' }, (error, { public_id: id }) => {
          if (error) {
            reject(error);
          }
          resolve({ name: fileName.slice(0, -4), id });
        })
      )
    );
  })
)
  .then(urls =>
    urls.reduce((acc, { name, id }) => {
      acc[name] = id;
      return acc;
    }, {})
  )
  .then(emojis => {
    fs.writeFileSync('src/data/emojis.json', JSON.stringify({ ...urlsMap, ...emojis }));
    // eslint-disable-next-line no-console
    console.log(`> successfully upload ${Object.keys(emojis).length}/${tempDir.length} images`);
    // eslint-disable-next-line no-console
    console.log(`> skip ${Object.keys(urlsMap).length} images`);
  });
