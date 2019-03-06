const express = require("express");
const File = require("../models/file");
const fileRouter = express.Router();

fileRouter
  .route("/")
  .get((req, res) => {
    File.find({}, (err, files) => {
      res.json(files);
    });
  })
  .post((req, res) => {
    let file = new File(req.body);
    file.save();
    res.status(201).send(file);
  });

fileRouter.use("/:fileId", (req, res, next) => {
  File.findById(req.params.fileId, (err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.file = file;
      next();
    }
  });
});

fileRouter
  .route("/:fileId")
  .get((req, res) => {
    res.json(req.file);
  })
  .put((req, res) => {
    req.file.name = req.body.name;
    req.file.description = req.body.description;
    req.file.uploader = req.body.uploader;
    req.file.save();
    res.json(req.file);
  })
  .patch((req, res) => {
    if (req.body._id) {
      delete req.body._id;
    }
    for (let f in req.body) {
      req.file[f] = req.body[f];
    }
    req.file.save();
    res.json(req.file);
  })
  .delete((req, res) => {
    req.file.remove(err => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });

module.exports = fileRouter;
