import { Todo } from "@/domains/models";

export type Props = {
  todos: Todo[];
  onClickRow: (todo: Todo) => void;
};

export function TodosList({ todos, onClickRow }: Props) {
  return (
    <ul>
      {todos.map((r) => (
        <li key={r.id} data-testid="todoTitle" onClick={() => onClickRow(r)}>
          {r.title}
        </li>
      ))}
    </ul>
  );
}
