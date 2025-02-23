const nodemailer = require("nodemailer");


const ConnectEmail = async () => {
    const transporterEmail = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME, // Set this environment variable
            pass: process.env.EMAIL_PASSWORD  // Set this environment variable
        },
    });

    transporterEmail.verify((error, success) => {
        if (error) {
            console.log('Error connecting to email service:', error);
        } else {
            console.log('Successfully connected to email service:', success);
        }
    });
}

module.exports = ConnectEmail