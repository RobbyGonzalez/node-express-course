const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1><a href='/api/products'>products</a>");
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productID", (req, res) => {
  //   console.log(req);
  //   console.log(req.params);
  const { productID } = req.params; //this will be the specific product the customer is requesting, and it is dynamic.
  const singleProduct = products.find((products) => {
    return products.id === Number(productID);
  });
  //set up an if statment to handle undefined request parameters
  if (!singleProduct) {
    return res.status(404).send("Product does not exist");
  }
  res.json(singleProduct);
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("Hellow");
});

//the url looks like this... http://localhost:5000/api/v1/query?name=robby&age=36 or http://localhost:5000/api/v1/query?search=a&limit=2
app.get("/api/v1/query", (req, res) => {
  //   console.log(req.query); //we get an object with key value pairs for name and age.
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  //when setting up if conditions, make sure you are using returns if the condition is met. otherwise you will be sending multi responses and you will get the error..."cannot set headers after they are sent to the client"
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send("no products matched your search");
    //this is a common way of dealing with no returned data, but the url was a valid request.
    return res.status(200).json({ sucess: true, data: [] });
  }
  res.status(200).json(sortedProducts);
});

app.listen(5000, () => console.log("server is listenting on port 5000..."));
