const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const mainController =  require(path.resolve(__dirname, '../controllers/main'));
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// Ingreso al home
router.get('/', mainController.home);
// Detalle de un libro
router.get('/books/detail/:id', mainController.bookDetail);

// Busqueda de libros

router.get('/search/books', mainController.search);

// Lista de autores
router.get('/authors', mainController.authors);

// Libros de autores
router.get('/authors/:id/books', mainController.authorBooks);

// Registro de usuarios

router.get('/users/register', mainController.register);
router.post('/users/register', mainController.processRegister);

// Ingreso de usuario
router.get('/users/login', mainController.login);
router.post('/users/login', mainController.processLogin);
router.get('/logout', mainController.logout);



// Edicion de libros
router.get('/books/edit/:id',mainController.editBook);
router.patch('/books/edit/:id',authMiddleware, mainController.processEdit);

// Eliminacion de libros

//Borrar libros
router.delete('/books/delete/:id', mainController.destroy); 
router.patch('/books/delete/:id',authMiddleware,mainController.delete);



module.exports = router;



