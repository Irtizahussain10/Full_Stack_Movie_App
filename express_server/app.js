const app = require('express')();
const cors = require('cors');
const movieControllers = require('./routes/index');

const port = process.env.port || 5000;

app.use(cors());

app.use('/', movieControllers);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});