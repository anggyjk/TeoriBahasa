import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home, SkipForward } from "lucide-react";

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToSlide: (slideIndex: number) => void;
}

export const PresentationNavigation = ({ 
  currentSlide, 
  totalSlides, 
  onPrevious, 
  onNext, 
  onGoToSlide 
}: NavigationProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
      <div className="bg-card/90 backdrop-blur-sm rounded-full shadow-deep border border-border px-6 py-4 flex items-center gap-4">
        {/* Previous Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrevious}
          disabled={currentSlide === 0}
          className="hover:bg-muted hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
          title="Slide Sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300 hover-lift
                ${index === currentSlide 
                  ? 'bg-gradient-primary shadow-glow scale-125' 
                  : 'bg-muted hover:bg-muted-foreground/50'
                }
              `}
              title={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Current Slide Info */}
        <div className="text-sm font-medium text-muted-foreground mx-2">
          {currentSlide + 1} / {totalSlides}
        </div>

        {/* Next Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="hover:bg-muted hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
          title="Slide Berikutnya"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Quick Actions */}
        <div className="border-l border-border pl-4 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onGoToSlide(0)}
            className="hover:bg-muted hover-lift"
            title="Ke Slide Pertama"
          >
            <Home className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onGoToSlide(totalSlides - 1)}
            className="hover:bg-muted hover-lift"
            title="Ke Slide Terakhir"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface SidebarNavigationProps {
  currentSlide: number;
  slides: Array<{ title: string; id: string }>;
  onGoToSlide: (slideIndex: number) => void;
}

export const SidebarNavigation = ({ 
  currentSlide, 
  slides, 
  onGoToSlide 
}: SidebarNavigationProps) => {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
      <div className="bg-card/90 backdrop-blur-sm rounded-lg shadow-deep border border-border p-4 max-w-64">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">
          Daftar Slide
        </h3>
        
        <div className="space-y-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => onGoToSlide(index)}
              className={`
                w-full text-left p-3 rounded-lg transition-all duration-300 hover-lift
                ${index === currentSlide 
                  ? 'bg-gradient-primary text-white shadow-glow' 
                  : 'hover:bg-muted text-muted-foreground'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className={`
                  text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center
                  ${index === currentSlide ? 'bg-white/20' : 'bg-muted'}
                `}>
                  {index + 1}
                </span>
                <span className="text-sm font-medium truncate">
                  {slide.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};