const OpenAI = require("openai/index.mjs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function openaiResponse(req, res) {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant. You are assisting a user with a question and should respond in a helpful and concise manner using less than 100 words."},
        {"role": "user", "content": req.body.selectedPrompt}],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  res.json({ response: completion.choices[0].message.content });
}

// async function openaiResponse(req, res) {
//   // wait 4 seconds
//   await new Promise(resolve => setTimeout(resolve, 4000));
//   res.json({ response: "A response" });
// }

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function googleResponse(req, res) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const result = await model.generateContent("Answer the following question in less than 100 words for a research project: " + req.body.selectedPrompt);
  const response = await result.response;
  const text = response.text();

  console.log(text);
  res.json({ response: text });
}

module.exports = {openaiResponse, googleResponse};