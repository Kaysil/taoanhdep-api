const express = require("express");
const router = express.Router();

const { Response_v2: Response } = require("../../response.js");
const animeList = require("../../assets/anime-list.js");
const createAnimeAvatar = require("../../create-image.js");

router.post("/create", async (req, res) => {
     let characterId = String(req.body.character_id) || null;
     let backgroundText = req.body.bg_text || null;
     let signatureText = req.body.signature_text || null;
     let backgroundColor = req.body.bg_color || null;

     console.log(characterId, backgroundText, signatureText, backgroundColor)

     if (characterId && backgroundText && signatureText) {
          if (!isNaN(characterId) && !animeList[characterId]) return res.status(400).send(new Response(400, "Invalid character ID"));

          var imgUrl = animeList[characterId].imgAnime.replace(/s120/g, "s0");
          var imgColor = animeList[characterId].colorBg;

          if (!backgroundColor) backgroundColor = imgColor || "black";

          let imageBuffer;

          try {
               imageBuffer = await createAnimeAvatar(encodeURI(imgUrl), backgroundText, signatureText, backgroundColor);
          } catch (err) {
               res.status(500).send(new Response());
               console.error(`Error when creating image`, err);
               return;
          }

          res.set("Content-Type", "image/png");
          res.status(200).send(imageBuffer);
     } else {
          res.status(400).send(new Response(400, "Missing parameters"));
     }
});

router.get("/list", (req, res) => {
     let mappedAnimeList;

     try {
          mappedAnimeList = animeList.map((el, i) => {
               return {
                    characterId: i,
                    characterName: el.imgAnime
                         .substring(el.imgAnime.lastIndexOf("/") + 1, el.imgAnime.length)
                         .replace(/-/g, " ")
                         .replace(/.png/g, ""),
                    characterImageUrl: el.imgAnime.replace(/s120/g, "s0"),
                    characterDefaultBgColor: el.colorBg,
                    _source: el.source ? el.source : "taoanhdep.com"
               }
          });
     } catch {
          res.status(500).send(new Response());
          console.error(`Error when mapping anime list`, err);
     }
     res.status(200).send(new Response(200, "Successful", mappedAnimeList));
});

module.exports = router;