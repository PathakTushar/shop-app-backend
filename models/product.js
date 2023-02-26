const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "products.json");

const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

module.exports = class product {
  constructor(productTitle,imageUrl,description,price) {
    this.title = productTitle;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    getProductFromFile(cb);
  }
};
