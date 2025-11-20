import { useState } from "react";
import image from "../assets/images/fromImage.webp";
import ModalBase from "./ModalBase";
import { sendOtp, verifyOtp, saveLead } from "../helpers/otp";

export default function Form({ isMobile }) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    console.log("gclid",gclid);
    
    setLoading(true);
    setMessage("");

    const data = new FormData(formElement);
    const name = data.get("name")?.trim();
    const email = data.get("email")?.trim();
    const phoneNumber = data.get("phoneNumber")?.trim();

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
    const payload = { name, email, phoneNumber, pageUrl, gclid };
    try {
      const otpRes = await sendOtp(phoneNumber);
      await saveLead(payload);
      
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
    <div>
      <div className="flex flex-col mt-2 align-center md:flex-row bg-[#70252599]  overflow-y-auto md:overflow-hidden max-w-[90vw] mx-auto rounded-3xl">
        {/* Right Form Section */}
        <div className="w-full   p-3 sm:p-10 md:p-6 flex flex-col justify-center">
          <form className="w-full" onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                {/* Horizontal Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Name */}
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="name"
                      className="flex text-center justify-center items-center gap-2 text-white pl-2 pb-2 font-primary pt-5"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="p-3 w-full bg-white text-lg sm:text-xl outline-none rounded-3xl placeholder:text-stone-400"
                      placeholder="Enter your Name"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="email"
                      className="flex text-center justify-center items-center gap-2 text-white pl-2 pb-2 font-primary pt-5"
                    >
                      Your Email ID
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="p-3 w-full bg-white text-lg sm:text-xl outline-none rounded-3xl placeholder:text-stone-400"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="phoneNumber"
                      className="flex text-center justify-center items-center gap-2 text-white pl-2 pb-2 font-primary pt-5"
                    >
                      Your Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      className="p-3 w-full bg-white text-lg sm:text-xl outline-none rounded-3xl placeholder:text-stone-400"
                    />
                  </div>
                </div>

                {/* Message */}
                {message && (
                  <p className="text-white text-sm mt-2">{message}</p>
                )}

                {/* Submit Button */}
                <button
                  className="text-lg sm:text-xl rounded-full px-8 py-4 font-secondary font-medium mt-6 cursor-pointer bg-[#104d39] text-white hover:bg-[#c08b5d] transition-all duration-300 w-full md:w-auto"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit your response"}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="text-center">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="p-3 mb-3 w-full d-block bg-white text-lg sm:text-xl outline-none rounded-3xl placeholder:text-stone-400"
                  required
                />
                {/* 8. Remove onClick, type='submit' is all that's needed */}
                <br></br>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 pt-2 py-3 bg-[#104d39] text-white rounded-full hover:bg-[#c08b5d] transition-all duration-300 cursor-pointer"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                {message && (
                  <p className="mt-2 text-sm text-white">{message}</p>
                )}
              </div>
            )}
          </form>
          {step === 3 && (
            <div className="text-center py-8">
              <h2 className="text-xl font-medium font-primary mt-2 text-sm text-white">
                {message}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
