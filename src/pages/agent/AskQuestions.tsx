import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const questions = [
  { id: 1, label: "Name", enabled: true },
  { id: 2, label: "Phone", enabled: true },
  { id: 3, label: "Email", enabled: true },
  { id: 4, label: "Company", enabled: false },
  { id: 5, label: "Address", enabled: false },
];

export default function AskQuestions() {
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
          <span className="text-sm text-foreground">(206) 687-1315</span>
          <Button variant="outline" size="sm">
            Web call
          </Button>
        </div>
      </div>

      <Button className="mb-6">
        <Plus className="h-4 w-4 mr-2" />
        Add new question
      </Button>

      <div className="space-y-2">
        {questions.map((question) => (
          <div
            key={question.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center text-muted-foreground">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6h8M4 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-medium text-foreground">{question.label}</span>
            </div>
            <Switch defaultChecked={question.enabled} />
          </div>
        ))}
      </div>
    </div>
  );
}
