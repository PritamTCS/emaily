const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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
const billingRoutes = require("./routes/billingRoutes");
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

authRoutes(app);
billingRoutes(app);

if (process.env.NODE_ENV === "production") {
  // express will serve up prod assets
  // like main.js or main.css file
  app.use(express.static("client/build"));

  // express will serve up index.html file
  // if it does not recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
