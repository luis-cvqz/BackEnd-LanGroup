const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "langroupidiomas@gmail.com",
    pass: "Colegio1901",
  },
});

transporter.verify().then( () =>{
  console.log('Ready dor send emails.');
})