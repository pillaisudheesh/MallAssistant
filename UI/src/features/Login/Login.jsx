import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm";
import loginService from "../../services/auth.service";
import { authActions } from "../../store";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (userData) => {
    const data = await loginService.login(userData);
    dispatch(authActions.setCredentials({ token: data.access_token, user: data.user }));
    navigate("/chatbot");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
