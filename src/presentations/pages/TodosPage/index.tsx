import { useGetTodos } from "@/presentations/hooks";

export function TodosPage() {
  const { data } = useGetTodos();
  return (
    <div data-testid="todoPage">
      <ul>
        {(data || []).map((r) => (
          <li key={r.id} data-testid="todoTitle">
            {r.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
