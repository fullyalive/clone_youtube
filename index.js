import express from "express";

const app = express();
const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on : http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("hello from home");

const handleProfile = (req, res) => {
  res.send("user profile");
};

// express의 모든 route와 onnection을 다루는 것은 request, response, next를 가진다
const betweenHome = (req, res, next) => {
  console.log("Between");
  next();
};

app.use(betweenHome);

app.get("/", handleHome);

app.get("/profile", handleProfile);


app.listen(PORT, handleListening);
