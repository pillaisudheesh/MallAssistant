import React,{useRef} from 'react';
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import { Sparkles, QrCode } from "lucide-react";

const QRCode = ({ url, size = 220 }) => {
    const finalUrl = url || `${window.location.origin}/mallmate`;
  const canvasRef = useRef(null);

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const png = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = png;
    a.download = "mallmate-qr.png";
    a.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* background blur circles */}
      <div className="absolute w-[600px] h-[600px] bg-pink-400/20 rounded-full blur-3xl top-[-200px] left-[-200px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-400/30 rounded-full blur-3xl bottom-[-150px] right-[-150px]" />

      {/* main card */}
      <motion.div
        className="relative z-10 flex flex-col items-center bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-sm w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <Sparkles className="text-yellow-300 w-10 h-10 mb-3" />
        </motion.div>

        <h1 className="text-3xl font-extrabold text-white mb-2 drop-shadow-lg tracking-wide">
          Mall Mate
        </h1>
        <p className="text-sm text-pink-100 mb-6">
          Your Smart Mall Assistant — Scan & Chat Instantly!
        </p>

        {/* QR Code container */}
        <div
          ref={canvasRef}
          className="bg-white p-4 rounded-2xl shadow-lg relative"
        >
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-pink-400 animate-pulse pointer-events-none"
            style={{ mixBlendMode: "overlay" }}
          />
          <QRCodeCanvas
            value={finalUrl}
            size={size}
            includeMargin={true}
            level="H"
            renderAs="canvas"
            className="mx-auto"
          />
        </div>

        <p className="mt-6 text-base text-center text-white/90">
          <span className="font-semibold">Scan with your phone</span> to start chatting with Mall Mate.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Download QR
          </button>

          <a
            href={finalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 px-5 py-2 rounded-xl text-sm font-semibold text-white/90 hover:bg-white/20 transition-colors duration-200"
          >
            Open Chat
          </a>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-white/70">
          <QrCode className="w-4 h-4" />
          <span>Connect. Explore. Shop Smart 🛍️</span>
        </div>
      </motion.div>

      {/* floating sparkles */}
      <motion.div
        className="absolute bottom-10 text-white/80 text-sm"
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        ✨ New Offers Unlock When You Scan!
      </motion.div>
    </div>
  );
}

export default QRCode
