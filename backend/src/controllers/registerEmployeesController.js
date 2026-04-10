import nodemailer from "nodemailer"; // Envia correos
import crypto from "crypto"; // Genera códigos aleatorios
import jsonwebtoken from "jsonwebtoken"; // Genera el token
import bcryptjs from "bcryptjs"; // Encriptar contraseña

import employeesModel from "../models/employees.js";

import { config } from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
    try {
        const {
        name,
        lastName,
        Salary,
        DUI,
        phone,
        email,
        password,
        isVerified,
        loginAttempts,
        idBranches
        } = req.body;

        const existEmployee = await employeesModel.findOne({email})
        if(existEmployee) {
            return res.status (400).json({message: "Employee already exists"})
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        // Se guarda en la BD
        const newEmployee = new employeesModel({
            name,
        lastName,
        Salary,
        DUI,
        phone,
        email,
        password : passwordHash,
        isVerified : isVerified || false,
        loginAttempts,
        idBranches
        });

        await newEmployee.save();

        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = jsonwebtoken.sign(
            {email, verificationCode},
            config.JWT.secret,
            {expiresIn: "30m"}
        );

        res.cookie("verificationTokenEmployee", tokenCode, {maxAge : 30 * 60* 1000})

        const transporter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : config.email.user_email,
                pass : config.email.user_password
            }
        })

        const  mailOptions = {
            from : config.email.user_email,
            to: email,
            subject : "Verificacion de cuenta",
            text : "Para verificar tu cuenta, utiliza este código" + verificationCode + "expira en 15 minutos"
        }

        transporter.sendMail(mailOptions,(error, info) =>{
            if(error){
                console.log("error" + error)
                return res.status(500).json({message : "error"})
            }
            res.status(200).json({message: "email send"})
        });

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

registerEmployeesController.verifyCode = async (req, res) => {
    try {
        const {verificationCodeRequest} = req.body;
        const token = req.cookies.verificationTokenEmployee;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode:storedCode} = decoded;

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message:"Invalid Code"})
        }

        const employee = await employeesModel.findOne({email});
        employee.isVerified = true;
        await employee.save();
        res.clearCookie("verificationTokenEmployee")

        res.json ({message: "Email verified successfully"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message : "Internal server error" + error})
    }
};

export default registerEmployeesController;