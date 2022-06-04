const express = require('express');
const mainRouter = require('./routes/main');
const session = require("express-session");
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'secreto' }));
  

  app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
