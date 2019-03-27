const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const textRouter = require("./routes/textRouter");
const fileRouter = require("./routes/fileRouter");
const contentRouter = require("./routes/contentRouter");
const labelRouter = require("./routes/labelRouter");
const labeledcontentRouter = require("./routes/labeledcontentRouter");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/labeler",
  //"mongodb://admin123:admin123@ds163044.mlab.com:63044/labeler",
  { useNewUrlParser: true },
  err => {
    {
      if (err) {
        console.log("Some problem with the connection " + err);
      } else {
        console.log("The Mongoose connection is ready");
      }
    }
  }
);

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/text", textRouter);
app.use("/files", fileRouter);
app.use("/content", contentRouter);
app.use("/label", labelRouter);
app.use("/labeledcontent", labeledcontentRouter);

app.listen(process.env.PORT || 8081);
