const express = require("express");
const Text = require("../models/text");
const textRouter = express.Router();

textRouter
    .route("/")
    .get((req, res) => {
        Text.find({}, (err, texts) => {
            res.json(texts);
        });
    })
    .post((req, res) => {
        let text = new Text(req.body);
        text.save();
        res.status(201).send(text);
    });

textRouter.use("/:textId", (req, res, next) => {
    Text.findById(req.params.textId, (err, text) => {
        if (err) {
            res.status(500).send(err);
        } else {
            req.text = text;
            next();
        }
    });
});

textRouter
    .route("/:textId")
    .get((req, res) => {
        res.json(req.text);
    })
    .put((req, res) => {
        req.text.text = req.body.text;
        req.text.save();
        res.json(req.text);
    })

module.exports = textRouter;
