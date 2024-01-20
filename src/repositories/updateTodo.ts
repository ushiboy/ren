import { Todo, convertRawToTodo } from "@/domains/models";
import { putTodos } from "@/drivers/gen/todoAPI";

export async function updateTodo(todo: Todo): Promise<Todo> {
  const { data } = await putTodos(todo.id, todo);
  return convertRawToTodo(data);
}

export type UpdateTodo = typeof updateTodo;
