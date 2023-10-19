const nodemailer = require('nodemailer');
// const User = require('../models/User'); // Assuming you have a User model

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rohitsingh998195@gmail.com',
    pass: 'fcvhjowqybzftnle'
  }
});

const registerController = async (req, res,email) => {
  // Validate and save user data to the database (Model logic)

  // Assuming user is an instance of the User model
//   const user = new User(req.body);
//   await user.save();

  // Sending confirmation email (Nodemailer code)
  const mailOptions = {
    from: 'rohitsingh998195@gmail.com',
    to: email,
    subject: 'Registration Confirmation',
    text: 'Thank you for registering!'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Registration successful! Check your email for confirmation.');
    }
  });
};

module.exports = { registerController };