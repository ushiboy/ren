import { Todo } from "@/domains/models";
import { useDeleteTodo, useUpdateTodo } from "@/presentations/hooks";
import { useCallback, useState } from "react";

type Props = {
  todo: Todo;
  onSaved: () => void;
  onDeleted: () => void;
};

export function useEditTodoForm({ todo, onSaved, onDeleted }: Props) {
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const save = useCallback(() => {
    updateTodo.mutate(
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
  }, [todo, title, completed, updateTodo, onSaved]);

  const confirmAndDelete = useCallback(() => {
    if (window.confirm("削除してよろしいですか？")) {
      deleteTodo.mutate(todo, {
        onSuccess() {
          onDeleted();
        },
      });
    }
  }, [todo, deleteTodo, onDeleted]);

  return {
    title,
    completed,
    error: updateTodo.error || deleteTodo.error,
    setTitle,
    setCompleted,
    save,
    confirmAndDelete,
  };
}
