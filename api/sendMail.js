import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Method not allowed" });
  }

  const { naam, email, bedrijf, bericht } = req.body;

  // SMTP configuratie van Mijndomein
  let transporter = nodemailer.createTransport({
    host: "mail.mijndomein.nl", // check in je Mijndomein instellingen
    port: 587,
    secure: false,
    auth: {
      user: "info@documentsupport.nl",
      pass: process.env.MAIL_PASS, // in Vercel als environment variable opslaan!
    },
  });

  try {
    await transporter.sendMail({
      from: `"Document Support" <info@documentsupport.nl>`,
      to: "info@documentsupport.nl", // ontvangstadres
      subject: `Nieuwe intake-aanvraag van ${naam}`,
      text: `Bedrijf: ${bedrijf}\nNaam: ${naam}\nEmail: ${email}\nBericht:\n${bericht}`,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Mail kon niet worden verzonden." });
  }
}
