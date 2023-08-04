const { Response_v2: Response } = require("./response.js");

const morgan = require("morgan");
const express = require("express");

const app = express();

app.set("json spaces", 2);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

/** Routes */
app.use("/", require("./routes/index"));
app.use("/v1/wibu", require("./routes/v1/wibu"));
app.use("/v2/anime-avatar", require("./routes/v2/anime-avatar"));
/** Routes */

app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.statusMessage = err.statusMessage || "Internal server error";

	res.status(err.statusCode).json(new Response(err.statusCode, err.statusMessage, {
		errorMessage: (err.name ? err.name + ": " : "") + err.message,
	}));
});

app.use(function (req, res, next) {
	res.status(404).send(new Response(404, "Uhh, what?", null));
});

const server = app.listen(process.env.PORT || 3000, () => {
	console.log(`Server started and listening on port ${server.address().port}`);
});