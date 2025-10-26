import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Knowledge() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Knowledge</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add information about your business or custom instructions
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
        Add knowledge
      </Button>

      <div className="space-y-3">
        {/* Knowledge Item 1 */}
        <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded bg-warning/20 flex items-center justify-center">
              <span className="text-warning font-semibold">A</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Business Name</h3>
              <p className="text-sm text-muted-foreground">Goody</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch defaultChecked />
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Knowledge Item 2 */}
        <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded bg-warning/20 flex items-center justify-center">
              <span className="text-warning font-semibold">A</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Business Description</h3>
              <p className="text-sm text-muted-foreground">
                Goody is an online store offering unique home and living essentials, accessories, stationery, and g...
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch defaultChecked />
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
