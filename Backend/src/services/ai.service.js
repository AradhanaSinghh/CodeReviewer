const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateContent(prompt) {
    const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
    });

    return result.text;
}

module.exports = generateContent;