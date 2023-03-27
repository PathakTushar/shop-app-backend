const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb');

class Product {
  constructor(title, price, description, imageUrl, id, userId){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongoDb.ObjectId(id) : null;
    this.userId = userId;
  }
  save(){
    const db = getDb();
    let dbOp;
    if(this._id){
      dbOp = db.collection('products').updateOne({_id: this._id}, {$set : this});
    }
    else{
      dbOp = db.collection('products').insertOne(this)
    }
    return dbOp
     .then(result => {
      // console.log(result);
     })
     .catch(err =>  console.log(err))
  }
  static fetchAll(){
    const db = getDb();
    return db.collection('products').find().toArray()
      .then(products => {
        // console.log(products);
        return products;
      })
      .catch (err =>{
        console.log(err);
      })
  }
  static findById(prodId){
    const db = getDb();
    return db.collection('products').find({_id: new mongoDb.ObjectId(prodId)}).next()
      .then(product => {
        // console.log(product);
        return product;
      })
      .catch (err =>{
        console.log(err);
      })
  }
  static deleteById(prodId){
    const db = getDb();
    return db.collection('products').deleteOne({_id: new mongoDb.ObjectId(prodId)})
      .then(result => {
        console.log("deleted");
      })
      .catch(err => {
        console.log(err);
      })
  }
}

module.exports = Product;


// const Sequelize = require('sequelize')
// const sequelize = require('../util/database');

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   }

// });

// module.exports = Product;





// https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b4f34cf6-44e0-4301-a8df-c373545530fc/air-jordan-1-retro-high-og-shoe-PLe8kL.png
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqaXu_H6JKdRtcmUJms39GnpsEHGQ7UolKNQ&usqp=CAU

// // const fs = require("fs");
// // const path = require("path");

// const db = require("../util/database");

// const Cart = require("./cart");

// // const rootDir = require("../util/path");
// // const p = path.join(rootDir, "data", "products.json");

// // const getProductFromFile = (cb) => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       return cb([]);
// //     }
// //     return cb(JSON.parse(fileContent));
// //   });
// // };

// module.exports = class product {
//   constructor(id, productTitle, imageUrl, description, price) {
//     this.id = id;
//     this.title = productTitle;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }
//   // save() {
//   //   getProductFromFile((products) => {
//   //     if (this.id) {
//   //       const existingProductIndex = products.findIndex(
//   //         (prod) => prod.id === this.id
//   //       );
//   //       const updatedProducts = [...products];
//   //       updatedProducts[existingProductIndex] = this;
//   //       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//   //         console.log(err);
//   //       });
//   //     } else {
//   //       this.id = Math.random().toString();
//   //       products.push(this);
//   //       fs.writeFile(p, JSON.stringify(products), (err) => {
//   //         console.log(err);
//   //       });
//   //     }
//   //   });
//   // }

//   save() {
//     return db.execute(
//       "insert into products(title,price,imageUrl,description) values(?, ?, ?, ?)",
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }

//   static deleteById(id) {
//     getProductFromFile((products) => {
//       const product = products.find((prod) => prod.id === id);
//       const updatedProducts = products.filter((prod) => prod.id !== id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         if (!err) {
//           Cart.deleteProduct(id, product.price);
//         }
//       });
//     });
//   }

//   static fetchAll() {
//     return db.execute("select * from products");
//   }

//   // static fetchAll(cb) {
//   //   getProductFromFile(cb);
//   // }

//   static findById(id) {
//     return db.execute("select * from products where products.id = ?",[id])
//   }

//   // static findById(id, cb) {
//   //   getProductFromFile((products) => {
//   //     const product = products.find((prod) => prod.id === id);
//   //     cb(product);
//   //   });
//   // }
// };
