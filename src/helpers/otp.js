// src/helpers/otp.js

export const sendOtp = async (phoneNumber) => {
  const payload = { phone: phoneNumber };
  const res = await fetch("https://kairaestateplots.com/api/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return await res.json();
};

export const verifyOtp = async (phoneNumber, otp) => {
  const res = await fetch("https://kairaestateplots.com/api/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone:phoneNumber, otp: otp }),
  });

  return await res.json();
};

export const saveLead = async (data) => {
  try {
    const response = await fetch("https://kairaestateplots.com/api/save-lead", {
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
