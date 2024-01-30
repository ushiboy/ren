import { Todo } from "@/domains/models";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentations/components/ui/table";

import { TodoListRow } from "./TodoListRow";

export type Props = {
  todos: Todo[];
  onClickRow: (todo: Todo) => void;
};

export function TodosList({ todos, onClickRow }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((r) => (
          <TodoListRow key={r.id} todo={r} onClick={onClickRow} />
        ))}
      </TableBody>
    </Table>
  );
}
