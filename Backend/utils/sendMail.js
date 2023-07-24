const nodemailer = require("nodemailer");
const sendMail = (options) => {
  // Create a transport object using the Mailtrap SMTP credentials
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
      user: process.env.SMTP_USERNAME, // Replace with your Mailtrap username
      pass: process.env.SMTP_PASSWORD, // Replace with your Mailtrap password
    },
  });

  // Email content
  const mailOptions = {
    from: `${process.env.APP_NAME} <${process.env.EMAIL_FROM}>`, // Replace with your sender email address
    to: options.email, // Replace with the recipient email address
    subject: options.subject,
    text: options.body,
    html: options.html,
  };

  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error.message);
    } else {
      console.log("Email sent successfully!");
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info)); // Use this URL to preview the email in Mailtrap
    }
  });
};
module.exports = sendMail;
