const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const collages = require("./routes/collage/collages");

app.listen(port, () => console.log(`running server at ${port}`));
app.get("/", (req, res) => {
  res.json("home");
});
app.use("/collages", collages);
