import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Palette, Layers, Grid3x3, Zap } from "lucide-react";

export default function WelcomePage() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("theme") || "retro";
  });

  // Apply theme on mount and change
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prev) => {
      if (prev === "coffee") return "retro";
      if (prev === "retro") return "candy";
      if (prev === "candy") return "dark";
      return "coffee";
    });
  };

  const getThemeLabel = () => {
    switch (currentTheme) {
      case "coffee":
        return "Theme: Coffee";
      case "retro":
        return "Theme: Based";
      case "candy":
        return "Theme: Candy";
      case "dark":
        return "Theme: Dark Coffee";
      default:
        // Handle legacy "default" case by mapping it to Based (the new default)
        return "Theme: Based";
    }
  };

  const getThemeLogo = () => {
    switch (currentTheme) {
      case "candy":
        return "/images/logo/pixel-mint-logo-candy.png";
      case "coffee":
      case "dark":
        return "/images/logo/pixel-mint-logo-coffee.png";
      default:
        // Based/Retro logic (and legacy fallback)
        return "/images/logo/pixel-mint-logo.png";
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-auto bg-gradient-to-br from-primary/10 via-background to-secondary/10 animate-gradient">


      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:32px_32px] animate-pulse" />
      </div>
      {/* Main Content */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-6 xl:px-8 py-6 sm:py-8">
        <div className="w-full max-w-4xl space-y-8 sm:space-y-12 animate-fade-in">
          {/* Hero Section */}
          <div className="text-center space-y-4 sm:space-y-6 animate-slide-down">
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
                <div className="relative flex items-center justify-center w-auto h-40 sm:h-60 xl:h-80 animate-bounce-slow">
                  <img
                    src={getThemeLogo()}
                    alt="Pixel Mint Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <h1
              className="sm:text-6xl xl:text-7xl font-pixel pixel-heading text-primary px-2 text-[32px]"
              style={{
                textShadow: "4px 4px 0px #000000"
              }}
            >
              PIXEL MINT
            </h1>

            <p className="sm:text-lg xl:text-xl text-muted-foreground font-retro max-w-2xl mx-auto animate-fade-in-delay px-2 bg-[#8db9d800] bg-none text-[20px] border-solid border-[rgb(20,20,82)] border-[0px] border-[rgb(20,20,82)]">
              Create pixel art with professional tools
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4 sm:pt-6 animate-fade-in-delay-2 px-2">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-card border-2 border-border rounded-full pixel-card-sm shadow-sm">
                <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base font-retro whitespace-nowrap">Layers</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-card border-2 border-border rounded-full pixel-card-sm shadow-sm">
                <Grid3x3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base font-retro whitespace-nowrap">Blend Modes</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-card border-2 border-border rounded-full pixel-card-sm shadow-sm">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base font-retro whitespace-nowrap">Advanced Tools</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 pt-8 sm:pt-12 animate-fade-in-delay-3">
              <Link to="/home">
                <Button
                  size="lg"
                  className={`
                    w-full max-w-xs sm:w-auto px-8 sm:px-16 py-6 sm:py-8 
                    text-lg sm:text-xl font-pixel
                    pixel-button shadow-pixel hover:shadow-pixel-lg
                    transition-all duration-200
                    min-h-[60px] sm:min-h-[72px]
                    active:scale-95 touch-manipulation
                    animate-bounce-subtle
                  `}
                >
                  <Palette className="mr-3 h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0" />
                  <span className="whitespace-nowrap">GET STARTED</span>
                </Button>
              </Link>
            </div>

            {/* Theme Toggle (Moved) */}
            <div className="flex flex-col items-center gap-4 pt-4 animate-fade-in-delay-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="pixel-button font-retro text-xs sm:text-sm bg-card"
              >
                {getThemeLabel()}
              </Button>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center text-sm sm:text-base text-muted-foreground font-retro animate-fade-in-delay-3 px-4 pb-6 sm:pb-2">
            <p className="leading-relaxed text-[#131213] bg-[#8db9d800] bg-none">{"MINT YOUR PIXEL ART"}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
