const { Response } = require("./utils");

const morgan = require("morgan");
const express = require("express");

const app = express();

app.set("json spaces", 2);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.static("public"))

/** routes */
app.use("/v1/wibu", require("./routes/v1/wibu"));
/** routes */

/** error handling */
app.use((err, req, res, next) => {
	if (!err) return next();

	console.error(err);
	return res.status(500).send(new Response(500, err.name));
});
/** error handling */

/** 404 handling */
app.use(function (req, res, next) {
	res.status(404).send(new Response(404, "this endpoint is not exists"));
});
/** 404 handling */

const server = app.listen(process.env.PORT || 3000, () => {
	console.log(`Server started and listening on port ${server.address().port}`);
});