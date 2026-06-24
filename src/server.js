const express = require("express");


const app = express();
// 🔥 FIX 1: Add this line to parse JSON bodies
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("API Running");
});


app.listen(3000, () => {
  console.log("Server running");
});