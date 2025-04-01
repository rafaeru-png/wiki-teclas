document.addEventListener('DOMContentLoaded', () => {
    // Elementos DOM
    const startChatBtn = document.getElementById('startChatBtn');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');

    // Histórico da conversa
    let conversationHistory = [];

    // Iniciar chat
    startChatBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
        addBotMessage("Olá! Sou o assistente Tecladista AI. Posso te ajudar a encontrar o teclado perfeito. Me conte: qual será o principal uso do teclado? (estúdio, palco, produção ou prática)");
    });

    // Fechar chat
    closeChatBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });

    // Enviar mensagem
    function handleSendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            
            // Mostrar indicador de digitação
            const typingIndicator = addTypingIndicator();
            
            // Obter resposta da IA
            getAIResponse(message).then(response => {
                typingIndicator.remove();
                addBotMessage(response);
            });
        }
    }

    // Event listeners
    sendMessageBtn.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    // Funções auxiliares
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Adicionar ao histórico
        conversationHistory.push({ role: "user", content: text });
    }

    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Adicionar ao histórico
        conversationHistory.push({ role: "assistant", content: text });
    }

    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing';
        typingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }
});

// Função para integrar com chatgpt.js
async function getAIResponse(userMessage) {
    // Implementação real estaria no chatgpt.js
    return "Esta é uma resposta simulada. Na implementação real, isso chamaria a API da OpenAI.";
}

// Variável para armazenar o histórico
let chatHistory = [];

async function sendMessage() {
  const userInput = document.getElementById('userInput').value;
  if (!userInput) return;

  // Adiciona mensagem do usuário
  chatHistory.push({ role: "user", content: userInput });
  updateChatUI();

  // Resposta do assistente
  const aiResponse = await getAIResponse(userInput, chatHistory);
  
  // Adiciona resposta ao histórico
  chatHistory.push({ role: "assistant", content: aiResponse });
  updateChatUI();
}

function updateChatUI() {
  const chatBox = document.getElementById('chatMessages');
  chatBox.innerHTML = chatHistory.map(msg => `
    <div class="message ${msg.role}">
      <p>${msg.content}</p>
    </div>
  `).join('');
  chatBox.scrollTop = chatBox.scrollHeight;
}