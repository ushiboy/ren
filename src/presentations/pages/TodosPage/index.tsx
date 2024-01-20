import { TodosList } from "./components";
import { NewTodoForm } from "./components/NewTodoForm";
import { useTodosPage } from "./hooks";

export function TodosPage() {
  const {
    todos,
    isShowNewTodoForm,
    startAddingNewTodo,
    stopAddingNewTodo,
    refreshPage,
  } = useTodosPage();
  return (
    <div data-testid="todoPage">
      <button
        type="button"
        data-testid="addNewTodoButton"
        onClick={startAddingNewTodo}
      >
        {"新しいTodoを追加"}
      </button>
      {isShowNewTodoForm && (
        <NewTodoForm onCancel={stopAddingNewTodo} onSaved={refreshPage} />
      )}
      <TodosList todos={todos} />
    </div>
  );
}
