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
  search: (req, res)=> {
    
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('search.ejs', { books });
      })
      .catch((error) => console.log(error));
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
  processLogin:(req,res) =>{
    const errors = validationResult(req);
    
    if(errors.isEmpty()){
      let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json')));
      let usuarioLogueado = archivoUsuarios.find(usuario => usuario.email == req.body.email)
     
      delete usuarioLogueado.password;
      req.session.usuario = usuarioLogueado;  
      if(req.body.recordarme){
        res.cookie('email',usuarioLogueado.email,{maxAge: 1000 * 60 * 60 * 24})
      }
      return res.redirect('/');   

    }else{
     
      res.render(path.resolve(__dirname, '../views/login'),{errors:errors.mapped(),old:req.body});        
    }

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


  logout: function (req, res) {
    req.session.destroy();
    res.clearCookie("login");
    res.redirect("/");
  },

  users: function (req, res) {
    let promUser = db.user.findAll()
    let promUsercategory = db.user_category.findAll()
    Promise
      .all([promUser, promUsercategory])
      .then(([allUsers, allCategories]) => {
        return res.render('users/users', { allUsers, allCategories })
      })
      .catch(error => res.send(error))
  },

}



module.exports = mainController;