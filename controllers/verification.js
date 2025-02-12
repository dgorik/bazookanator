const connectEmail = require('../config/email');

    const sendEmail =  async (userName, email, activation_link) => {
        try {
            const transporter = await connectEmail();
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
            await transporter.sendMail(mailOptions);

        } catch (err) {
            console.error('Error sending email:', err);
        }
  }

module.exports = sendEmail

 