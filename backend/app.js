const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// TODO with Prisma, find a way to query relations, for an example => "I want all the posts of a user" --
// TODO authentication and account management funnel (API) --
// create an account --
// login --
// logout --
// update account (email, password, etc) --
// delete account --
// all associated entities (posts, likes, comments, etc.) are deleted --
// TODO bonus: authentication funnel on the frontend side with React

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/profil", userRoutes);

module.exports = app;
