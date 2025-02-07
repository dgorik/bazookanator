const transporterEmail = require('../config/sendemail');

module.exports = {
    sendEmail: async (userName, email, activation_link) => {
        console.log(email)
        try {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email, // e.g., your email address to receive the contact form
            subject: 'Activate Your Account',
            html: `<p>Hello ${userName},</p>
                   <p>Please click the link below to activate your account:</p>
                   <a href="${activation_link}">${activation_link}</a>
                   <p>This link will expire in 20 minutes.</p>`
        }

        // Send the email
        await transporterEmail.sendMail(mailOptions);

        } catch (err) {
            console.error('Error sending email:', err);
        }
  },
}
 