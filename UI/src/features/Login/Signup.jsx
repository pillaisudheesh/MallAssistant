import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm";
import loginService from "../../services/auth.service";
import { authActions } from "../../store";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignup = async (formData) => {
    try {
      const data = await loginService.signup(formData); 
      // Auto-login after signup
      dispatch(
        authActions.setCredentials({
          token: null, // backend currently does not return token on signup
          user: data.name,
        })
      );
      // Navigate to login page
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
};

export default Signup;
