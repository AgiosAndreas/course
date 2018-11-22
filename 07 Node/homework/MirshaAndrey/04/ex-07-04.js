
"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const port = 8080;
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(port, () => {
	console.log('Server running on ' + port + ' port');
});


app.all("/echo", function (request, response) {
	let data = request.method === "POST" ? request.body : request.query;
	response.setHeader("Content-Type", "application/json");
	response.send(JSON.stringify(data, null, 2));
});
