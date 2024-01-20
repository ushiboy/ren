import { RenderResult, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodosPage } from "..";
import { QueryClient } from "@tanstack/react-query";
import { unCompletedTodo } from "@/__fixtures__/todo";
import { WebApiWrap } from "@/__fixtures__/helper";

describe("TodosPage", () => {
  const client = new QueryClient();

  const output = () =>
    render(<TodosPage />, {
      wrapper({ children }) {
        return (
          <WebApiWrap
            client={client}
            overrideRepositories={{
              getTodos: async () => [unCompletedTodo],
            }}
          >
            {children}
          </WebApiWrap>
        );
      },
    });

  test("初期表示でTodo一覧を取得して表示する", async () => {
    const r = output();
    await waitFor(() => client.isFetching());
    expect(r.getByTestId("todoTitle").textContent).toBe(unCompletedTodo.title);
  });

  describe("新しいTodoを追加ボタンを押した場合", () => {
    let r: RenderResult;
    beforeEach(async () => {
      r = output();
      await waitFor(() => client.isFetching());
    });

    test("新しいTodoの追加フォームを表示する", async () => {
      const user = userEvent.setup();
      await user.click(r.getByTestId("addNewTodoButton"));

      expect(r.getByTestId("newTodoForm")).toBeInTheDocument();
    });
  });
});
