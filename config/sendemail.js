const nodemailer = require("nodemailer");


const transporterEmail = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    port: 465,
    secure: true, 
    logger: true,
    debug: true, 
    secureConnection: false,
    auth: {
        user: process.env.EMAIL_USERNAME, // Set this environment variable
        pass: process.env.EMAIL_PASSWORD  // Set this environment variable
    },
    tls: {
        rejectUnAuthorized: true
    }
});

transporterEmail.verify((error, success) => {
    if (error) {
        console.log('Error connecting to email service:', error);
    } else {
        console.log('Successfully connected to email service:', success);
    }
});

module.exports = transporterEmail