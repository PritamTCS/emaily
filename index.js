const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ hi: "there!, how are you?" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
