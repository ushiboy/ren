import { render, waitFor } from "@testing-library/react";
import { TodosPage } from "..";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RepositoryContextProvider } from "@/presentations/contexts";
import { repositoryComposition } from "@/repositoryComposition";
import { Todo } from "@/domains/models";

describe("TodosPage", () => {
  const todo: Todo = {
    id: 1,
    title: "a",
    completed: false,
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2020-01-01"),
  };

  const client = new QueryClient();

  const output = () =>
    render(<TodosPage />, {
      wrapper({ children }) {
        return (
          <QueryClientProvider client={client}>
            <RepositoryContextProvider
              repositoryComposition={{
                ...repositoryComposition,
                getTodos: async () => [todo],
              }}
            >
              {children}
            </RepositoryContextProvider>
          </QueryClientProvider>
        );
      },
    });

  test("初期表示でTodo一覧を取得して表示する", async () => {
    const r = output();
    await waitFor(() => client.isFetching());
    expect(r.getByTestId("todoTitle").textContent).toBe(todo.title);
  });
});
