import { Todo } from "@/domains/models";
import { deleteTodos } from "@/drivers/gen/todoAPI";

export async function deleteTodo(todo: Todo): Promise<void> {
  await deleteTodos(todo.id);
}

export type DeleteTodo = typeof deleteTodo;
