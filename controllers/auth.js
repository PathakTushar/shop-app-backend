const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1] === 'true';
  console.log(req.session.isLoggedIn);
  const isLoggedIn = req.session.isLoggedIn;
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie', 'loggedIn = true');
  User.findById("64232680e621cd25d56b9293")
  .then((user) => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(err => {
      console.log(err);
      res.redirect('/');
    })
  })
  .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/')
  })
};