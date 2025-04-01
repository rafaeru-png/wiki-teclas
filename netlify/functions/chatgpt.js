import fetch from 'node-fetch';

export async function handler(event) {
    try {
        console.log("🔹 Variável de ambiente (API Key):", process.env.HUGGINGFACE_API_KEY ? "Definida" : "Não definida");

        const { input } = JSON.parse(event.body);
        
        const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: input })
        });

        const data = await response.json();
        console.log("🔹 Resposta da API (bruta):", JSON.stringify(data));

        return {
            statusCode: 200,
            body: JSON.stringify({ response: data }),
        };
    } catch (error) {
        console.error("❌ Erro na função:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erro ao acessar a API." }),
        };
    }
}
