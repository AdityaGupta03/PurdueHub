const OpenAI = require("openai");

let loadedModel = false;
let openai;

async function chatAPI(req, res) {
    console.log("[INFO] Asking chatgpt a question.");

    if (!loadedModel) {
        openai = new OpenAI({
            apiKey: process.env.OPENAI_KEY,
        });
        loadedModel = true;
    }

    const { user_statement } = req.body;
    if (!user_statement) {
        return res.status(400).json({ error: "Missing user statement field." });
    }

    const chatResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: user_statement }],
    });

    if (!chatResponse.choices[0].message) {
        return res.status(500).json({ error: "Internal Server Error!" });
    }

    console.log(chatResponse.choices[0].message);
    return res.status(200).json({ message: chatResponse.choices[0].message });
}

module.exports = {
    chatAPI,
};