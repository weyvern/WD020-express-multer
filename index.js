import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import imageUploader from './middleware/imageUploader.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, 'uploads');

app.set('view engine', 'ejs');
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  const data = {
    title: 'Welcome to the image uploading app',
    fruits: ['oranges', 'bananas', 'strawberries']
  };
  res.render('index', data);
});

app.post('/upload-profile-pic', imageUploader.single('profile_pic'), (req, res) => {
  console.log(req.file);
  res.send(
    `</h2><img src=http://localhost:5000/${req.file.filename} alt=”something” width='300px'/>`
  );
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
