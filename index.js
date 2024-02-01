const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("base");
});

app.get("/new/connection/relay", (req, res) => {
  res.sendFile(__dirname + "/public/html/relay.html");
});

app.get("/new/bridge/relay", (req, res) => {
  // bridge relay
});

app.get("/error/browser", (req, res) => {
  res.send(
    "Your browser does not support features required to use this function. "
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
