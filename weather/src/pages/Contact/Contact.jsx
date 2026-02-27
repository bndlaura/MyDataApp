import { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    localStorage.setItem("contactForm", JSON.stringify(formData));

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="contact-wrapper">
      <div className="contact-content">
        <h1 className="contact-title">Contact Us</h1>

        <p className="contact-subtitle">
          We'd love to hear from you.  
          Whether it's feedback, questions, or collaboration ideas reach out anytime.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Your name" 
            className="contact-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input 
            type="email" 
            placeholder="Your email" 
            className="contact-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea 
            placeholder="Your message..." 
            className="contact-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="contact-btn" type="submit">
            Send message
          </button>
        </form>

        <div className="divider">or</div>

        <Link to="/home" className="cta-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
