const express = require("express");
const validUrl = require("valid-url");
const { customRandom, urlAlphabet, random } = require("nanoid");

const Url = require("../models/Urlmodel");
const router = new express.Router();

const baseUrl = "http://localhost:3000";

router.get("/", (req, res) => {
  res.send("connected");
});

router.post("/url", async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json("invalid link");
  }
  //check if the url exists 
  const itExists = await Url.findOne({ longUrl: req.body.longUrl });

  //generate short code
  const n_id = customRandom(urlAlphabet, 6, random);
  const nano_id = n_id();

  const shortUrl = baseUrl + "/" + nano_id;

  const url = new Url({
    longUrl,
    shortUrl,
    nano_id,
    date: new Date(),
  });

  if (itExists) {
    return res.status(201).send(itExists.shortUrl);
  }

  try {
    await url.save();
    res.status(200).send(url.shortUrl);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:nano_id", async (req, res) => {
  //check if the given url is valid
  const givenNano_id = req.params.nano_id;

  //checm if link exists in the db
  const url = await Url.findOne({ nano_id: givenNano_id });

  if (!url) {
    return res.status(404).send("Not found");
  }

  try {
    res.redirect(url.longUrl);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
