const Product = require("../models/product");
const Cart = require("../models/cart");


exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch(err => console.log(err))
  // Product.fetchAll()
  // .then(([rows, fieldData])=>{
  //   res.render("shop/product-list", {
  //       prods: rows,
  //       pageTitle: "All Products",
  //       path: "/products",
  //     });
  // })
  // .catch(err=> console.log(err))
};

// exports.getProducts = (req, res, next) => {
//   // console.log('first middleware');
//   // res.send('<h1>Hello from the server</h1>');
//   // console.log('shop  ',products);
//   // res.sendFile(path.join(rootDir,'views', 'shop.html'));
//   Product.fetchAll((products) => {
//     res.render("shop/product-list", {
//       prods: products,
//       pageTitle: "All Products",
//       path: "/products",
//     });
//   });
// };

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then(product=>{
    // console.log(rows);
    res.render("shop/product-detail", {
    product: product,
    pageTitle: product.title,
    path: "/products",
  });
  })
  .catch(err=> console.log(err))
};

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId, (product) => {
//     res.render("shop/product-detail", {
//       product: product,
//       pageTitle: product.title,
//       path: "/products",
//     });
//   });
// };

exports.getIndex = (req,res,next)=>{
  Product.findAll()
    .then(products => {
        res.render("shop/index", {
        prods: products,
        pageTitle: "shop",
        path: "/",
      });
    })
    .catch(err => console.log(err))
  // Product.fetchAll()
  // .then(([rows, fieldData])=>{
  //   res.render("shop/index", {
  //       prods: rows,
  //       pageTitle: "shop",
  //       path: "/",
  //     });
  // })
  // .catch(err=> console.log(err))
}

// exports.getIndex = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render("shop/index", {
//       prods: products,
//       pageTitle: "shop",
//       path: "/",
//     });
//   });
// };
exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your orders",
  });
};

exports.postCartDeleteProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  Product.findById(prodId,product=>{
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  })
}

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
