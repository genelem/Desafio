const express = require('express');

const router = express.Router();

const db = require('../database/models/');
const User = db.User;
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const {
    check,
    validationResult,
    body
} = require('express-validator');
const mainController =  require(path.resolve(__dirname, '../controllers/main'));




// Ingreso al home
router.get('/', mainController.home);
// Detalle de un libro
router.get('/books/detail/:id', mainController.bookDetail);

// Busqueda de libros

router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);

// Lista de autores
router.get('/authors', mainController.authors);

// Libros de autores
router.get('/authors/:id/books', mainController.authorBooks);

// Registro de usuarios

router.get('/users/register', mainController.register);
router.post('/users/register', mainController.processRegister);

// Ingreso de usuario
router.get('/users/login', mainController.login);
router.post('/users/login', [check('email').isEmail().withMessage('Email invalido'),check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
],mainController.processLogin);
router.post('/users/logout', mainController.logout);



// Edicion de libros
router.get('/books/edit/:id', mainController.editBook);
router.patch('/books/edit/:id', mainController.processEdit);

// Eliminacion de libros

router.delete('/books/delete/:id', mainController.deleteBook);

module.exports = router;



