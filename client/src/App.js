import React, { useState } from "react";
import axios from "axios";

function App() {
  const [recipients, setRecipients] = useState("");
  const [prompt, setPrompt] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/v1/mails/generate", {
        prompt,
      });
      console.log(":::res", res);
      
      setEmailBody(res.data.email);
    } catch (err) {
      console.error(err);
      alert("Error generating email");
    }
    setLoading(false);
  };

  const sendEmail = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/mails/send", {
        recipients: recipients.split(",").map((e) => e.trim()),
        subject: "AI Generated Email",
        content: emailBody,
      });
      alert("Email sent!");
    } catch {
      alert("Failed to send");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>AI Email Generator</h1>
      <input
        type="text"
        placeholder="Recipients (comma separated)"
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <textarea
        rows="3"
        placeholder="Enter prompt for the email..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={generateEmail} disabled={loading}>
        {loading ? "Generating..." : "Generate Email"}
      </button>
      <br />
      <textarea
        rows="10"
        value={emailBody}
        onChange={(e) => setEmailBody(e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "10px 0" }}
      />
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}

export default App;
