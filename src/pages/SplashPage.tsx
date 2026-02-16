import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SplashPage() {
  const navigate = useNavigate();
  const [currentTheme] = useState(() => {
    return localStorage.getItem("theme") || "retro";
  });

  useEffect(() => {
    // Apply theme immediately
    document.documentElement.setAttribute("data-theme", currentTheme);
    
    // Redirect after 2.5 seconds
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  const getThemeLogo = () => {
    switch (currentTheme) {
      case "candy":
        return "/images/logo/pixel-mint-logo-candy.png";
      case "coffee":
        return "/images/logo/pixel-mint-logo-coffee.png";
      default:
        return "/images/logo/pixel-mint-logo.png";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:32px_32px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center animate-fade-in">
        {/* Animated Logo Container */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse rounded-full" />
          <img
            src={getThemeLogo()}
            alt="Pixel Mint"
            className="w-32 h-32 sm:w-48 sm:h-48 object-contain relative z-10 animate-bounce-slow"
          />
        </motion.div>

        {/* Title with Typing Effect or Fade In */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl sm:text-6xl font-pixel pixel-heading text-primary tracking-widest text-center"
          style={{ textShadow: "4px 4px 0px #000000" }}
        >
          PIXEL MINT
        </motion.h1>

        {/* Loading Indicator / Progress */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
          className="h-2 bg-primary mt-8 rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"
        />
        
        <p className="mt-4 text-muted-foreground font-retro text-sm animate-pulse">
          LOADING...
        </p>
      </div>
    </div>
  );
}
