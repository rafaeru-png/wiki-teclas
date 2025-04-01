const fetch = require('node-fetch');

exports.handler = async (event) => {
    try {
        const { question } = JSON.parse(event.body);
        if (!question) {
            return { statusCode: 400, body: JSON.stringify({ error: "Pergunta não fornecida." }) };
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: question }]
            })
        });

        const data = await response.json();

        console.log("🔹 API Response:", data); // Logando a resposta no console para debugging

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data.error || "Erro desconhecido." })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: data.choices[0].message.content })
        };
    } catch (error) {
        console.error("❌ Erro na função:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Erro interno no servidor." }) };
    }
};
