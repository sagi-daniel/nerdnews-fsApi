const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    PORT: process.env.PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "geekHUB <info@geekhub.io>",
    to: options.email,
    subject: options.subject,
    subject: options.message,
    // html:
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
