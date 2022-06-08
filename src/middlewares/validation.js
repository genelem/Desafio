const { check, body } = require("express-validator");
const fs = require('fs');
const path = require('path');
const db = require("../database/models");


module.exports = {

    login: [
        check("email")
            .notEmpty()
            .withMessage("Falta ingresar Email")
            .bail()
            .isEmail()
            .withMessage("Formato de correo incorrecto"),

        check("password")
            .notEmpty()
            .withMessage("Falta ingresar Contraseña")
        ]


    }