const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: (req, res) => {
    db.Book.findByPk(req.params.id)
      .then(book => {
        res.render('bookDetail.ejs', { book });
      });
  },
  bookSearch: (req, res) => {
    res.render('search');

   },
  bookSearchResult: function (req, res) {                      //busqueda de libro
    let bookFind = req.query.book
    db.Book.findAll({
      where: {
        title: { [Op.like]: '%' + bookFind + '%' },
      }
    })
      .then(function (Book) {
        res.render('home',{Book:Book})
      })
  },
  deleteBook:  (req, res) => {                            // eliminar libro
    db.Book.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.redirect('books/:id')
        })
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks:
    // Implement books by author
    (req, res) => {
      db.Book.findByPk(req.params.id)
        .then(book => {
          res.render('authorBooks', { book });
        });
    
    },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  },
  editBook: 
    (req, res) => {                              // edicion de libro
      db.Book.findByPk(req.params.id)
          .then(book => {
              res.render("editBook", { id:req.params.id })
          })
    
  },
  processEdit: (req, res) => {
    db.Book.findByPk(req.params.id)
          .then(book => {
    res.render('home');
   })
  
  }
   }


module.exports = mainController;