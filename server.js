const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`The server is up and running on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
