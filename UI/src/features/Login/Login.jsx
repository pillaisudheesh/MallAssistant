import React,{useState} from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthForm from "../../components/Auth/AuthForm";
import loginService from "../../services/auth.service";
import { authActions } from "../../store";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogin = async (userData) => {
    try {
      const data = await loginService.login(userData);
      dispatch(authActions.setCredentials({ token: data.access_token, user: data.user }));
      navigate("/chatbot");
    } catch (err) {
      console.error("Auth Error:", err);
      setError("😅 Oops! Invalid email or password. Please try again.");
      // if (type === "login")
      //   setError("😅 Oops! Invalid email or password. Please try again.");
      // else
      //   setError("⚠️ Unable to sign up. This email may already be registered.");
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Friendly Error Message */}
      
      <AuthForm type="login" onSubmit={handleLogin} error={error} />
      
    </div>
  );
};

export default Login;
