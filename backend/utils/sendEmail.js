const nodemailer = require('nodemailer')

exports.sendEmail = async (userDetail) =>{
    const transport = nodemailer.createTransport({
        host: process.env.SMTTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
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
