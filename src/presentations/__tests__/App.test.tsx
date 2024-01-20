import { render, waitFor } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { App } from "../App";
import { WebApiWrap } from "@/__fixtures__/helper";

describe("App", () => {
  const client = new QueryClient();

  const output = () =>
    render(<App />, {
      wrapper({ children }) {
        return (
          <WebApiWrap
            client={client}
            overrideRepositories={{
              getTodos: async () => [],
            }}
          >
            {children}
          </WebApiWrap>
        );
      },
    });

  test("Todoページ表示する", async () => {
    const r = output();
    await waitFor(() => client.isFetching());
    expect(r.getByTestId("todoPage")).toBeInTheDocument();
  });
});
