const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");

async function sendMail(options) {
  const { email, subject, body, html } = options;
  const credentials = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  };
  console.log(credentials);
  try {
    const oAuth2Client = new google.auth.OAuth2(
      credentials.CLIENT_ID,
      credentials.CLIENT_SECRET,
      credentials.REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: credentials.REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken(""); // <--- Corrected here
    console.log(
      process.env.EMAIL_FROM,
      credentials.CLIENT_ID,
      credentials.REFRESH_TOKEN,
      accessToken
    );
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_FROM,
        clientId: credentials.CLIENT_ID,
        clientSecret: credentials.CLIENT_SECRET,
        refreshToken: credentials.REFRESH_TOKEN,
        accessToken: accessToken.token, // <--- Corrected here
      },
    });
    const mailOptions = {
      from: `${process.env.APP_NAME}<${process.env.EMAIL_FROM}>`,
      to: email,
      subject: subject,
      text: body,
      html: html,
    };
    console.log("Sending email...");
    const result = await transport.sendMail(mailOptions);
    console.log("Email sent successfully!");
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error.message);
    return error;
  }
}
module.exports = sendMail;
