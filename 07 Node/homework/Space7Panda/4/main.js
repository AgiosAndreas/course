const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}/echo`);
});

app.all('/echo', function (req, res) {

	let data = req.method === 'GET' ? req.query : req.body;

	res.send(JSON.stringify(data));
});
