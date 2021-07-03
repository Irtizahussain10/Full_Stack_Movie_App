const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
let connect1 = require('./controllers/movies.controller');
let connect2 = require('./controllers/users.controller');
let movieRoutes = require('./routes/movieQueryRoutes');
let userRoutes = require('./routes/userRoutes');

let uri = 'mongodb+srv://m220-student:m220-password@mflix.zbubd.mongodb.net/admin';

dotenv.config();

const port = process.env.port;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/', movieRoutes, userRoutes);

MongoClient.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then((client) => {
    connect1.connection(client);
    connect2.connection(client);
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });