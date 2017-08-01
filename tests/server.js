/**
 * Dev server for receiving file uploads from Storybook.
 *
 * Start with the command 'npm run test:server'.
 */
import express from 'express';
import busboy from 'connect-busboy';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';

const PORT       = 3030;
const PUBLIC_DIR = 'uploads';
const UPLOAD_DIR = path.resolve(__dirname, 'uploads');

const app = express();
app.use(cors());
app.use(busboy());
app.use(express.static(__dirname));

app.route('/upload').post((req, res) => {
  let fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', (fieldname, file, filename) => {
    console.log(`Received file: ${filename}`);

    fs.ensureDir(UPLOAD_DIR);
    fstream = fs.createWriteStream(path.resolve(UPLOAD_DIR, filename));
    file.pipe(fstream);
    fstream.on('close', () => {
      const data = JSON.stringify({
        type: 'image',
        text: filename,
        url:  `http://localhost:${PORT}/${PUBLIC_DIR}/${filename}`
      });
      console.log(`Responding: ${data}`);
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });
});

const server = app.listen(PORT, () => {
  console.log('Upload server listening on port %d', server.address().port);
});
