"use strict";

const express = require("express");
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.all("/echo", function (request, response) {

	let data = request.method === "POST" ? request.body : request.query;

	response.send(JSON.stringify(data));
});

app.listen(8080);
