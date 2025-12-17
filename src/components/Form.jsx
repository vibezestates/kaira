import { useState } from "react";
import image from "../assets/images/fromImage.webp";
import ModalBase from "./ModalBase";
import { sendOtp, verifyOtp, saveLead } from "../helpers/otp";
import { useNavigate } from 'react-router-dom'
import ZohoLeadForm from "./ZohoLeadForm";

export default function Form({ isFormOpen, isFormClose }) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (step === 1) {
      await submitAction(e.target);
    } else if (step === 2) {
      await verifyotp();
    }
  }

  async function submitAction(formElement) {
    const gclid = localStorage.getItem("gclid");
    console.log("GCid", gclid);
    
    setLoading(true);
    setMessage("");

    const data = new FormData(formElement);
    const name = data.get("name")?.trim();
    const email = data.get("email")?.trim();
    const phoneNumber = data.get("phoneNumber")?.trim();
    const lar_id  = "6957566000001883477";
    const errors = [];
    if (!name) errors.push("Name cannot be empty");
    if (!email.includes("@")) errors.push("Email is invalid");
    if (phoneNumber.length !== 10)
      errors.push("Phone number must be 10 digits");

    if (errors.length > 0) {
      setMessage(errors.join(", "));
      setLoading(false);
      return;
    }

    // Save all form data to state for later
    const pageUrl = window.location.href;
    setFormData({ name, email, phoneNumber, pageUrl });
    const payload = { name, email, phoneNumber, pageUrl,gclid, lar_id };
    await saveLead(payload);
    try {
     
      const otpRes = await sendOtp(phoneNumber);

      if (otpRes.status === "success") {
        setStep(2);
        setMessage("OTP sent successfully!");
      } else {
        setMessage(otpRes.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  // 5. verifyOtp now sends ALL data (from state) + the OTP
async function verifyotp() {
  setLoading(true);
  setMessage("");

  try {
    // Combine stored form data with the new OTP
    const payload = {
      ...formData, // { name, email, phoneNumber, pageUrl }
      otp: otp,
    };


   const result = await verifyOtp(formData.phoneNumber, otp);


    if (result?.description?.desc === "Code Matched successfully.") {
      setStep(3);
      navigate('/thank-you')
      setMessage("Thank you for your response! We will reach you soon.");
      // ✅ Fire GTM event
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "otpVerificationSuccess",
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        pageUrl: formData.pageUrl,
      });

    } else {
      setMessage(result.message || "Invalid OTP. Please try again.");
    }
  } catch (err) {
    console.error(err);
    setMessage("Something went wrong during verification.");
  } finally {
    setLoading(false);
  }
}


  return (
    <ModalBase isOpen={isFormOpen} onClose={isFormClose}>
      <div>
        <div className='flex flex-col align-center md:flex-row bg-light max-h-[75vh] overflow-y-auto md:overflow-hidden'>
          {/* Left Image Section */}
          <div className="w-full md:w-1/2 h-[400px] md:h-auto md:max-h-[60vh] hidden md:block">
            <img
              src={image}
              alt='Form illustration'
              className='w-full h-full object-cover'
              style={{    height: 'auto'}}
            />
          </div>

          {/* Right Form Section */}
          <div className='w-full md:w-1/2 bg-light p-6 sm:p-10 md:p-12 flex flex-col justify-center'>
       <ZohoLeadForm  isDesktopOnly={true}/>

          </div>
        </div>
      </div>
    </ModalBase>
  );
}
