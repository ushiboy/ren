import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/presentations/components/ui/dialog";
import { useNewTodoForm } from "./hooks";
import { Button } from "@/presentations/components/ui/button";
import { Label } from "@/presentations/components/ui/label";
import { Input } from "@/presentations/components/ui/input";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentations/components/ui/alert";
import { AlertCircle } from "lucide-react";

export type Props = {
  onCancel: () => void;
  onSaved: () => void;
};

export function NewTodoForm({ onCancel, onSaved }: Props) {
  const { title, error, setTitle, save } = useNewTodoForm({ onSaved });
  return (
    <Dialog open>
      <DialogContent>
        <form
          data-testid="newTodoForm"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <div className="mb-4">
            <Label>title</Label>
            <Input
              type="text"
              value={title}
              data-testid="titleText"
              onChange={(e) => setTitle(e.target.value)}
            />
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription data-testid="errorMessage">
                  {error.message}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter className="justify-end">
            <Button
              type="button"
              data-testid="cancelButton"
              variant="outline"
              onClick={onCancel}
            >
              {"キャンセル"}
            </Button>
            <Button type="submit" data-testid="saveButton">
              {"保存"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
