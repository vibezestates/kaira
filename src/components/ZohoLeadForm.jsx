import React from "react";
import { useForm } from "react-hook-form";

export default function ZohoLeadForm({ isDesktopOnly = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = () => {
    document.getElementById("zohoLeadForm").submit();
  };

  return (
    <div className="flex flex-col mt-2 align-center md:flex-row bg-[#70252599] max-w-[90vw] mx-auto rounded-3xl">
      <div className="w-full p-3 sm:p-10 md:p-6 flex flex-col justify-center">
        <form
          id="zohoLeadForm"
          action="https://crm.zoho.com/crm/WebToLeadForm"
          method="POST"
          acceptCharset="UTF-8"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
        >
          {/* ---------------- ZOHO HIDDEN FIELDS ---------------- */}
          <input
            type="hidden"
            name="xnQsjsdp"
            value="89a2bdcd109eaed1e2c7332b3851282e2f40ae7f1d89f310fc95bc3ace3f37cd"
          />
          <input type="hidden" name="zc_gad" />
          <input
            type="hidden"
            name="xmIwtLD"
            value="b5d7d760a27fc48a1b4491b53429c80cb636e433f0b8832516d82590010cf95af5ec3e1d95d86c3aad330a9701143ceb"
          />
          <input type="hidden" name="actionType" value="TGVhZHM=" />
          <input
            type="hidden"
            name="returnURL"
            value="https://www.kairaestateplots.com/thank-you"
          />
          <input type="hidden" name="aG9uZXlwb3Q" />

        <div
  className={`grid gap-4 ${
    isDesktopOnly ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"
  }`}
>
            {/* NAME */}
            <div className="flex flex-col items-start">
              <label className="text-white pl-2 pb-2 font-primary pt-5">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your Name"
                {...register("Last Name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                })}
                className="p-3 w-full bg-white text-lg outline-none rounded-3xl placeholder:text-stone-400"
              />
              {errors["Last Name"] && (
                <p className="text-red-300 text-sm mt-1">
                  {errors["Last Name"].message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="flex flex-col items-start">
              <label className="text-white pl-2 pb-2 font-primary pt-5">
                Your Email ID
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email",
                  },
                })}
                className="p-3 w-full bg-white text-lg outline-none rounded-3xl placeholder:text-stone-400"
              />
              {errors.Email && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.Email.message}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div className="flex flex-col items-start">
              <label className="text-white pl-2 pb-2 font-primary pt-5">
                Your Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                {...register("Phone", {
                  required: "Phone number required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter 10 digit number",
                  },
                })}
                className="p-3 w-full bg-white text-lg outline-none rounded-3xl placeholder:text-stone-400"
              />
              {errors.Phone && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.Phone.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-lg sm:text-xl rounded-full px-8 py-4 font-secondary mt-6 cursor-pointer bg-[#104d39] text-white hover:bg-[#c08b5d] transition-all duration-300 w-full md:w-auto disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit your response"}
          </button>
        </form>

        <script
          type="text/javascript"
          src="https://crm.zoho.com/crm/javascript/zcga.js"
        ></script>
      </div>
    </div>
  );
}
