// Configuração CORRETA da API (versão atualizada)
const openai = new OpenAI({
  apiKey: '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', // Substitua pela sua chave real
  dangerouslyAllowBrowser: true // Apenas para desenvolvimento
});

// Função modificada para melhor tratamento de erros
export async function getAIResponse(userMessage, conversationHistory) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5", // Modelo mais novo e econômico
      messages: [
        {
          role: "system",
          content: `Você é um consultor especializado em teclados musicais. Siga estas regras:
                1. SEMPRE sugira modelos específicos baseados nestes dados: ${JSON.stringify(tecladosData)}
                2. Compare recursos técnicos quando relevante
                3. Dê 3 opções em diferentes faixas de preço
                4. Formate respostas com markdown (negrito, listas)
                5. Exemplo de resposta:` // Insira seus dados aqui
        },
        ...conversationHistory,
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500,
      stream: false // Desative streaming para simplificar
    });

    return completion.choices[0].message.content;
    
  } catch (error) {
    console.error("Erro detalhado:", error.response?.data || error.message);
    return "❌ Erro ao acessar o assistente. Recarregue a página ou tente mais tarde.";
  }
}