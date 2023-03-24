const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");
const sequelize = require('./util/database')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use('/product',(req,res,next)=>{
//     console.log('product middleware')
//     res.send('<h1>Product Page</h1>');
//     // next();
// })

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
sequelize.sync()
    .then(()=>{
        app.listen(3000, () => {
            console.log("server is running on port 3000");
            });
    })
    .catch(err => console.log(err))

