const nodemailer = require("nodemailer");
const emailStyle = require("./emailStyle");
const sendEmail = async (email,subject,link)=>{

    let transporter = nodemailer.createTransport({
        service:"gmail",

        auth: {
          user: process.env.SENDEMAIL, // generated ethereal user
          pass: process.env.SENDEMAILPASSWORD, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'Farhanh company', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: emailStyle(link,subject)
       
      });

}
module.exports = sendEmail;
