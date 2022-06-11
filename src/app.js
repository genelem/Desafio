const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require("express-session");
const cookieParser = require('cookie-parser')
const bodyParser =  require('body-Parser');
const recordame = require("./middlewares/recordar");
const locals = require("./middlewares/locals");

//Requerir el middleware que controla si el usuario está o no Logueado
const acceso = require('./middlewares/acceso');

//Debemos requerir nuestro Middleware de mantenimiento
//const mantenimiento = require('./middlewares/mantenimiento');


const mainRouter = require('./routes/main');

const booksRouter = require('./routes/main');
const authorsRouter = require('./routes/main');
const usersRouter = require('./routes/main');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));           //para capturar envios por post en "req.body"
app.use(session( {secret: "la clave secreta"}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(acceso);

//Llamo mi Middleware de aplicación - 
//app.use(mantenimiento);  //Le comente para ahora hacer un middleware de ruta


app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(methodOverride('_method'));
app.use('/', mainRouter);
app.use(booksRouter);
app.use(authorsRouter);
app.use(usersRouter);
app.use(recordame);
app.use(locals);






app.listen(3008, () => {
  console.log('listening in http://localhost:3008');




});
