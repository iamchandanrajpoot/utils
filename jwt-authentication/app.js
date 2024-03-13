import express from "express";
import jwt from "jsonwebtoken";
import cors from 'cors'
import userAuthentication from "./middlewares/userAuthorizaton.js";

const app = express();
app.use(cors())
app.use(express.json());

const secret_key = "fks84tn8vnvvtn3n8";
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username == username && user.password == password
  );

  if (!user) {
    console.log("invalid credentials");
    return;
  }
  const token = jwt.sign(
    { id: user.id, username: user.username },
    secret_key,
    {  algorithm: "HS256" }
  );

  res.json({token})
});

app.get('/protected', userAuthentication, (req, res) => {
    res.json({ message: 'Protected route accessed successfully', user: req.user });
  });
  

app.listen(4000);
