import { Todo, convertRawToTodo } from "@/domains/models";
import { postTodos } from "@/drivers/gen/todoAPI";

export async function createTodo(title: string): Promise<Todo> {
  const { data } = await postTodos({
    title,
  });
  return convertRawToTodo(data);
}

export type CreateTodo = typeof createTodo;
