const fs = require("fs");
const path = require("path");

const express = require("express");
const router = express.Router();

const { Response, Image, List } = require("../../utils");
const LIST_PATH = path.resolve(process.cwd(), "assets", "list.json");

let data;
(async () => {
	const list = new List("https://raw.githubusercontent.com/Kaysil/tad-assets/main/anime-avatar/output.json", LIST_PATH);

	if (!fs.existsSync(LIST_PATH)) {
		data = await list.downloadFile();
	} else {
		data = await list.readLocalFile();
	}
})();


router.get("/create", async (req, res) => {
	let characterId = req.query.id_nhanvat || null;
	let title = req.query.chu_nen || null;
	let signature = req.query.chu_ky || null;
	let color = req.query.mau_nen || null;

	if (!(characterId && title && signature)) return res.status(400).send(new Response(400, "missing query"));

	let character = data.find((el) => el._id == characterId);
	if (!character) return res.status(400).send(new Response(400, "character not found"));

	let imageUrl = character?.image_url;
	let primaryColor = character?.primary_color;

	try {
		let buf = await Image(encodeURI(imageUrl), title, signature, color ?? primaryColor);
		res.set("Content-Type", "image/png");
		res.status(200).send(buf);
	} catch (err) {
		res.status(400).send(new Response(400, `error while creating image  ${err.name}`));
		console.error(`error while creating image`, err);
	}
});

router.get("/list", (req, res) => {
	return res.status(200).send(new Response(200, "success", data));
});

module.exports = router;