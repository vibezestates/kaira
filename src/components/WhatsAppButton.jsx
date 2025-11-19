import React from "react";
import "./WhatsAppButton.css";
import { PhoneCall } from "lucide-react";
const WhatsAppButton = () => {
  return (
    <div className="floating-container">

      {/* WhatsApp - TOP */}
      <a
        href="https://wa.me/+919743346989"
        className="floating-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </a>

      {/* Call - BELOW */}
      <a href="tel:+918970019817" className="floating-btn call-btn">
     {/* <PhoneCall /> */}
     <PhoneCall color="white" />
      </a>
{/* <PhoneCall /> */}
    </div>
  );
};

export default WhatsAppButton;
