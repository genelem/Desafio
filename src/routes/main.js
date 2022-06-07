const express = require('express');
const mainController = require('../controllers/main');

const router = express.Router();
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
router.post('/users/login' ,mainController.processLogin);


// Edicion de libros
router.get('/books/edit/:id', mainController.editBook);
router.patch('/books/edit/:id', mainController.processEdit);

// Eliminacion de libros

router.delete('/books/delete/:id', mainController.deleteBook);

module.exports = router;



