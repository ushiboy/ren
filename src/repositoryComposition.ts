import { createTodo, deleteTodo, getTodos, updateTodo } from "./repositories";

export const repositoryComposition = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} as const;

export type RepositoryComposition = typeof repositoryComposition;
