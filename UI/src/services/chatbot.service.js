import apiClient from "./apiClient";

class ChatbotService {
    askChatbot = async (query) => {
        const response = await apiClient.post("/chatbot/ask", query);
        return response.data; // contains { response: "..." }
      };
}
const chatbotService = new ChatbotService();
export default chatbotService;