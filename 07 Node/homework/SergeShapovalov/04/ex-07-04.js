"use strict";

let express = require("express");

let app = express();

app.all("/echo", function (request, response) {

	if (request.method == "POST") {

		request.query.body = "";

		request.on("data", function (data) {
			request.query.body += data;
		});

		request.on("end", function () {
			response.send(JSON.stringify(request.query));
		});

	} else {
		response.send(JSON.stringify(request.query));
	}
});

app.listen(8080);
