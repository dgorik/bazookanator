const nodemailer = require("nodemailer");


const transporterEmail = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // You can use other email services like Outlook or Yahoo
    auth: {
        user: process.env.EMAIL_USER, // Set this environment variable
        pass: process.env.EMAIL_PASSWORD  // Set this environment variable
    }
});

module.exports = transporterEmail