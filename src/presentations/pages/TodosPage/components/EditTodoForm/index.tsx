import { Todo } from "@/domains/models";
import { useEditTodoForm } from "./hooks";

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
    <form
      data-testid="editTodoForm"
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <label>title</label>
      <input
        type="text"
        value={title}
        data-testid="titleText"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>completed</label>
      <input
        type="checkbox"
        data-testid="completedCheck"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <button type="button" data-testid="cancelButton" onClick={onCancel}>
        {"キャンセル"}
      </button>
      <button
        type="button"
        data-testid="deleteButton"
        onClick={confirmAndDelete}
      >
        {"削除"}
      </button>
      <button type="submit" data-testid="saveButton">
        {"保存"}
      </button>
      {error && <p data-testid="errorMessage">{error.message}</p>}
    </form>
  );
}
