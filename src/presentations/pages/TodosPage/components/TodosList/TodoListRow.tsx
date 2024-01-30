import { Todo } from "@/domains/models";
import { TableCell, TableRow } from "@/presentations/components/ui/table";
import { useCallback } from "react";

export type Props = {
  todo: Todo;
  onClick: (todo: Todo) => void;
};

export function TodoListRow({ todo, onClick }: Props) {
  const handleClick = useCallback(() => onClick(todo), [todo, onClick]);
  return (
    <TableRow
      data-testid="todoListRow"
      className="cursor-pointer"
      onClick={handleClick}
    >
      <TableCell data-testid="todoTitle">{todo.title}</TableCell>
      <TableCell data-testid="completed">
        {todo.completed ? "o" : "x"}
      </TableCell>
      <TableCell data-testid="createdAt">
        {todo.createdAt.toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
}
