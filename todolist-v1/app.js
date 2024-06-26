const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');

app.get("/", function(req, res){
  let day = date.getDate();
  res.render('list', {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(8000, function(){
  console.log("server started on port 8000")
});
