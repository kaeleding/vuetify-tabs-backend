const express = require("express");
const File = require("../models/file");
const Label = require("../models/label");
const labelRouter = express.Router();

labelRouter
  .route("/")
  .get((req, res) => {
    Label.find({}, (err, labels) => {
      res.json(labels);
    });
  })
  .post((req, res) => {
    let label = new Label(req.body);
    label.save();
    res.status(201).send(label);
  });

labelRouter.use("/:labelId", (req, res, next) => {
  Label.findById(req.params.labelId, (err, label) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.label = label;
      next();
    }
  });
});

labelRouter
  .route("/:labelId")
  .get((req, res) => {
    res.json(req.label);
  })
  .put((req, res) => {
    req.label.label = req.body.label;
    req.label.type = req.body.type;
    req.label.file_id = req.body.file_id;
    req.label.save();
    res.json(req.label);
  })
  .patch((req, res) => {
    if (req.body._id) {
      delete req.body._id;
    }
    for (let f in req.body) {
      req.label[f] = req.body[f];
    }
    req.label.save();
    res.json(req.label);
  })
  .delete((req, res) => {
    req.label.remove(err => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });

module.exports = labelRouter;
