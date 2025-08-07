import axios from "axios";
import nodemailer from "nodemailer";

// Retrieve tasks
export const generateMessage = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const email = response.data.choices[0].message.content;
    res.json({ email });
  } catch (error) {
console.error("Error generating message:", error.response?.data || error.message);
    res.status(500).json({ error: "AI generation failed" });
  }
};

export const sendMessage = async (req, res) => {
  const { recipients, subject, content } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients.join(","),
      subject,
      html: content,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: "Failed to send email" });
  }
}