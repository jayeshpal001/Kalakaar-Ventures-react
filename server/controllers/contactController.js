const sgMail = require("@sendgrid/mail");
// NEW: Import your template generator
const { generatePremiumContactEmail } = require("../utils/emailTemplates");

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

    // Generate the HTML by calling your separated component
    const premiumHTML = generatePremiumContactEmail(name, email, message);

    // email data
    const msg = {
      to: process.env.RECEIVER_EMAIL, 
      from: {
        name: "Kalakaar Ventures",
        email: process.env.EMAIL_USER, 
      },
      replyTo: email, 
      subject: `New Lead: Kalakaar Ventures - ${name}`,
      html: premiumHTML, 
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