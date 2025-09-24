import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  MessageCircle, 
  Share2, 
  ProjectorIcon,
  Menu,
  X
} from "lucide-react";
import { QuestionSystem } from "./QuestionSystem";

interface PresentationHeaderProps {
  onToggleQuestions: () => void;
  questionsOpen: boolean;
}

export const PresentationHeader = ({ 
  onToggleQuestions, 
  questionsOpen 
}: PresentationHeaderProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Teori Bahasa dan Otomata - Kelompok 10',
          text: 'Presentasi tentang teori bahasa dan teori pendukung otomata',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link presentasi telah disalin!');
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-md border-b border-border shadow-elegant">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <ProjectorIcon className="w-5 h-5 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-gradient-primary">
                Teori Bahasa & Otomata
              </h1>
              <p className="text-sm text-muted-foreground">
                Kelompok 10 - Kelas H
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-muted hover-lift"
              title="Pengaturan"
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button
              variant={questionsOpen ? "default" : "ghost"}
              size="sm"
              onClick={onToggleQuestions}
              className={`hover-lift relative ${
                questionsOpen 
                  ? "bg-gradient-primary text-white" 
                  : "hover:bg-muted"
              }`}
              title="Tanya Jawab"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="hover:bg-muted hover-lift"
              title="Bagikan"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <div className="flex flex-col gap-2 p-4">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-3 hover:bg-muted"
                onClick={() => setShowMobileMenu(false)}
              >
                <Settings className="w-4 h-4" />
                Pengaturan
              </Button>
              
              <Button
                variant={questionsOpen ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  onToggleQuestions();
                  setShowMobileMenu(false);
                }}
                className={`justify-start gap-3 ${
                  questionsOpen 
                    ? "bg-gradient-primary text-white" 
                    : "hover:bg-muted"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Tanya Jawab
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse ml-auto" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleShare();
                  setShowMobileMenu(false);
                }}
                className="justify-start gap-3 hover:bg-muted"
              >
                <Share2 className="w-4 h-4" />
                Bagikan
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Question System Modal */}
      <QuestionSystem 
        isOpen={questionsOpen} 
        onClose={() => onToggleQuestions()} 
      />
    </>
  );
};