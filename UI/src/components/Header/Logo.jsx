import React from "react";

const Logo = ({ size = 40 }) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Icon: stylized M + chat bubble */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#9B5DE5] to-[#F15BB5]"
      >
        <span className="text-white font-bold text-lg select-none">M</span>
      </div>

      {/* Text */}
      <span className="text-white font-bold text-2xl tracking-wide select-none">
        MallMate
      </span>
    </div>
  );
};

export default Logo;
