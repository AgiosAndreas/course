const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.listen(8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/echo', function (req, res) {

	let data = req.method === 'GET' ? req.query : req.body;

	res.send(JSON.stringify(data));
});
