const express = require("express");
const app = express(); //this is creating the express server!
//Express will infer what your status codes should be if you don't add them.

app.get("/", (req, res) => {
  console.log("User hit the home page");
  res.status(200).send("Home Page");
});

app.get("/about", (req, res) => {
  console.log("User hit the about page");
  res.status(200).send("About Page");
});

//this has to be last to catch everything.
app.all("*", (req, res) => {
  console.log("404 page");
  res.status(404).send("<h1>Resource not found</h1>");
});

//doesn't matter where this is located! all functions seem to be asyc and know to prioritize express server listening functions to start first.
app.listen(5000, () => {
  console.log("server is listening on port 5000");
});

//.get
//.post
//.put
//.use -for setting up static and middleware
//.all -all html actions/verbs
//.listen -for listen to client requests
