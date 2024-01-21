import { TodosList } from "./components";
import { EditTodoForm } from "./components/EditTodoForm";
import { NewTodoForm } from "./components/NewTodoForm";
import { useTodosPage } from "./hooks";

export function TodosPage() {
  const {
    todos,
    isShowNewTodoForm,
    selectedTodo,
    startAddingNewTodo,
    stopAddingNewTodo,
    selectTodo,
    clearSelectedTodo,
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
      <TodosList todos={todos} onClickRow={selectTodo} />
      {selectedTodo && (
        <EditTodoForm
          todo={selectedTodo}
          onCancel={clearSelectedTodo}
          onSaved={refreshPage}
        />
      )}
    </div>
  );
}
