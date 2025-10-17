import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Social = ({ onGoogleLogin, onFacebookLogin }) => {
    return (
        <div className="flex flex-col space-y-3">
      <button
        onClick={onGoogleLogin}
        className="flex items-center justify-center w-full py-2 bg-[#FFFFFF] rounded-lg text-[#2D046E] hover:bg-[#FFFFFF]/90"
      >
        <FcGoogle className="mr-2 text-xl" />
        Continue with Google
      </button>
      <button
        onClick={onFacebookLogin}
        className="flex items-center justify-center w-full py-2 bg-[#9B5DE5] rounded-lg text-[#FFFFFF] hover:bg-[#8C4DE0]"
      >
        <FaFacebook className="mr-2 text-xl" />
        Continue with Facebook
      </button>
    </div>
    );
}

export default Social
