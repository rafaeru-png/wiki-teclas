import fetch from 'node-fetch';

exports.handler = async (event) => {
    try {
        const { question } = JSON.parse(event.body);

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Chave da API não configurada." }),
            };
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: question }],
            }),
        });

        const data = await response.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ response: data.choices[0].message.content }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erro ao acessar a API." }),
        };
    }
};
