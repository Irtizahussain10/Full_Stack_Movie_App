const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
let connect1 = require('./controllers/movies.controller');
let connect2 = require('./controllers/users.controller');
let connect3 = require('./controllers/comments.controller');
let movieRoutes = require('./routes/movie.routes');
let userRoutes = require('./routes/user.routes');
let commentRoutes = require('./routes/comment.routes');

let uri = 'mongodb+srv://m220-student:m220-password@mflix.zbubd.mongodb.net/admin';

dotenv.config();

const port = process.env.port;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/', movieRoutes, userRoutes, commentRoutes);

MongoClient.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then((client) => {
    connect1.connection(client);
    connect2.connection(client);
    connect3.connection(client);
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });

  //remove all console.logs
  //Incase connection error is due to server
