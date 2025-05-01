const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

// app.use(express.json());

app.use(express.static(path.join(__dirname, "src")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use('/img', express.static(path.join(__dirname, 'src', 'Components', 'img')));
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "src", "index.html");

  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/products", (req, res, next) => {
  res.sendFile(__dirname + "/data.json");
});

app.post("/add-product", (req, res, next) => {});

app.listen(port, function () {
  console.log(`server Run in ${port}`);
});
