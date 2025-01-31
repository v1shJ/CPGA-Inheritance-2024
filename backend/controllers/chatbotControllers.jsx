const axios = require("axios");
require("dotenv").config({ path: "../.env" });

const API_KEY = process.env.TOGETHER_AI_KEY;
const API_URL = "https://api.together.xyz/v1/chat/completions";

const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    const response = await axios.post(
      API_URL,
      {
        model: "meta-llama/Llama-2-7b-chat-hf", // Change model if needed
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let botReply = response.data.choices[0].message.content;

    // Basic formatting (e.g., line breaks)
    botReply = botReply.replace(/\n/g, "<br>"); // Convert newlines to HTML <br> for frontend rendering

    return res.json({ reply: botReply });
  } catch (error) {
    console.error("Error in chatWithBot:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to fetch bot response. Please try again later.",
    });
  }
};

module.exports = { chatWithBot };
