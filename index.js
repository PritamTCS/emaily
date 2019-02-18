const express = require("express");
const mongoose = require("mongoose");
require("./models/User");
require("./services/passport");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
