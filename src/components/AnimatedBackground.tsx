import { useEffect, useRef } from "react";

interface BackgroundOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

export const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const orbs: BackgroundOrb[] = [
    { id: 1, x: 10, y: 10, size: 300, color: "primary", delay: 0 },
    { id: 2, x: 70, y: 20, size: 200, color: "accent", delay: 5 },
    { id: 3, x: 20, y: 70, size: 250, color: "primary-glow", delay: 10 },
    { id: 4, x: 80, y: 80, size: 180, color: "accent", delay: 15 },
    { id: 5, x: 50, y: 10, size: 120, color: "primary", delay: 8 },
    { id: 6, x: 10, y: 50, size: 150, color: "accent", delay: 12 },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add floating particles effect
    const particles: HTMLDivElement[] = [];
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-primary/20 rounded-full animate-float';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 6}s`;
      particle.style.animationDuration = `${6 + Math.random() * 4}s`;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-darker-bg via-background to-darker-bg opacity-95" />
      
      {/* Animated Orbs */}
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className={`absolute rounded-full animate-bg-orb opacity-10 blur-3xl`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `hsl(var(--${orb.color}))`,
            animationDelay: `${orb.delay}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-darker-bg/50" />
    </div>
  );
};