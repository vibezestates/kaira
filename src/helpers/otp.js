// src/helpers/otp.js

export const sendOtp = async (phone) => {
  const res = await fetch("http://93.127.195.157/api/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });

  return await res.json();
};

export const verifyOtp = async (phone, otp) => {
  const res = await fetch("http://93.127.195.157/api/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp }),
  });

  return await res.json();
};

export const saveLead = async (data) => {
  try {
    const response = await fetch("http://93.127.195.157/api/save-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (err) {
    console.error("Error sending lead:", err);
    return { success: false, message: err.message };
  }
};
