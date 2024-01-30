import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/presentations/components/ui/dialog";
import { Button } from "@/presentations/components/ui/button";
import { Label } from "@/presentations/components/ui/label";
import { Input } from "@/presentations/components/ui/input";
import { Todo } from "@/domains/models";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentations/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useEditTodoForm } from "./hooks";
import { Checkbox } from "@/presentations/components/ui/checkbox";

export type Props = {
  todo: Todo;
  onCancel: () => void;
  onSaved: () => void;
  onDeleted: () => void;
};

export function EditTodoForm({ todo, onCancel, onSaved, onDeleted }: Props) {
  const {
    title,
    completed,
    error,
    setTitle,
    setCompleted,
    save,
    confirmAndDelete,
  } = useEditTodoForm({
    todo,
    onSaved,
    onDeleted,
  });
  return (
    <Dialog open>
      <DialogContent>
        <form
          data-testid="editTodoForm"
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
          </div>
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="completedCheck"
                data-testid="completedCheck"
                checked={completed}
                onCheckedChange={(checked) => setCompleted(checked === true)}
              />
              <Label htmlFor="completedCheck">completed</Label>
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription data-testid="errorMessage">
                {error.message}
              </AlertDescription>
            </Alert>
          )}
          <DialogFooter className="justify-between">
            <Button
              type="button"
              variant="destructive"
              data-testid="deleteButton"
              onClick={confirmAndDelete}
            >
              {"削除"}
            </Button>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                data-testid="cancelButton"
                onClick={onCancel}
              >
                {"キャンセル"}
              </Button>
              <Button type="submit" data-testid="saveButton">
                {"保存"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
