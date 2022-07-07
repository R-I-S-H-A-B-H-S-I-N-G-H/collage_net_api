const express = require("express");
const router = express.Router();

var csv = require("csv");
const fs = require("fs");
let collages = [];
loadData();
function loadData() {
  if (collages.length != 0) return;
  fs.readFile("db/database.csv", (err, data) => {
    if (err) {
      collages = [];
      console.error(err);
      return;
    }
    console.log("[cAPi] : File read !");

    csv.parse(data, function (err, data) {
      if (err) {
        collages = [];
        console.log(err);
        return;
      }
      collages = data;
      console.log("[cAPi] : CSV Loaded !");
    });
  });
}
// console.log(__dirname + "../");
function getCollagelist(size = 10) {
  if (collages.length == 0) {
    loadData();
    return null;
  }
  const res = [];
  for (let i = 0; i < size; i++) res.push(collages[i]);
  return res;
}
router.get("/", (req, res) => {
  res.json("collage");
});

router.get("/list", (req, res) => {
  if (!req.body.size) return res.json("PLEASE SPECIFY THE SIZE");
  const result = getCollagelist(req.body.size);
  if (result == null) return res.status(300).json("TRY AGAIN");
  res.status(200).json(result);
});
module.exports = router;
