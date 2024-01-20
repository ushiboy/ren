import { Todo, TodoRaw } from "@/domains/models";

/**
 * 未完了のTodoレスポンスデータ
 */
export const unCompletedTodoRaw: TodoRaw = {
  id: 1,
  title: "a",
  completed: false,
  createdAt: "2020-01-01T00:00:00.000Z",
  updatedAt: "2020-01-02T00:00:00.000Z",
};

/**
 * 未完了のTodoデータ
 */
export const unCompletedTodo: Todo = {
  ...unCompletedTodoRaw,
  createdAt: new Date(unCompletedTodoRaw.createdAt),
  updatedAt: new Date(unCompletedTodoRaw.updatedAt),
};

/**
 * 完了のTodoレスポンスデータ
 */
export const completedTodoRaw: TodoRaw = {
  id: 2,
  title: "b",
  completed: true,
  createdAt: "2020-01-01T00:00:00.000Z",
  updatedAt: "2020-01-02T00:00:00.000Z",
};

/**
 * 完了のTodoデータ
 */
export const completedTodo: Todo = {
  ...completedTodoRaw,
  createdAt: new Date(completedTodoRaw.createdAt),
  updatedAt: new Date(completedTodoRaw.updatedAt),
};
