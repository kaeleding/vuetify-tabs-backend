const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fileRouter = require("./routes/fileRouter");
const categoricalRouter = require("./routes/categoricalRouter");
const contextualRouter = require("./routes/contextualRouter");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/text-highlighter",
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
app.use("/files", fileRouter);
app.use("/categorical", categoricalRouter);
app.use("/contextual", contextualRouter);

app.listen(process.env.PORT || 8081);
