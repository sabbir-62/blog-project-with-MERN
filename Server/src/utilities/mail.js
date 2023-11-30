const nodemailer = require('nodemailer');


// 4 digit OTP generate
exports.generateOTP = () => {
    let otp = '';
    for (let i = 0; i <= 3; i++) {
        const value = Math.round(Math.random() * 9);
        otp = otp + value;
    }
    return otp
}


// send email
const smtpUsername = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;

exports.SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: smtpUsername,
            pass: smtpPassword
        }
    });

    let mailOptions = {
        from: 'mszaman1952.1971@gmail.com',
        to: EmailTo,
        html: `<h1>${EmailText}</h1>`,
        subject: EmailSubject,
    };

    return await transporter.sendMail(mailOptions)

}
