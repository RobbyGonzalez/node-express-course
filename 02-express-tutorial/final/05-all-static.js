const express = require("express");
const path = require("path");
const app = express();

//.use needs to come before every other function/call
//setup static and middleware
//a static server file is something the server does not have to change
//so images should go in the public folder
//express will set up the paths, MIME types and status codes form there
app.use(express.static("./public"));

app.get("/", (req, res) => {
  //it's preferred to move the index.html to the static assets
  //use this for SSR (server side rendering)
  res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(5000, () => {
  console.log("App listening on port 5000...");
});
