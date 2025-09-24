import { useState, useEffect } from "react";
import { AnimatedBackground } from "./AnimatedBackground";
import { PresentationHeader } from "./PresentationHeader";
import { PresentationNavigation, SidebarNavigation } from "./PresentationNavigation";
import { Slide } from "./Slide";
import { FutsalLineup } from "./FutsalLineup";

export const AnimatedPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [questionsOpen, setQuestionsOpen] = useState(false);

  const slides = [
    { id: "title", title: "Judul & Pengantar" },
    { id: "lineup", title: "Formasi Tim Kelompok 10" },
    { id: "concepts", title: "Konsep Inti" },
    { id: "set-theory", title: "Teori Himpunan" },
    { id: "function-theory", title: "Teori Fungsi" },
    { id: "graph-theory", title: "Teori Graf" },
    { id: "connections", title: "Keterkaitan Konsep" },
    { id: "references", title: "Referensi" },
  ];

  const totalSlides = slides.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (questionsOpen) return; // Don't navigate when questions are open
      
      switch (e.key) {
        case 'ArrowRight':
        case 'Space':
        case 'PageDown':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          handlePrevious();
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlide(0);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlide(totalSlides - 1);
          break;
        case 'Escape':
          if (questionsOpen) {
            setQuestionsOpen(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [questionsOpen, totalSlides]);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGoToSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      setCurrentSlide(slideIndex);
    }
  };

  const renderSlideContent = (slideIndex: number) => {
    switch (slideIndex) {
      case 0: // Title Slide
        return (
          <Slide
            slideNumber={1}
            totalSlides={totalSlides}
            isActive={currentSlide === 0}
            title="Teori Bahasa dan Teori Pendukung Otomata"
          >
            <div className="text-center space-y-6">
              <p className="text-xl text-muted-foreground animate-slide-up delay-500">
                Kelompok 10 - Teori Bahasa dan Otomata - Kelas H
              </p>
              
              <div className="bg-muted/30 rounded-lg p-6 animate-slide-up delay-700">
                <p className="text-lg text-foreground mb-4">
                  Selamat datang di presentasi interaktif kami!
                </p>
                <p className="text-muted-foreground">
                  Gunakan navigasi di bawah atau keyboard (panah, spasi) untuk melanjutkan
                </p>
              </div>
              
              {/* Animated Icons */}
              <div className="flex justify-center gap-8 mt-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-bounce-in delay-1000">
                  <span className="text-2xl">🔄</span>
                </div>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-bounce-in delay-1200">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-bounce-in delay-1000">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
            </div>
          </Slide>
        );

      case 1: // Futsal Lineup
        return (
          <Slide
            slideNumber={2}
            totalSlides={totalSlides}
            isActive={currentSlide === 1}
            title="Tim Kelompok 10 - Formasi Futsal"
          >
            <div className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-lg text-muted-foreground animate-slide-up delay-500">
                  Berikut adalah formasi strategis anggota kelompok kami
                </p>
              </div>
              <FutsalLineup />
            </div>
          </Slide>
        );

      case 2: // Core Concepts
        return (
          <Slide
            slideNumber={3}
            totalSlides={totalSlides}
            isActive={currentSlide === 2}
            title="Konsep Inti: Alfabet, String, Tata Bahasa, dan Bahasa"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/30 p-6 rounded-lg animate-slide-left delay-500">
                <h3 className="text-xl font-semibold text-accent mb-4">Alfabet (Σ)</h3>
                <p className="text-muted-foreground">
                  Kumpulan dasar simbol-simbol, seperti {"{a, b, c}"} atau {"{0, 1}"}.
                </p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg animate-slide-right delay-700">
                <h3 className="text-xl font-semibold text-primary mb-4">String</h3>
                <p className="text-muted-foreground">
                  Urutan hingga (finite sequence) dari simbol-simbol yang diambil dari alfabet.
                </p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg animate-slide-left delay-900">
                <h3 className="text-xl font-semibold text-accent mb-4">Tata Bahasa (Grammar)</h3>
                <p className="text-muted-foreground">
                  Seperangkat aturan yang menentukan bagaimana string yang valid dapat dibentuk.
                </p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg animate-slide-right delay-1000">
                <h3 className="text-xl font-semibold text-primary mb-4">Bahasa (Language)</h3>
                <p className="text-muted-foreground">
                  Kumpulan (set) dari semua string yang dapat dihasilkan oleh tata bahasa.
                </p>
              </div>
            </div>
          </Slide>
        );

      case 3: // Set Theory
        return (
          <Slide
            slideNumber={4}
            totalSlides={totalSlides}
            isActive={currentSlide === 3}
            title="Dasar-Dasar Teori Himpunan"
          >
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground text-center animate-slide-up delay-500">
                Teori himpunan sangat penting untuk mendefinisikan blok bangunan (building blocks) 
                bahasa dan automata. Sebuah himpunan (set) adalah kumpulan objek yang berbeda (distinct objects).
              </p>
              
              <h3 className="text-2xl font-semibold text-center mb-6 animate-slide-up delay-700">
                Operasi Himpunan Kunci:
              </h3>
              
              <div className="space-y-4">
                <div className="bg-muted/30 p-6 rounded-lg animate-slide-left delay-900">
                  <h4 className="text-lg font-semibold text-accent mb-2">Union (Gabungan)</h4>
                  <p className="text-muted-foreground">
                    Menggabungkan semua elemen dari beberapa himpunan.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg animate-slide-right delay-1100">
                  <h4 className="text-lg font-semibold text-primary mb-2">Intersection (Irisan)</h4>
                  <p className="text-muted-foreground">
                    Mengidentifikasi elemen umum yang dibagi antara himpunan.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg animate-slide-left delay-1300">
                  <h4 className="text-lg font-semibold text-accent mb-2">Complement (Komplement)</h4>
                  <p className="text-muted-foreground">
                    Mencakup elemen yang tidak ada dalam himpunan tertentu.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-primary/20 p-6 rounded-lg border border-primary/30 animate-slide-up delay-1500">
                <p className="text-center text-foreground font-medium">
                  💡 Operasi-operasi ini fundamental untuk menjelaskan secara formal alphabets (alfabet) dan languages (bahasa).
                </p>
              </div>
            </div>
          </Slide>
        );

      case 4: // Function Theory
        return (
          <Slide
            slideNumber={5}
            totalSlides={totalSlides}
            isActive={currentSlide === 4}
            title="Peran Teori Fungsi"
          >
            <div className="space-y-8">
              <p className="text-lg text-muted-foreground text-center animate-slide-up delay-500">
                Fungsi menyediakan mekanisme untuk mendefinisikan hubungan antar elemen di berbagai himpunan (set).
              </p>
              
              <div className="bg-gradient-primary/20 p-8 rounded-lg border border-primary/30 animate-slide-up delay-700">
                <p className="text-center text-foreground font-medium text-lg">
                  Dalam automata, fungsi sangat penting untuk merepresentasikan transisi keadaan (state transitions) 
                  berdasarkan masukan (input), membimbing perilaku mesin.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-muted/30 p-6 rounded-lg text-center animate-bounce-in delay-900">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📥</span>
                  </div>
                  <h4 className="font-semibold mb-2">Input</h4>
                  <p className="text-sm text-muted-foreground">Keadaan saat ini + Simbol masukan</p>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg text-center animate-bounce-in delay-1100">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h4 className="font-semibold mb-2">Fungsi</h4>
                  <p className="text-sm text-muted-foreground">Proses transformasi</p>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg text-center animate-bounce-in delay-1300">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📤</span>
                  </div>
                  <h4 className="font-semibold mb-2">Output</h4>
                  <p className="text-sm text-muted-foreground">Keadaan berikutnya</p>
                </div>
              </div>
            </div>
          </Slide>
        );

      case 5: // Graph Theory
        return (
          <Slide
            slideNumber={6}
            totalSlides={totalSlides}
            isActive={currentSlide === 5}
            title="Teori Graf dalam Pemodelan Otomata"
          >
            <div className="space-y-8">
              <p className="text-lg text-muted-foreground text-center animate-slide-up delay-500">
                Graf, yang terdiri dari titik-titik (nodes/vertices) dan garis penghubung (edges), 
                adalah alat yang ampuh untuk memvisualisasikan dan memodelkan mesin komputasi.
              </p>
              
              <h3 className="text-2xl font-semibold text-center animate-slide-up delay-700">
                Aplikasi dalam Otomata:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-muted/30 p-8 rounded-lg animate-slide-left delay-900">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xl">🔵</span>
                    </div>
                    <h4 className="text-xl font-semibold text-primary">Titik (Nodes)</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Mempresentasikan berbagai keadaan (states) dari otomata.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-8 rounded-lg animate-slide-right delay-1100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-xl">↔️</span>
                    </div>
                    <h4 className="text-xl font-semibold text-accent">Garis (Edges)</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Menggambarkan transisi (transitions) antar keadaan (states) yang dipicu oleh masukan (inputs) tertentu.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-primary/20 p-8 rounded-lg border border-primary/30 animate-slide-up delay-1300">
                <p className="text-center text-foreground font-medium text-lg">
                  🎯 Representasi visual ini membantu memahami perilaku dinamis dan alur dalam otomata.
                </p>
              </div>
            </div>
          </Slide>
        );

      case 6: // Connections
        return (
          <Slide
            slideNumber={7}
            totalSlides={totalSlides}
            isActive={currentSlide === 6}
            title="Keterkaitan Konsep"
          >
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-6 rounded-lg border border-primary/30 animate-slide-left delay-500">
                  <h4 className="text-lg font-semibold text-primary mb-3">Tata Bahasa (Grammar)</h4>
                  <p className="text-muted-foreground">
                    Menggunakan aturan untuk menghasilkan semua string yang valid.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 p-6 rounded-lg border border-accent/30 animate-slide-right delay-700">
                  <h4 className="text-lg font-semibold text-accent mb-3">Bahasa (Language)</h4>
                  <p className="text-muted-foreground">
                    Kumpulan semua string yang dihasilkan oleh tata bahasa.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-6 rounded-lg border border-primary/30 animate-slide-left delay-900">
                  <h4 className="text-lg font-semibold text-primary mb-3">Alfabet (Alphabet)</h4>
                  <p className="text-muted-foreground">
                    Menyediakan simbol-simbol dasar untuk membentuk semua string.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 p-6 rounded-lg border border-accent/30 animate-slide-right delay-1100">
                  <h4 className="text-lg font-semibold text-accent mb-3">Automata</h4>
                  <p className="text-muted-foreground">
                    Menggunakan fungsi dan graf untuk mengenali serta memproses bahasa.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-primary p-8 rounded-lg shadow-deep animate-slide-up delay-1300">
                <p className="text-center text-white font-medium text-xl">
                  🌟 Konsep-konsep ini memberikan tulang punggung yang kokoh untuk memahami 
                  sifat komputasi dan pemrosesan bahasa.
                </p>
              </div>
            </div>
          </Slide>
        );

      case 7: // References
        return (
          <Slide
            slideNumber={8}
            totalSlides={totalSlides}
            isActive={currentSlide === 7}
            title="Referensi"
          >
            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg animate-slide-up delay-500">
                <h4 className="font-semibold text-foreground mb-2">Sipser, M. (2012)</h4>
                <p className="text-muted-foreground mb-2">
                  Introduction to the Theory of Computation (3rd ed.). Cengage Learning.
                </p>
                <a 
                  href="https://fuuu.be/polytech/INFOF408/Introduction-To-The-Theory-Of-Computation-Michael-Sipser.pdf" 
                  className="text-primary hover:text-accent transition-colors text-sm break-all"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Link PDF →
                </a>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg animate-slide-up delay-700">
                <h4 className="font-semibold text-foreground mb-2">Hopcroft, J. E., Motwani, R., & Ullman, J. D. (2006)</h4>
                <p className="text-muted-foreground mb-2">
                  Introduction to Automata Theory, Languages, and Computation (3rd ed.). Addison-Wesley.
                </p>
                <a 
                  href="https://mrce.in/ebooks/Automata%20Theory,%20Languages,%20&%20Computation%20Introduction%203rd%20Ed.pdf" 
                  className="text-primary hover:text-accent transition-colors text-sm break-all"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Link PDF →
                </a>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg animate-slide-up delay-900">
                <h4 className="font-semibold text-foreground mb-2">Soyusiawaty, D., & Mardhia, M. M. (2019)</h4>
                <p className="text-muted-foreground mb-2">
                  Buku Ajar Mata Kuliah Teori Bahasa dan Automata. Program Studi Teknik Informatika, Universitas Ahmad Dahlan.
                </p>
                <a 
                  href="https://eprints.uad.ac.id/22018/1/Lampiran%20B6b.pdf" 
                  className="text-primary hover:text-accent transition-colors text-sm break-all"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Link PDF →
                </a>
              </div>
              
              <div className="bg-gradient-primary p-6 rounded-lg shadow-deep text-center animate-slide-up delay-1100">
                <p className="text-white font-medium text-lg">
                  🎉 Terima kasih telah mengikuti presentasi kami!
                </p>
                <p className="text-white/80 mt-2">
                  Kelompok 10 - Teori Bahasa dan Otomata - Kelas H
                </p>
              </div>
            </div>
          </Slide>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-darker-bg relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Header */}
      <PresentationHeader 
        onToggleQuestions={() => setQuestionsOpen(!questionsOpen)}
        questionsOpen={questionsOpen}
      />
      
      {/* Sidebar Navigation */}
      <SidebarNavigation 
        currentSlide={currentSlide}
        slides={slides}
        onGoToSlide={handleGoToSlide}
      />
      
      {/* Main Content */}
      <main className="pt-20 relative z-10">
        {renderSlideContent(currentSlide)}
      </main>
      
      {/* Bottom Navigation */}
      <PresentationNavigation 
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onGoToSlide={handleGoToSlide}
      />
    </div>
  );
};