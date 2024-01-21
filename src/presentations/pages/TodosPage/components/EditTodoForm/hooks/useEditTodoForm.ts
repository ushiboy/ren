import { Todo } from "@/domains/models";
import { useUpdateTodo } from "@/presentations/hooks";
import { useCallback, useState } from "react";

type Props = {
  todo: Todo;
  onSaved: () => void;
};

export function useEditTodoForm({ todo, onSaved }: Props) {
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  const { mutate, error } = useUpdateTodo();

  const save = useCallback(() => {
    mutate(
      {
        ...todo,
        title,
        completed,
      },
      {
        onSuccess() {
          onSaved();
        },
      },
    );
  }, [todo, title, completed, mutate, onSaved]);

  return {
    title,
    completed,
    error,
    setTitle,
    setCompleted,
    save,
  };
}
