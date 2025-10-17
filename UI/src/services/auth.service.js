import apiClient from "./apiClient";


class LoginService {
    signup = async (userData) => {
        console.log(apiClient);
        const response = await apiClient.post("/auth/signup", userData);
        return response.data;
      };
    
      login = async (userData) => {
        const response = await apiClient.post("/auth/login", userData);
        return response.data; // contains { access_token, token_type, user }
      };
}
const loginService = new LoginService();
export default loginService;