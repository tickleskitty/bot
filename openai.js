const { ChatGPT } = require("openai");
const chatGPT = new ChatGPT("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");

async function generateChatResponse(message) {
  try {
    const response = await chatGPT.sendMessage(message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "An error occurred while generating a response.";
  }
}

module.exports = {
  generateChatResponse,
};