import { ReactNode, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface SlideProps {
  children: ReactNode;
  slideNumber: number;
  totalSlides: number;
  isActive: boolean;
  title?: string;
  className?: string;
}

export const Slide = ({ 
  children, 
  slideNumber, 
  totalSlides, 
  isActive, 
  title,
  className = "" 
}: SlideProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isActive, hasAnimated]);

  return (
    <div 
      ref={slideRef}
      className={`
        min-h-screen w-full flex flex-col items-center justify-center p-8
        relative overflow-hidden
        ${className}
      `}
    >
      {/* Slide Number Badge */}
      <div className="absolute top-8 right-8 z-10">
        <div className="bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-elegant border border-border">
          <span className="text-sm font-medium text-muted-foreground">
            {slideNumber}/{totalSlides}
          </span>
        </div>
      </div>

      {/* Main Content Card */}
      <Card 
        className={`
          w-full max-w-4xl bg-card/80 backdrop-blur-sm shadow-deep border-border
          relative overflow-hidden
          ${isActive && hasAnimated ? 'animate-slide-up' : 'opacity-0 translate-y-8'}
          transition-all duration-700 ease-out
        `}
      >
        {/* Gradient Border Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
        
        {/* Content */}
        <div className="p-8 md:p-12">
          {title && (
            <h1 className={`
              text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center
              text-gradient-primary
              ${isActive && hasAnimated ? 'animate-slide-up delay-200' : 'opacity-0'}
            `}>
              {title}
            </h1>
          )}
          
          <div className={`
            ${isActive && hasAnimated ? 'animate-slide-up delay-300' : 'opacity-0'}
          `}>
            {children}
          </div>
        </div>
      </Card>

      {/* Background Elements for this slide */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs specific to slide */}
        <div 
          className="absolute w-32 h-32 bg-primary/10 rounded-full animate-float blur-xl"
          style={{ 
            top: '20%', 
            left: '10%',
            animationDelay: `${slideNumber * 0.5}s`
          }}
        />
        <div 
          className="absolute w-24 h-24 bg-accent/10 rounded-full animate-float blur-xl"
          style={{ 
            top: '60%', 
            right: '15%',
            animationDelay: `${slideNumber * 0.5 + 2}s`
          }}
        />
      </div>
    </div>
  );
};