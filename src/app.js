const express = require('express');
const path = require('path');
const session = require("express-session");
const cookieParser = require('cookie-parser')
const bodyParser =  require('body-Parser');


const mainRouter = require('./routes/main');

const booksRouter = require('./routes/main');
const authorsRouter = require('./routes/main');
const usersRouter = require('./routes/main');



const app = express();



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));           //para capturar envios por post en "req.body"
app.use(session( {secret: "la clave secreta"}));
app.use(cookieParser());


  

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);
app.use(booksRouter);
app.use(authorsRouter);
app.use(usersRouter);


app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
