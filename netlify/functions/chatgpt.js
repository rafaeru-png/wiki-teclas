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

        // Verifica se a resposta está vazia ou inválida antes de tentar converter para JSON
        const text = await response.text();
        console.log("🔹 Resposta da API (bruta):", text);

        if (!text) {
            return { statusCode: 500, body: JSON.stringify({ error: "Resposta vazia da API." }) };
        }

        let data;
        try {
            data = JSON.parse(text);
        } catch (jsonError) {
            console.error("❌ Erro ao converter resposta para JSON:", jsonError);
            return { statusCode: 500, body: JSON.stringify({ error: "Erro ao processar resposta da API." }) };
        }

        // Verifica se há um erro explícito da OpenAI
        if (data.error) {
            return { statusCode: 500, body: JSON.stringify({ error: data.error.message || "Erro desconhecido da API." }) };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: data.choices[0]?.message?.content || "Sem resposta da OpenAI." })
        };
    } catch (error) {
        console.error("❌ Erro na função:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Erro interno no servidor." }) };
    }
};
