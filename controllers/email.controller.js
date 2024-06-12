const nodemailer = require("nodemailer");
const logger = require("../services/logger.service"); // Importar el logger

exports.enviarCorreo = async (req, res) => {
  const { to, subject, text } = req.body;

  // Configuración del transportador de nodemailer
  let transporter = nodemailer.createTransport({
    service: "gmail", // o el servicio que estés utilizando (e.g., yahoo, outlook)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Correo electrónico enviado!" });
  } catch (error) {
    logger.error(`Error al enviar el correo electrónico: ${error.message}`); // Log con el mensaje de error específico
    res.status(500).send({
      message: "Error al enviar el correo electrónico",
      error: error.toString(),
    });
  }
};
