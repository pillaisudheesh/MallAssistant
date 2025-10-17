import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store";
import Logo from "./Logo";

const Header = ({ title, showLogout = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#2D046E]/80 backdrop-blur-2xl shadow-md">
     <Logo />
    {showLogout && (
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-[#9B5DE5] hover:bg-[#8C4DE0] text-[#FFFFFF] rounded-lg font-semibold"
      >
        Logout
      </button>
    )}
  </header>
  );
};

export default Header;
