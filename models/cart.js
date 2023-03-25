const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define('cart',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
})

module.exports = Cart;




// const fs = require("fs");
// const path = require("path");

// const rootDir = require("../util/path");

// const p = path.join(rootDir, "data", "cart.json");

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err) {
//         cart = JSON.parse(fileContent);
//       }
//       const existingProductIndex = cart.products.findIndex(
//         (prod) => prod.id === id
//       );
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty += 1;
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 };
//         cart.products = [...cart.products, updatedProduct];
//       }
//       cart.totalPrice += +productPrice;
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log(err);
//       });
//     });
//   }
//   static deleteProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) return;
//       const cart = JSON.parse(fileContent);
//       const updatedCart = { ...cart };
//       const product = updatedCart.products.find(prod => prod.id === id)
//       if(!product) return;
//       updatedCart.products = updatedCart.products.filter((prod) => prod.id !== product.id);
//       updatedCart.totalPrice -= productPrice*product.qty;
//       fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
//         console.log(err);
//       });
//     });
//   }
//   static getCart(cb){
//     fs.readFile(p, (err,fileContent)=>{
//       if(err){
//         cb(null)
//       }
//       else{
//         const cart = JSON.parse(fileContent);
//         cb(cart);
//       }
//     })
//   }
// };
