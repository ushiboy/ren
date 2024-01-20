import { useGetTodos } from "@/presentations/hooks";
import { useCallback, useState } from "react";

export function useTodosPage() {
  const [isShowNewTodoForm, setShowNewTodoForm] = useState(false);
  const { data, refetch } = useGetTodos();

  const startAddingNewTodo = useCallback(
    () => setShowNewTodoForm(true),
    [setShowNewTodoForm],
  );

  const stopAddingNewTodo = useCallback(
    () => setShowNewTodoForm(false),
    [setShowNewTodoForm],
  );

  const refreshPage = useCallback(() => {
    setShowNewTodoForm(false);
    refetch();
  }, [setShowNewTodoForm, refetch]);

  return {
    isShowNewTodoForm,
    todos: data || [],
    startAddingNewTodo,
    stopAddingNewTodo,
    refreshPage,
  };
}

export type UseTodosPage = ReturnType<typeof useTodosPage>;
