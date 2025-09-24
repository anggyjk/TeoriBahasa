import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Question {
  id: number;
  text: string;
  author: string;
  timestamp: Date;
  answered?: boolean;
}

interface QuestionSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuestionSystem = ({ isOpen, onClose }: QuestionSystemProps) => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "Bagaimana hubungan antara teori himpunan dengan automata?",
      author: "Peserta 1",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      answered: false
    },
    {
      id: 2,
      text: "Bisakah dijelaskan lebih detail tentang finite state machine?",
      author: "Peserta 2", 
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
      answered: false
    }
  ]);
  
  const [newQuestion, setNewQuestion] = useState("");
  const [authorName, setAuthorName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [questions]);

  // Simulate real-time questions
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      // Randomly add new questions
      if (Math.random() < 0.3) { // 30% chance every 10 seconds
        const sampleQuestions = [
          "Apa perbedaan DFA dan NFA?",
          "Bagaimana cara kerja context-free grammar?",
          "Bisakah dijelaskan tentang regular expressions?",
          "Apa itu pushdown automata?",
          "Bagaimana implementasi Turing machine?"
        ];
        
        const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
        const newQ: Question = {
          id: Date.now(),
          text: randomQuestion,
          author: `Peserta ${Math.floor(Math.random() * 20) + 1}`,
          timestamp: new Date(),
          answered: false
        };
        
        setQuestions(prev => [...prev, newQ]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const question: Question = {
      id: Date.now(),
      text: newQuestion,
      author: authorName || "Anda",
      timestamp: new Date(),
      answered: false
    };

    setQuestions(prev => [...prev, question]);
    setNewQuestion("");
  };

  const markAsAnswered = (id: number) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === id ? { ...q, answered: true } : q
      )
    );
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Baru saja";
    if (minutes < 60) return `${minutes} menit yang lalu`;
    return timestamp.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl max-h-[80vh] bg-card/95 backdrop-blur-sm shadow-deep">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Tanya Jawab Real-time
              </h2>
              <p className="text-sm text-muted-foreground">
                {questions.filter(q => !q.answered).length} pertanyaan belum dijawab
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96">
          {questions.map(question => (
            <div
              key={question.id}
              className={`p-4 rounded-lg border transition-all duration-300 hover-lift ${
                question.answered 
                  ? 'bg-muted/30 border-muted' 
                  : 'bg-card border-border animate-slide-up'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className={`text-sm ${
                    question.answered ? 'text-muted-foreground' : 'text-foreground'
                  }`}>
                    {question.text}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {question.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(question.timestamp)}
                    </span>
                    {question.answered && (
                      <span className="text-xs text-primary font-medium">
                        ✓ Dijawab
                      </span>
                    )}
                  </div>
                </div>
                
                {!question.answered && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => markAsAnswered(question.id)}
                    className="text-xs hover:bg-primary hover:text-white"
                  >
                    Tandai Dijawab
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="border-t border-border p-6">
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <Input
              placeholder="Nama Anda"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="bg-muted/50"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Ajukan pertanyaan Anda..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="flex-1 bg-muted/50"
                required
              />
              <Button 
                type="submit" 
                size="sm"
                className="bg-gradient-primary hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
          
          <p className="text-xs text-muted-foreground mt-2">
            💡 Pertanyaan baru akan muncul secara otomatis dari peserta lain
          </p>
        </div>
      </Card>
    </div>
  );
};