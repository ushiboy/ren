import { Todo } from "@/domains/models";
import { useGetTodos } from "@/presentations/hooks";
import { useCallback, useState } from "react";

export function useTodosPage() {
  const [isShowNewTodoForm, setShowNewTodoForm] = useState(false);
  const [selectedTodo, selectTodo] = useState<Todo | undefined>(undefined);
  const { data, isFetching, refetch } = useGetTodos();

  const startAddingNewTodo = useCallback(
    () => setShowNewTodoForm(true),
    [setShowNewTodoForm],
  );

  const stopAddingNewTodo = useCallback(
    () => setShowNewTodoForm(false),
    [setShowNewTodoForm],
  );

  const clearSelectedTodo = useCallback(
    () => selectTodo(undefined),
    [selectTodo],
  );

  const refreshPage = useCallback(() => {
    setShowNewTodoForm(false);
    clearSelectedTodo();
    refetch();
  }, [setShowNewTodoForm, refetch, clearSelectedTodo]);

  return {
    isShowNewTodoForm,
    todos: data || [],
    selectedTodo,
    isLoading: isFetching,
    startAddingNewTodo,
    stopAddingNewTodo,
    refreshPage,
    selectTodo,
    clearSelectedTodo,
  };
}

export type UseTodosPage = ReturnType<typeof useTodosPage>;
