const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const { promiseImpl } = require('ejs');
const path = require('path');

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
        res.send('search')
      })
  },
  deleteBook: (req, res) => {
    let bookId = req.params.id
    db.Book.destroy({ where: { id: bookId }, force: true })
      .then(() => {
        return res.redirect('/')
      })
      .catch(error => res.send(error))
  },

  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },

  authorBooks: async (req, res) => {

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
  processLogin: (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.render("login", {
        errores: errores.errors,
        old: req.body
      });
    }
    db.User.findOne({
      where: {
        email: req.body.email,
        pass: req.body.pass = bcryptjs.hashSync(req.body.password, 8)
      }
    }).then(usuarioEncontrado => {
      req.session.usuarioLogueado = usuarioEncontrado;
      if (req.body.recordame) {
        res.cookie("recordame", usuarioEncontrado, { maxAge: 60000 * 60 * 24 })
      }
      return res.redirect("/");
    })

  },
  editBook: (req, res) => {
    let promBook = db.Book.findByPk(req.params.id)
    Promise
      .all([promBook])
      .then(([book]) => {

        return res.render(path.resolve(__dirname, '..', 'views', 'editBook'), { book })
      })
      .catch(error => res.send(error))



  },

  processEdit: (req, res) => {


    let bookId = req.params.id
    db.Book.update({
      title: req.body.title,
      cover: req.body.cover,
      description: req.body.description,


    },
      {
        where: { id: bookId }
      })

      .then(() => {
        return res.redirect('/')
      })
      .catch(error => res.send(error))


  },




}



module.exports = mainController;

