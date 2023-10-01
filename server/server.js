const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`[INFO] Server has started on port ${port}`);
});