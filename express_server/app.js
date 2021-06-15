const app = require('express')();
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
let connect = require('./controllers/movies.controller');
const movieControllers = require('./routes/movieQueryRoutes');

let uri = 'mongodb+srv://m220-student:m220-password@mflix.zbubd.mongodb.net/admin';

dotenv.config();

const port = process.env.port;

app.use(cors());

MongoClient.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then(client => connect.connection(client))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

app.use('/', movieControllers);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});