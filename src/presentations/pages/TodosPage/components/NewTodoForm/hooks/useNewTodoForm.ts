import { useCreateTodo } from "@/presentations/hooks";
import { useCallback, useState } from "react";

type Props = {
  onSaved: () => void;
};

export function useNewTodoForm({ onSaved }: Props) {
  const [title, setTitle] = useState("");

  const { mutate, error } = useCreateTodo();

  const save = useCallback(() => {
    mutate(title, {
      onSuccess() {
        onSaved();
      },
    });
  }, [title, mutate, onSaved]);

  return {
    title,
    error,
    setTitle,
    save,
  };
}
