const express = require("express");
//const File = require("../models/file");
const Content = require("../models/content");
const contentRouter = express.Router();

contentRouter
  .route("/")
  .get((req, res) => {
    Content.find({}, (err, contents) => {
      res.json(contents);
    });
  })
  .post((req, res) => {
    let content = new Content(req.body);
    content.save();
    res.status(201).send(content);
  });

contentRouter.use("/:contentId", (req, res, next) => {
  Content.findById(req.params.contentId, (err, content) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.content = content;
      next();
    }
  });
});

contentRouter
  .route("/:contentId")
  .get((req, res) => {
    res.json(req.content);
  })
  .put((req, res) => {
    req.content.content = req.body.content;
    //let file = new File() HOW TO GET CURRENT FILE?
    req.content.file_id = req.body.file_id;
    req.content.save();
    res.json(req.content);
  })
  .patch((req, res) => {
    if (req.body._id) {
      delete req.body._id;
    }
    for (let f in req.body) {
      req.content[f] = req.body[f];
    }
    req.content.save();
    res.json(req.content);
  })
  .delete((req, res) => {
    req.content.remove(err => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });

module.exports = contentRouter;
