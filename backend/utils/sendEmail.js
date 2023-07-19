const nodemailer = require('nodemailer')

exports.sendEmail = async (userDetail) =>{
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
     auth: {
       user: process.env.FROM_EMAIL,
       pass: process.env.FROM_PASSWORD
     }
   });

      let info = await transporter.sendMail({
        from: process.env.FROM_SENDER, // sender address
        to: userDetail.email, // list of receivers
        subject: 'Password reset token', // Subject line
        text: userDetail.message, // plain text body
      });

      console.log('Message sent: %s', info.messageId);
}
