import nodemailer from "nodemailer"; // Envia correos
import crypto from "crypto"; // Genera códigos aleatorios
import jsonwebtoken from "jsonwebtoken"; // Genera el token
import bcryptjs from "bcryptjs"; // Encriptar contraseña


import customerModel from "../models/customerModel.js";

import { config } from "../config.js";

// Creo un array de funciones
const registerCustomers = {};

registerCustomersController.register = async (req, res) => {
    try {
        // 1. Solicitar todos los datos a guardar
        const {
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body;
        
        //  Validacion de correo para verificar si el correo ya esta registrado
        const existCustomer = await customerModel.findOne({email})
        if(existCustomer){
            return res.status (400).json({message: "Customer already exists"})
        }
        
        // Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password,10);

        // Guardamos en BD
        const newCustomer = new customerModel({
            name,
            lastName,
            birthdate,
            email,
            password : passwordHash,
            isVerified : isVerified || false,
            loginAttempts,
            timeOut,
        });

        await newCustomer.save();

        // Generar código aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex")

        // Se guarda el código en un token
        const tokenCode = jsonwebtoken.sign(
            // 1. ¿Que vamos a guardar?
            {email, verificationCode},
            // 2. Secret key
            config.JWT.secret,
            // 3. ¿Cuando expira?
            {expiresIn : "15m"}
        );

        res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000}) // Se especifica el tiempo 15 = minuto. 60 = segundos. 1000 = milisegundos

        }
    catch (error) {
        
    }
}