const sgMail = require("@sendgrid/mail");

// Set API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @desc    Send an email from the contact form
// @route   POST /api/contact
const sendEmail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // validation
    if (!name || !email || !message) {
      res.status(400);
      throw new Error("Please provide all fields: name, email, and message.");
    }

    // email data
    const msg = {
      to: process.env.RECEIVER_EMAIL, // where you want to receive emails
      from: {
        name: "Kalakaar Ventures",
        email: process.env.EMAIL_USER, // verified sender email in SendGrid
      },
      replyTo: email, // when you reply, it goes to client email
      subject: `New Lead: Kalakaar Ventures - ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #050505;">New Project Inquiry</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <hr style="border: 1px solid #eee; margin: 20px 0;" />

          <p><strong>Message:</strong></p>

          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${message}
          </p>
        </div>
      `,
    };

    // send email
    await sgMail.send(msg);

    res.status(200).json({
      success: true,
      message: "Transmission successful.",
    });

  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error.message);
    next(error);
  }
};

module.exports = { sendEmail };