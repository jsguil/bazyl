const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const expressGa = require('express-ga-middleware');
const app = express();

app.use(expressGa('UA-119333841-1'));

app.use(express.static(path.join(__dirname, 'build_webpack')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  req.ga.event({
      category: 'cat',
      action: 'act',
      label: 'Index',
      value: 3.5
  }, (err) => {
    if (err) throw err
  })
  res.sendFile(path.join(__dirname,'build_webpack', 'index.html'));
});

app.listen(process.env.PORT || 9000);

console.log('Eth-tree running on port 9000')
