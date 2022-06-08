const path = require('path');
module.exports = (req,res,next) =>{
    //return res.render(path.resolve(__dirname, '..','views','web','mantenimiento'));
    let categoryId = 1;  //Esto vendria en una variable de sesión luego que el usuario de loguea.  (Admin == 1)
    if(categoryId != 1){  
        return res.render(path.resolve(__dirname, '..','views','web','mantenimiento'));
    }
    next();
}