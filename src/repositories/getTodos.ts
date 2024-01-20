import { Todo, convertRawToTodo } from "@/domains/models";
import { getTodos as _getTodos } from "@/drivers/gen/todoAPI";

export async function getTodos(): Promise<Todo[]> {
  const { data } = await _getTodos();
  return data.todos.map(convertRawToTodo);
}

export type GetTodos = typeof getTodos;
