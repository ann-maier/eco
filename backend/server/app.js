const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const router = require('./router');
const corsMiddleware = require('./middlewares/cors');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(corsMiddleware);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
