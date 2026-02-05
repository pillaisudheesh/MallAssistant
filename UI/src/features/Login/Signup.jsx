import React,{useState} from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm";
import loginService from "../../services/auth.service";
import { authActions } from "../../store";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
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
      setError("⚠️ Unable to sign up. This email may already be registered.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm type="signup" onSubmit={handleSignup} error={error} />
    </div>
  );
};

export default Signup;
