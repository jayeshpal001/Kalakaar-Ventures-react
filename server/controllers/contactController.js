const nodemailer = require("nodemailer");

// @desc    Send an email from the contact form
// @route   POST /api/contact
const sendEmail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error("Please provide all fields: name, email, and message.");
    }

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Construct the email payload
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Sends through your server
      replyTo: email, // If you hit 'reply', it goes to the client
      to: process.env.RECEIVER_EMAIL,
      subject: `New Lead: Kalakaar Ventures - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #050505;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    // Dispatch the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Transmission successful." });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendEmail };