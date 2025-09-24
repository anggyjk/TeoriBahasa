import { useEffect, useState } from "react";
import { User } from "lucide-react";

interface Player {
  id: number;
  name: string;
  nim: string;
  position: { x: number; y: number };
  role: string;
}

export const FutsalLineup = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const players: Player[] = [
    { 
      id: 1, 
      name: "Sadaika Nursadig", 
      nim: "202410370110398",
      position: { x: 50, y: 15 }, // Goalkeeper
      role: "Kiper" 
    },
    { 
      id: 2, 
      name: "Anggy Jogo Kurniawan", 
      nim: "202410370110389",
      position: { x: 25, y: 40 }, // Left Back
      role: "Bek Kiri" 
    },
    { 
      id: 3, 
      name: "Mario Maulana", 
      nim: "202410370110399",
      position: { x: 75, y: 40 }, // Right Back
      role: "Bek Kanan" 
    },
    { 
      id: 4, 
      name: "Muhammad Hafidzal Rahmadi", 
      nim: "202410370110392",
      position: { x: 35, y: 65 }, // Left Wing
      role: "Sayap Kiri" 
    },
    { 
      id: 5, 
      name: "Muhammad Aditya Wibawa", 
      nim: "202410370110407",
      position: { x: 65, y: 65 }, // Right Wing
      role: "Sayap Kanan" 
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Futsal Field */}
      <div className="relative w-full h-96 mx-auto bg-gradient-to-b from-green-600/20 to-green-800/20 rounded-lg border-2 border-green-500/30 overflow-hidden">
        {/* Field Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
          {/* Center Circle */}
          <circle 
            cx="200" 
            cy="150" 
            r="50" 
            fill="none" 
            stroke="rgba(255,255,255,0.3)" 
            strokeWidth="2"
          />
          <circle 
            cx="200" 
            cy="150" 
            r="2" 
            fill="rgba(255,255,255,0.5)"
          />
          
          {/* Center Line */}
          <line 
            x1="0" 
            y1="150" 
            x2="400" 
            y2="150" 
            stroke="rgba(255,255,255,0.3)" 
            strokeWidth="2"
          />
          
          {/* Goal Areas */}
          <rect 
            x="150" 
            y="10" 
            width="100" 
            height="60" 
            fill="none" 
            stroke="rgba(255,255,255,0.3)" 
            strokeWidth="2"
          />
          <rect 
            x="150" 
            y="230" 
            width="100" 
            height="60" 
            fill="none" 
            stroke="rgba(255,255,255,0.3)" 
            strokeWidth="2"
          />
        </svg>

        {/* Players */}
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
              isAnimating ? 'animate-futsal-player' : 'opacity-0'
            }`}
            style={{
              left: `${player.position.x}%`,
              top: `${player.position.y}%`,
              animationDelay: `${index * 0.3}s`,
            }}
          >
            {/* Player Circle */}
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow hover-lift cursor-pointer">
                <User className="w-6 h-6 text-white" />
              </div>
              
              {/* Player Info Card */}
              <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm p-3 rounded-lg shadow-elegant min-w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <div className="text-sm font-semibold text-foreground mb-1">
                  {player.name}
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  {player.nim}
                </div>
                <div className="text-xs text-primary font-medium">
                  {player.role}
                </div>
                
                {/* Arrow pointing to player */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card/95"></div>
              </div>
              
              {/* Player number */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-primary bg-card/80 rounded-full w-5 h-5 flex items-center justify-center">
                {player.id}
              </div>
            </div>
          </div>
        ))}

        {/* Formation Label */}
        <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-elegant">
          <div className="text-sm font-semibold text-gradient-primary">
            Formasi Kelompok 10
          </div>
          <div className="text-xs text-muted-foreground">
            Formasi 1-2-2 Futsal
          </div>
        </div>

        {/* Team Stats */}
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-elegant">
          <div className="text-xs text-muted-foreground mb-1">Tim</div>
          <div className="text-sm font-semibold text-primary">Kelompok 10</div>
          <div className="text-xs text-muted-foreground">5 Pemain</div>
        </div>
      </div>

      {/* Team Composition */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg shadow-elegant">
          <div className="text-sm font-semibold text-accent mb-2">⚽ Bertahan</div>
          <div className="text-xs text-muted-foreground">
            Kiper: Mengamankan gawang dan memulai serangan
          </div>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg shadow-elegant">
          <div className="text-sm font-semibold text-primary mb-2">🛡️ Tengah</div>
          <div className="text-xs text-muted-foreground">
            Bek: Mengatur pertahanan dan transisi
          </div>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg shadow-elegant">
          <div className="text-sm font-semibold text-accent mb-2">⚡ Menyerang</div>
          <div className="text-xs text-muted-foreground">
            Sayap: Menciptakan peluang dan mencetak gol
          </div>
        </div>
      </div>
    </div>
  );
};