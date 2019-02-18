const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
  googleId: String,
  name: String
});

mongoose.model("users", userschema);
