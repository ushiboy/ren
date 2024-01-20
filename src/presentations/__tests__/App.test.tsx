import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RepositoryContextProvider } from "@/presentations/contexts";
import { repositoryComposition } from "@/repositoryComposition";
import { App } from "../App";

describe("App", () => {
  const client = new QueryClient();

  const output = () =>
    render(<App />, {
      wrapper({ children }) {
        return (
          <QueryClientProvider client={client}>
            <RepositoryContextProvider
              repositoryComposition={{
                ...repositoryComposition,
                getTodos: async () => [],
              }}
            >
              {children}
            </RepositoryContextProvider>
          </QueryClientProvider>
        );
      },
    });

  test("Todoページ表示する", async () => {
    const r = output();
    await waitFor(() => client.isFetching());
    expect(r.getByTestId("todoPage")).toBeInTheDocument();
  });
});
