const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// const Product = require("./models/product");
const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

const errorController = require("./controllers/error");
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');
// const sequelize = require("./util/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// app.use('/product',(req,res,next)=>{
//     console.log('product middleware')
//     res.send('<h1>Product Page</h1>');
//     // next();
// })

app.use((req, res, next) => {
  User.findById('64232680e621cd25d56b9293')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb+srv://tusharph1:H7MKm7DQxGFinIw3@cluster0.pnz96nc.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
    User.findOne()
      .then(user => {
        if(!user){
          const user = new User({
            name: "Tushar",
            email: "tushar@gmail.com",
            cart: {
              items: []
            }
          })
          user.save()
        }
      })
    app.listen(3000, ()=>{
      console.log('Server is running on port 3000');
    })
  })
  .catch(err => {
    console.log(err);
  })

// mongoConnect(() => {
//   app.listen(3000, () => {
//     console.log("server is running on port 3000");
//   });
// })

// app.use((req,res,next)=>{
//   User.findByPk(1)
//   .then(user=>{
//     req.user = user;
//     next()
//   })
//   .catch(err => console.log(err))
// })

// Product.belongsTo(User, {
//   constraints: true,
//   onDelete: "CASCADE",
// });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsToMany(Cart, {through: CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, {through: OrderItem});

// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then(result =>{
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     if(!user){
//       User.create({
//         name: 'Tushar',
//         email: 'tushar@gmail.com',
//       })
//     }
//     return user;
//   })
//   .then(user =>{
//     return user.createCart();
//   })
//   .then(cart => {
//     // console.log(user);
//     app.listen(3000, () => {
//       console.log("server is running on port 3000");
//     });
//   })
//   .catch((err) => console.log(err));
