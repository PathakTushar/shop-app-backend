// const { where } = require("sequelize");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  // Product.fetchAll()
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      // console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch(err => console.log(err))
};

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir,'views', 'add-product.html'));
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(
  //   title,
  //   price,
  //   description,
  //   imageUrl,
  //   null,
  //   req.user._id
  // );
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  })
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.postAddProduct = (req, res, next) => {
//   //   console.log(req.body);
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;

//   // req.user.createProduct({
//   //   title:title,
//   //   price:price,
//   //   imageUrl: imageUrl,
//   //   description: description,
//   // })
//   const product = new Product(title,price,description,imageUrl, null, req.user._id)
//   product.save()
//   .then((_) => {
//     console.log("created product")
//     res.redirect('/admin/products')
//   })
//   .catch((err) => console.log(err));
//   // Product.create({
//   //   title: title,
//   //   description: description,
//   //   imageUrl: imageUrl,
//   //   price: price,
//   // })

//   // const product = new Product(null, title, imageUrl, description, price);
//   // product
//   //   .save()
//   //   .then(() => {
//   //     res.redirect("/");
//   //   })
//   //   .catch((err) => console.log(err));
// };

exports.getEditProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir,'views', 'add-product.html'));
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // req.user.getProducts({where: {id: prodId}})
  // Product.findByPk(prodId)
  Product.findById(prodId)
    .then((product) => {
      // const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  // const product = new Product(updatedTitle,updatedPrice,updatedDescription,updatedImageUrl,prodId);
  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      return product.save()
    })
  .then((_) => {
    console.log("updated product")
    res.redirect('/admin/products')
  })
  .catch((err) => console.log(err));

  // Product.findByPk(prodId)
  //   .then((product) => {
  //     product.title = updatedTitle;
  //     product.price = updatedPrice;
  //     product.imageUrl = updatedImageUrl;
  //     product.description = updatedDescription;
  //     return product.save();
  //   })
  //   .then((_) => {
  //     console.log("Product Updated");
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));

  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDescription,
  //   updatedPrice
  // );
  // updatedProduct.save();
  // res.redirect("/admin/products");
};

exports.postDeleteProduct=(req,res,next) => {
  const prodId = req.body.productId;
  // Product.deleteById(prodId)
  Product.findByIdAndRemove(prodId)
    .then(()=>{
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    })
}

// exports.getProducts = (req, res, next) => {
//   req.user.getProducts()
//   // Product.findAll()
//     .then((products) => {
//       res.render("admin/products", {
//         prods: products,
//         pageTitle: "Admin Products",
//         path: "/admin/products",
//       });
//     })
//     .catch((err) => console.log(err));
// };

// // exports.getProducts = (req, res, next) => {
// //   Product.fetchAll((products) => {
// //     res.render("admin/products", {
// //       prods: products,
// //       pageTitle: "Admin Products",
// //       path: "/admin/products",
// //     });
// //   });
// // };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//   .then(product =>{
//     return product.destroy();
//   })
//   .then((_)=>{
//     console.log('Product deleted');
//     res.redirect('/admin/products')
//   })
//   .catch (err => console.log(err))
//   // Product.deleteById(prodId);
//   // res.redirect("/admin/products");
// };
