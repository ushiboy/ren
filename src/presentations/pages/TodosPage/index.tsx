import { Button } from "@/presentations/components/ui/button";
import { TodosList } from "./components";
import { EditTodoForm } from "./components/EditTodoForm";
import { NewTodoForm } from "./components/NewTodoForm";
import { useTodosPage } from "./hooks";
import { LoadingMask } from "@/presentations/components/shared";

export function TodosPage() {
  const {
    todos,
    isShowNewTodoForm,
    selectedTodo,
    isLoading,
    startAddingNewTodo,
    stopAddingNewTodo,
    selectTodo,
    clearSelectedTodo,
    refreshPage,
  } = useTodosPage();
  return (
    <div data-testid="todoPage">
      <Button
        type="button"
        data-testid="addNewTodoButton"
        onClick={startAddingNewTodo}
      >
        {"新しいTodoを追加"}
      </Button>
      {isShowNewTodoForm && (
        <NewTodoForm onCancel={stopAddingNewTodo} onSaved={refreshPage} />
      )}
      <TodosList todos={todos} onClickRow={selectTodo} />
      {selectedTodo && (
        <EditTodoForm
          todo={selectedTodo}
          onCancel={clearSelectedTodo}
          onSaved={refreshPage}
          onDeleted={refreshPage}
        />
      )}
      <LoadingMask show={isLoading} />
    </div>
  );
}
