import { useNewTodoForm } from "./hooks";

export type Props = {
  onCancel: () => void;
  onSaved: () => void;
};

export function NewTodoForm({ onCancel, onSaved }: Props) {
  const { title, error, setTitle, save } = useNewTodoForm({ onSaved });
  return (
    <form
      data-testid="newTodoForm"
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
      <button type="button" data-testid="cancelButton" onClick={onCancel}>
        {"キャンセル"}
      </button>
      <button type="submit" data-testid="saveButton">
        {"保存"}
      </button>
      {error && <p data-testid="errorMessage">{error.message}</p>}
    </form>
  );
}
