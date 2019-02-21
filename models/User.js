const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
  googleId: String,
  name: String,
  credits: {
    type: Number,
    default: 0
  }
});

mongoose.model("users", userschema);
