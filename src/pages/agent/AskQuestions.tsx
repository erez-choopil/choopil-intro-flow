import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Question {
  id: number;
  label: string;
  enabled: boolean;
  description?: string;
}

const initialQuestions: Question[] = [
  { id: 1, label: "Name", enabled: true },
  { id: 2, label: "Phone", enabled: true },
  { id: 3, label: "Email", enabled: false },
  { id: 4, label: "Company", enabled: false },
  { id: 5, label: "Address", enabled: false },
];

export default function AskQuestions() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState("");

  const handleAddQuestion = () => {
    if (newQuestionText.trim()) {
      const newQuestion: Question = {
        id: Date.now(),
        label: newQuestionText,
        enabled: true,
      };
      setQuestions([...questions, newQuestion]);
      setNewQuestionText("");
      setIsAddingQuestion(false);
    }
  };

  const handleToggle = (id: number) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, enabled: !q.enabled } : q
    ));
  };

  const handleDelete = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ask questions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Customize what information your agent collects from callers. Questions will be asked in this order.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground">(415) 413-5501</span>
          <Button variant="outline" size="sm">
            Web call
          </Button>
        </div>
      </div>

      <Button className="mb-6" onClick={() => setIsAddingQuestion(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add new question
      </Button>

      <div className="space-y-2">
        {questions.map((question) => (
          <div
            key={question.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-6 h-6 flex items-center justify-center text-muted-foreground">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6h8M4 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <span className="font-medium text-foreground">{question.label}</span>
                {question.description && (
                  <p className="text-sm text-muted-foreground">{question.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleDelete(question.id)}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Switch 
                checked={question.enabled} 
                onCheckedChange={() => handleToggle(question.id)}
              />
            </div>
          </div>
        ))}

        {isAddingQuestion && (
          <div className="flex items-center gap-2 p-4 border rounded-lg bg-card">
            <Input
              placeholder="Enter question text"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddQuestion()}
              autoFocus
            />
            <Button onClick={handleAddQuestion}>Save</Button>
            <Button variant="ghost" onClick={() => {
              setIsAddingQuestion(false);
              setNewQuestionText("");
            }}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
