import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Palette, Layers, Grid3x3, Zap, Image as ImageIcon } from "lucide-react";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [isSizeDialogOpen, setIsSizeDialogOpen] = useState(false);
  const [width, setWidth] = useState(64);
  const [height, setHeight] = useState(64);
  const [widthInput, setWidthInput] = useState("64");
  const [heightInput, setHeightInput] = useState("64");

  const handleStart = () => {
    navigate(`/editor?width=${width}&height=${height}`);
  };

  const handlePreset = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
    setWidthInput(w.toString());
    setHeightInput(h.toString());
  };

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
      if (prev === "retro") return "rust";
      if (prev === "rust") return "candy";
      return "coffee";
    });
  };

  const getThemeLabel = () => {
    switch (currentTheme) {
      case "coffee":
        return "Theme: Coffee";
      case "retro":
        return "Theme: Based";
      case "rust":
        return "Theme: Rust";
      case "candy":
        return "Theme: Candy";
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
        return "/images/logo/pixel-mint-logo-coffee.png";
      case "rust":
        // Fallback to default or candy? Default seems safer for now
        return "/images/logo/pixel-mint-logo.png";
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
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-card border-2 border-border rounded-full">
                <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base font-retro whitespace-nowrap">Layers</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-card border-2 border-border rounded-full">
                <Grid3x3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base font-retro whitespace-nowrap">Blend Modes</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-card border-2 border-border rounded-full">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base font-retro whitespace-nowrap">Advanced Tools</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 sm:pt-12 animate-fade-in-delay-3 px-4">
              <Button
                size="lg"
                onClick={() => setIsSizeDialogOpen(true)}
                className={`
                  w-full sm:w-auto px-8 sm:px-10 py-6 sm:py-8 
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

              <Link to="/home" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className={`
                  w-full sm:w-auto px-8 sm:px-10 py-6 sm:py-8 
                  text-lg sm:text-xl font-pixel
                  pixel-button shadow-pixel hover:shadow-pixel-lg
                  transition-all duration-200
                  min-h-[60px] sm:min-h-[72px]
                  active:scale-95 touch-manipulation
                  bg-card text-foreground
                `}
                >
                  <ImageIcon className="mr-3 h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0" />
                  <span className="whitespace-nowrap">MY CREATIONS</span>
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

            {/* Main Content Footer Removed - Moving to global footer */}
           </div>
       </div>

      {/* Global Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end text-[4px] text-muted-foreground font-retro z-10 pointer-events-none">
        <Link 
          to="/settings" 
          className="hover:text-primary transition-colors hover:underline flex items-center gap-2 pointer-events-auto opacity-70 hover:opacity-100"
        >
          <span>Legal information</span>
        </Link>

        <span className="opacity-50">
          © {new Date().getFullYear()} OnchainersLab
        </span>
      </div>


      <Dialog open={isSizeDialogOpen} onOpenChange={setIsSizeDialogOpen}>
        <DialogContent className="sm:max-w-[425px] pixel-card border-4 font-retro">
          <DialogHeader>
            <DialogTitle className="font-pixel text-primary text-xl text-center">CHOOSE CANVAS SIZE</DialogTitle>
            <DialogDescription className="font-retro text-base text-center">
              Select a preset or enter custom dimensions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Presets */}
            <div className="grid grid-cols-2 gap-3">
              {[16, 32, 64, 128].map((size) => (
                <Button
                  key={size}
                  variant={width === size && height === size ? "default" : "outline"}
                  onClick={() => handlePreset(size, size)}
                  className={`pixel-button font-retro h-12 text-lg ${width === size && height === size ? "bg-primary text-primary-foreground" : "bg-card"}`}
                >
                  {size} × {size}
                </Button>
              ))}
            </div>

            {/* Custom inputs */}
            <div className="flex gap-4 items-end">
               <div className="flex-1 space-y-2">
                 <Label htmlFor="width" className="font-pixel">WIDTH</Label>
                 <Input 
                   id="width"
                   type="number" 
                   value={widthInput}
                   onChange={(e) => {
                     setWidthInput(e.target.value);
                     const val = parseInt(e.target.value);
                     if (!isNaN(val)) setWidth(Math.min(256, Math.max(8, val)));
                   }}
                   className="pixel-inset font-retro text-lg"
                 />
               </div>
               <span className="pb-3 text-xl font-bold">×</span>
               <div className="flex-1 space-y-2">
                 <Label htmlFor="height" className="font-pixel">HEIGHT</Label>
                 <Input 
                   id="height"
                   type="number" 
                   value={heightInput}
                   onChange={(e) => {
                     setHeightInput(e.target.value);
                     const val = parseInt(e.target.value);
                     if (!isNaN(val)) setHeight(Math.min(256, Math.max(8, val)));
                   }}
                   className="pixel-inset font-retro text-lg"
                 />
               </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleStart} className="w-full pixel-button font-pixel text-lg py-6">
              START DRAWING
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
