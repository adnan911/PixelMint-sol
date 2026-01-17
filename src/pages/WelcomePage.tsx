import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Palette, Sparkles, Grid3x3, Zap } from "lucide-react";

const CANVAS_SIZES = [
  { size: 16, label: "16×16", description: "Small" },
  { size: 64, label: "64×64", description: "Large" },
  { size: 128, label: "128×128", description: "XL" },
  { size: 256, label: "256×256", description: "XXL" },
];

export default function WelcomePage() {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(64);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSizeDialog, setShowSizeDialog] = useState(false);

  const handleStartDrawing = () => {
    setShowSizeDialog(true);
  };

  const handleSizeConfirm = () => {
    setIsAnimating(true);
    setShowSizeDialog(false);
    setTimeout(() => {
      navigate(`/editor?size=${selectedSize}`);
    }, 300);
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
                <div className="relative flex items-center justify-center w-auto h-16 sm:h-20 xl:h-24 animate-bounce-slow">
                  <img
                    src="/images/logo/pixel-mint-logo.png"
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
              Create stunning pixel art with professional tools and effects
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4 sm:pt-6 animate-fade-in-delay-2 px-2">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-card border-2 border-border rounded-full pixel-card-sm shadow-sm">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
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

            {/* Start Button */}
            <div className="flex flex-col items-center gap-4 pt-8 sm:pt-12 animate-fade-in-delay-3">
              <Button
                onClick={handleStartDrawing}
                disabled={isAnimating}
                size="lg"
                className={`
                  w-full max-w-xs sm:w-auto px-8 sm:px-16 py-6 sm:py-8 
                  text-lg sm:text-xl font-pixel
                  pixel-button shadow-pixel hover:shadow-pixel-lg
                  transition-all duration-200
                  min-h-[60px] sm:min-h-[72px]
                  active:scale-95 touch-manipulation
                  ${isAnimating ? "animate-pulse" : "animate-bounce-subtle"}
                `}
              >
                <Palette className="mr-3 h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0" />
                <span className="whitespace-nowrap">START DRAWING</span>
              </Button>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center text-sm sm:text-base text-muted-foreground font-retro animate-fade-in-delay-3 px-4 pb-6 sm:pb-2">
            <p className="leading-relaxed text-[#131213] bg-[#8db9d800] bg-none">{"MINT YOUR PIXEL ART"}</p>
          </div>
        </div>
      </div>
      {/* Canvas Size Selection Dialog */}
      <Dialog open={showSizeDialog} onOpenChange={setShowSizeDialog}>
        <DialogContent className="pixel-card shadow-pixel max-w-sm mx-5 border-[5px] border-solid border-[rgb(20,20,82)] ml-[0px] mr-[0px]">
          <DialogHeader>
            <DialogTitle className="font-pixel text-base sm:text-lg text-primary text-center leading-tight">
              CHOOSE CANVAS SIZE
            </DialogTitle>

          </DialogHeader>

          <div className="space-y-2 pt-1">
            {/* Size Grid */}
            <div className="grid grid-cols-2 gap-2">
              {CANVAS_SIZES.map((option) => (
                <button
                  key={option.size}
                  onClick={() => setSelectedSize(option.size)}
                  className={`
                    relative group p-2 rounded-md border-2 transition-all duration-200
                    min-h-[50px]
                    active:scale-95 touch-manipulation
                    ${selectedSize === option.size
                      ? "border-primary bg-primary/10 shadow-lg scale-105"
                      : "border-border bg-card hover:border-primary/50 hover:bg-primary/5 active:bg-primary/10"
                    }
                  `}
                >
                  <div className="text-center space-y-0.5">
                    <div className="font-pixel text-sm text-primary leading-tight">
                      {option.label}
                    </div>
                    <div className="text-xs text-muted-foreground font-retro leading-tight">
                      {option.description}
                    </div>
                  </div>
                  {selectedSize === option.size && (
                    <div className="absolute inset-0 border-2 border-primary rounded-md animate-pulse pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

            {/* Confirm Button */}
            <div className="flex items-center justify-center pt-1">
              <Button
                onClick={handleSizeConfirm}
                size="sm"
                className="w-full px-6 py-3 text-sm font-pixel pixel-button shadow-pixel hover:shadow-pixel-lg min-h-[40px] active:scale-95 touch-manipulation"
              >
                <Palette className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                <span className="whitespace-nowrap">CONFIRM & START</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
