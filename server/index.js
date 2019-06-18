/* eslint-disable import/no-extraneous-dependencies */
require('newrelic');
const express = require('express');
// const morgan = require('morgan');
// const cors = require('cors');
// const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');

//Creating connection to Proxy
const app = express();
const proxy = httpProxy.createProxyServer();
const port = process.env.PORT || 3009;

// app.listen(port, () => console.log(`listening on port ${port}`));

app.use('/:id', express.static(`${__dirname}/../public`));
app.use(express.static(`${__dirname}/../public`));
// app.use(morgan('dev'));
// app.use(cors());

//To reviews service (Heather)
app.all('/reviews/:id', (req, res) => {
    proxy.web(req, res, {target: 'http:localhost:3008' });
});




app.listen(port, () => console.log(`Proxy server listening on port ${port}`));