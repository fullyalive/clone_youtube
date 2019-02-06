const express = require("express");
const app = express();

const PORT = 4000;

function handleListening() {
  console.log(`Listening on : http://localhost:${PORT}`);
}

function handleHome(req, res) {
  console.log(req);
  res.send('hello from home');
}

function handleProfile(req, res) {
  console.log(req);
  res.send('user profile');
}

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
