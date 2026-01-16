import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Sparkles, Grid3x3, Zap } from "lucide-react";

const CANVAS_SIZES = [
  { size: 8, label: "8×8", description: "Tiny" },
  { size: 16, label: "16×16", description: "Small" },
  { size: 32, label: "32×32", description: "Medium" },
  { size: 64, label: "64×64", description: "Large" },
  { size: 128, label: "128×128", description: "XL" },
  { size: 256, label: "256×256", description: "XXL" },
];

export default function WelcomePage() {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(32);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartDrawing = () => {
    setIsAnimating(true);
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
      <div className="relative flex-1 flex items-center justify-center p-3 sm:p-6 xl:p-8 py-6 sm:py-8">
        <div className="w-full max-w-4xl space-y-6 sm:space-y-8 animate-fade-in">
          {/* Hero Section */}
          <div className="text-center space-y-3 sm:space-y-4 animate-slide-down">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
                <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 xl:w-20 xl:h-20 bg-primary text-primary-foreground pixel-border-primary shadow-pixel animate-bounce-slow">
                  <Palette className="h-7 w-7 sm:h-8 sm:w-8 xl:h-10 xl:w-10" />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl max-sm:text-2xl sm:text-5xl xl:text-7xl font-pixel pixel-heading text-primary animate-pixel-glow px-2">
              PIXEL ART PRO
            </h1>
            
            <p className="text-base max-sm:text-sm sm:text-lg xl:text-xl text-muted-foreground font-retro max-w-2xl mx-auto animate-fade-in-delay px-4">
              Create stunning pixel art with professional tools and effects
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-3 sm:pt-4 animate-fade-in-delay-2 px-2">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card border-2 border-border rounded-full pixel-card-sm shadow-sm">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm font-retro">Layers</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card border-2 border-border rounded-full pixel-card-sm shadow-sm">
                <Grid3x3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm font-retro">Blend Modes</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card border-2 border-border rounded-full pixel-card-sm shadow-sm">
                <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm font-retro">Advanced Tools</span>
              </div>
            </div>
          </div>

          {/* Canvas Size Selection */}
          <Card className="pixel-card border-4 border-border shadow-pixel animate-slide-up">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <CardTitle className="font-pixel text-xl max-sm:text-lg sm:text-2xl text-primary">CHOOSE CANVAS SIZE</CardTitle>
              <CardDescription className="font-retro text-sm sm:text-base pt-1">
                Select your canvas dimensions to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 sm:space-y-6">
              {/* Size Grid - Mobile Optimized */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3">
                {CANVAS_SIZES.map((option) => (
                  <button
                    key={option.size}
                    onClick={() => setSelectedSize(option.size)}
                    className={`
                      relative group p-3 sm:p-4 rounded-lg border-2 transition-all duration-200
                      min-h-[72px] sm:min-h-[80px]
                      active:scale-95
                      ${
                        selectedSize === option.size
                          ? "border-primary bg-primary/10 shadow-lg scale-105"
                          : "border-border bg-card hover:border-primary/50 hover:bg-primary/5 active:bg-primary/10"
                      }
                    `}
                  >
                    <div className="text-center space-y-0.5 sm:space-y-1">
                      <div className="font-pixel text-base sm:text-lg text-primary">
                        {option.label}
                      </div>
                      <div className="text-xs text-muted-foreground font-retro">
                        {option.description}
                      </div>
                    </div>
                    {selectedSize === option.size && (
                      <div className="absolute inset-0 border-2 border-primary rounded-lg animate-pulse pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>

              {/* Start Button - Mobile Optimized */}
              <div className="flex flex-col items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
                <Button
                  onClick={handleStartDrawing}
                  disabled={isAnimating}
                  size="lg"
                  className={`
                    w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 
                    text-base sm:text-lg font-pixel
                    pixel-button shadow-pixel hover:shadow-pixel-lg
                    transition-all duration-200
                    min-h-[56px] sm:min-h-[64px]
                    active:scale-95
                    ${isAnimating ? "animate-pulse" : "animate-bounce-subtle"}
                  `}
                >
                  <Palette className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  START DRAWING
                </Button>
                <p className="text-xs sm:text-sm text-muted-foreground font-retro">
                  Selected: <span className="text-primary font-bold">{selectedSize}×{selectedSize}</span> pixels
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer Info - Mobile Optimized */}
          <div className="text-center text-xs sm:text-sm text-muted-foreground font-retro animate-fade-in-delay-3 px-4 pb-4 sm:pb-0">
            <p className="max-sm:leading-relaxed">✨ Professional pixel art editor with layers, blend modes, and advanced tools</p>
          </div>
        </div>
      </div>
    </div>
  );
}
