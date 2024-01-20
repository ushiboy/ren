import { Todo } from "@/domains/models";

export type Props = {
  todos: Todo[];
};

export function TodosList({ todos }: Props) {
  return (
    <ul>
      {todos.map((r) => (
        <li key={r.id} data-testid="todoTitle">
          {r.title}
        </li>
      ))}
    </ul>
  );
}
