const nodemailer = require("nodemailer");

const sendEmail = async (from, passFrom, to, subject, html) => {
  let transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: from, // generated ethereal user
      pass: passFrom, // generated ethereal password
    },
  });
  console.log(to.join(","));
  // send mail with defined transport object
  try {
    let info = await transporter.sendMail({
      from: `" 👻" <${from}>`, // sender address
      to: `${to.join(",")}`, // list of receivers
      subject: `${subject}`, // Subject line
      html: `${html}`, // html body
    });
    return info;
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
