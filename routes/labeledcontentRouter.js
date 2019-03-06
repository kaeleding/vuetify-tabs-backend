const express = require("express");
const File = require("../models/file");
const Content = require("../models/content");
const LabeledContent = require("../models/labeledcontent");
const labeledcontentRouter = express.Router();

labeledcontentRouter
  .route("/")
  .get((req, res) => {
    LabeledContent.find({}, (err, labeledcontents) => {
      res.json(labeledcontents);
    });
  })
  .post((req, res) => {
    let labeledcontent = new LabeledContent(req.body);
    labeledcontent.save();
    res.status(201).send(labeledcontent);
  });

labeledcontentRouter.use("/:labeledcontentId", (req, res, next) => {
  LabeledContent.findById(
    req.params.labeledcontentId,
    (err, labeledcontent) => {
      if (err) {
        res.status(500).send(err);
      } else {
        req.labeledcontent = labeledcontent;
        next();
      }
    }
  );
});

labeledcontentRouter
  .route("/:labeledcontentId")
  .get((req, res) => {
    res.json(req.labeledcontent);
  })
  .put((req, res) => {
    req.labeledcontent.labeler = req.body.labeler;
    req.labeledcontent.label = req.body.label;
    req.labeledcontent.type = req.body.type;
    req.labeledcontent.file_id = req.body.file_id;
    req.labeledcontent.content_id = req.body.content_id;
    req.labeledcontent.content_part = req.body.content_part;
    req.labeledcontent.content_index = req.body.content_index;
    req.labeledcontent.save();
    res.json(req.labeledcontent);
  })
  .patch((req, res) => {
    if (req.body._id) {
      delete req.body._id;
    }
    for (let f in req.body) {
      req.labeledcontent[f] = req.body[f];
    }
    req.labeledcontent.save();
    res.json(req.labeledcontent);
  })
  .delete((req, res) => {
    req.labeledcontent.remove(err => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });

module.exports = labeledcontentRouter;
