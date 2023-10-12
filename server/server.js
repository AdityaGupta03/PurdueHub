const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(bodyParser.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server has started on port ${port}\n`);
});