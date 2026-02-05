import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './features/Login/Login';
import Signup from './features/Login/Signup';
import Chatbot from './components/Chatbot/Chatbot';
import Promo from './features/Login/Promo/Promo';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/promo" element={<Promo />} />
      <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
      <Route path="*" element={<Promo />} />
    </Routes>
  </Router>
  );
}

export default App;