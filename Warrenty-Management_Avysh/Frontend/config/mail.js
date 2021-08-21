const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "806266201594-t6mqvrmnuqe8tdrq8sas485uaj3vmld5.apps.googleusercontent.com";
const CLIENT_SECRET = "koINAipI_Fe-IYxfdlVBXsvG";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04UvDDkdv-X0fCgYIARAAGAQSNwF-L9IrqjF5jhn_-1sG3zLo7UHredSzjKWfW92JyAVaIRbDmZCIHwMShFuTZRlq61jEb-KfshY";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendpendingNotification = async (user, item, order) => {
  var accessToken = await oAuth2Client.getAccessToken();

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "warrantyhelpavysh@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  var mailOptions = {
    from: "warrantyhelpavysh@gmail.com",
    to: user.email,
    subject: "Warranty Expiry in 5 days!!",
    text: `Dear ${user.name},
    The warranty of your ${item.prodName} purchased on ${order.purchaseDate} is going to expire in 5 days. 
Please visit http://localhost:5000 to extend or redeem your warranty.

Thank you.

Regards
Avysh Help`,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendexpiredNotification = async (user, item, order) => {
  var accessToken = await oAuth2Client.getAccessToken();

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "warrantyhelpavysh@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  var mailOptions = {
    from: "warrantyhelpavysh@gmail.com",
    to: user.email,
    subject: "Warranty Expired!",
    text: `Dear ${user.name},
    The warranty of your ${item.prodName} purchased on ${order.purchaseDate} has expired. 

Thank you.

Regards
Avysh Help`,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendpendingNotification, sendexpiredNotification };
