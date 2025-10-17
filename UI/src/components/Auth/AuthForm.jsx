import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Social from "./Social";


const   AuthForm = ({ type = "login", onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleGoogle = () => alert("Google login clicked");
  const handleFacebook = () => alert("Facebook login clicked");

  const isLogin = type === "login";

  return (

    // <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden">
    //   {/* Background */}
    //   <div className="absolute inset-0 bg-primary" />

    //   <div className="absolute top-10 text-center z-10">
    //     <h1 className="text-4xl font-extrabold text-neutralText tracking-wide">MallMate</h1>
    //     <p className="mt-1 text-sm text-neutralText/70 italic">Your smart shopping companion</p>
    //   </div>

    //   <div className="relative z-10 w-full max-w-md px-8 py-10 bg-primary/20 backdrop-blur-3xl border border-accentGold/30 rounded-2xl shadow-lg text-neutralText">
    //     <h2 className="mb-6 text-2xl font-semibold text-center">
    //       {isLogin ? "Welcome Back 👋" : "Create an Account"}
    //     </h2>

    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       {!isLogin && (
    //         <input
    //           type="text"
    //           name="name"
    //           placeholder="Name"
    //           required
    //           value={formData.name}
    //           onChange={handleChange}
    //           className="w-full px-3 py-2 rounded-lg bg-neutralSecondary/50 border border-neutralSecondary/30 placeholder-primary text-primary focus:outline-none focus:ring-2 focus:ring-accentGold"
    //         />
    //       )}
    //       <input
    //         type="email"
    //         name="email"
    //         placeholder="Email"
    //         required
    //         value={formData.email}
    //         onChange={handleChange}
    //         className="w-full px-3 py-2 rounded-lg bg-neutralSecondary/50 border border-neutralSecondary/30 placeholder-primary text-primary focus:outline-none focus:ring-2 focus:ring-accentGold"
    //       />
    //       <input
    //         type="password"
    //         name="password"
    //         placeholder="Password"
    //         required
    //         value={formData.password}
    //         onChange={handleChange}
    //         className="w-full px-3 py-2 rounded-lg bg-neutralSecondary/50 border border-neutralSecondary/30 placeholder-primary text-primary focus:outline-none focus:ring-2 focus:ring-accentGold"
    //       />
    //       <button
    //         className="w-full py-2 bg-accentMerlot hover:bg-accentMerlot/90 text-neutralText font-semibold rounded-lg shadow"
    //       >
    //         {isLogin ? "Login" : "Sign Up"}
    //       </button>
    //     </form>

    //     <div className="flex items-center justify-center my-6">
    //       <div className="w-1/4 border-t border-neutralSecondary/50" />
    //       <span className="mx-3 text-sm text-neutralText/70">or</span>
    //       <div className="w-1/4 border-t border-neutralSecondary/50" />
    //     </div>

    //     {/* Social Login */}
    //     <Social
    //     onGoogleLogin={handleGoogle}
    //     onFacebookLogin={handleFacebook}
    //   />

    //     <p className="mt-6 text-sm text-center text-neutralText/70">
    //       {isLogin ? (
    //         <>
    //           Don’t have an account?{" "}
    //           <Link to="/signup" className="font-semibold hover:underline">Sign Up</Link>
    //         </>
    //       ) : (
    //         <>
    //           Already have an account?{" "}
    //           <Link to="/login" className="font-semibold hover:underline">Login</Link>
    //         </>
    //       )}
    //     </p>
    //   </div>
    // </div>
   
  //   <div className="relative w-screen h-screen">
  //   {/* Gradient Background */}
  //   <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1C] via-[#2C2C2C] to-[#4B4B4B] z-0" />

  //   {/* Centered Card */}
  //   <div className="relative z-10 flex items-center justify-center h-full">
  //     <div className="w-full max-w-md px-8 py-10 bg-[#1C1C1C]/20 backdrop-blur-3xl border border-[#D4AF37]/30 rounded-2xl shadow-lg text-[#FFFFFF]">
  //       <h2 className="mb-6 text-2xl font-semibold text-center">
  //         {isLogin ? "Welcome Back 👋" : "Create an Account"}
  //       </h2>

  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         {!isLogin && (
  //           <input
  //             type="text"
  //             name="name"
  //             placeholder="Name"
  //             required
  //             value={formData.name}
  //             onChange={handleChange}
  //             className="w-full px-3 py-2 rounded-lg bg-[#E8E3E3]/50 text-[#1C1C1C] placeholder-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
  //           />
  //         )}
  //         <input
  //           type="email"
  //           name="email"
  //           placeholder="Email"
  //           required
  //           value={formData.email}
  //           onChange={handleChange}
  //           className="w-full px-3 py-2 rounded-lg bg-[#E8E3E3]/50 text-[#1C1C1C] placeholder-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
  //         />
  //         <input
  //           type="password"
  //           name="password"
  //           placeholder="Password"
  //           required
  //           value={formData.password}
  //           onChange={handleChange}
  //           className="w-full px-3 py-2 rounded-lg bg-[#E8E3E3]/50 text-[#1C1C1C] placeholder-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
  //         />

  //         <button
  //           className="w-full py-2 bg-[#9E2A2B] hover:bg-[#7B2021] text-[#FFFFFF] font-semibold rounded-lg shadow"
  //         >
  //           {isLogin ? "Login" : "Sign Up"}
  //         </button>
  //       </form>

  //       <div className="flex items-center justify-center my-6">
  //         <div className="w-1/4 border-t border-[#E8E3E3]/50" />
  //         <span className="mx-3 text-sm text-[#FFFFFF]/70">or</span>
  //         <div className="w-1/4 border-t border-[#E8E3E3]/50" />
  //       </div>

  //       {/* <div className="flex flex-col space-y-3">
  //         <button className="flex items-center justify-center w-full py-2 bg-[#FFFFFF] rounded-lg text-[#1C1C1C] hover:bg-[#FFFFFF]/90">
  //           <FcGoogle className="mr-2 text-xl" /> Continue with Google
  //         </button>
  //         <button className="flex items-center justify-center w-full py-2 bg-[#D4AF37] rounded-lg text-[#1C1C1C] hover:bg-[#D4AF37]/90">
  //           <FaFacebook className="mr-2 text-xl" /> Continue with Facebook
  //         </button>
  //       </div> */}

  //    {/* Social Login */}
  //        <Social
  //        onGoogleLogin={handleGoogle}
  //        onFacebookLogin={handleFacebook}
  //      />

  //       <p className="mt-6 text-sm text-center text-[#FFFFFF]/70">
  //         {isLogin ? (
  //           <>
  //             Don’t have an account?{" "}
  //             <Link to="/signup" className="font-semibold hover:underline">Sign Up</Link>
  //           </>
  //         ) : (
  //           <>
  //             Already have an account?{" "}
  //             <Link to="/login" className="font-semibold hover:underline">Login</Link>
  //           </>
  //         )}
  //       </p>
  //     </div>
  //   </div>
  // </div>

  <div className="relative w-screen h-screen">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D046E] via-[#9B5DE5] to-[#F15BB5] z-0" />

      {/* Centered Card */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="w-full max-w-md px-8 py-10 bg-[#CDB4DB]/30 backdrop-blur-3xl border border-[#F15BB5]/50 rounded-2xl shadow-lg text-[#FFFFFF]">
          <h2 className="mb-6 text-2xl font-semibold text-center">
            {isLogin ? "Welcome Back 👋" : "Create an Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-[#CDB4DB]/50 text-[#2D046E] placeholder-[#2D046E] focus:outline-none focus:ring-2 focus:ring-[#F15BB5]"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#CDB4DB]/50 text-[#2D046E] placeholder-[#2D046E] focus:outline-none focus:ring-2 focus:ring-[#F15BB5]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#CDB4DB]/50 text-[#2D046E] placeholder-[#2D046E] focus:outline-none focus:ring-2 focus:ring-[#F15BB5]"
            />

            <button
              className="w-full py-2 bg-[#F15BB5] hover:bg-[#E13299] text-[#FFFFFF] font-semibold rounded-lg shadow"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center justify-center my-6">
            <div className="w-1/4 border-t border-[#FFFFFF]/50" />
            <span className="mx-3 text-sm text-[#FFFFFF]/70">or</span>
            <div className="w-1/4 border-t border-[#FFFFFF]/50" />
          </div>

              {/* Social Login */}
         <Social
         onGoogleLogin={handleGoogle}
         onFacebookLogin={handleFacebook}
       />

          <p className="mt-6 text-sm text-center text-[#FFFFFF]/70">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <Link to="/signup" className="font-semibold hover:underline">Sign Up</Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className="font-semibold hover:underline">Login</Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
 

  );
};

export default AuthForm;


