const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "mistral/mistral-7b-instruct";

app.post("/chat", async (req, res) => {
  const { user, message } = req.body;
  try {
    const r = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      { model: MODEL, messages: [
        { role: "system", content: "Ты — Меган из фильма M3GAN." },
        { role: "user", content: ${user}: ${message} }
      ]},
      { headers: {
        "Authorization": Bearer ${OPENROUTER_API_KEY},
        "Content-Type": "application/json"
      }}
    );
    res.json({ reply: r.data.choices[0].message.content });
  } catch (e) {
    console.error(e.response?.data || e.message);
    res.status(500).json({ reply: "Ошибка ИИ." });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server up"));