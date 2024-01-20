import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewTodoForm } from "..";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RepositoryContextProvider } from "@/presentations/contexts";
import { repositoryComposition } from "@/repositoryComposition";
import { Todo } from "@/domains/models";
import { CreateTodo } from "@/repositories";

describe("NewTodoForm", () => {
  const onCancel = vi.fn();
  const onSaved = vi.fn();
  const todo: Todo = {
    id: 1,
    title: "a",
    completed: false,
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2020-01-01"),
  };

  const client = new QueryClient();

  const output = (createTodo?: CreateTodo) =>
    render(<NewTodoForm onCancel={onCancel} onSaved={onSaved} />, {
      wrapper({ children }) {
        return (
          <QueryClientProvider client={client}>
            <RepositoryContextProvider
              repositoryComposition={{
                ...repositoryComposition,
                createTodo: createTodo
                  ? createTodo
                  : repositoryComposition.createTodo,
              }}
            >
              {children}
            </RepositoryContextProvider>
          </QueryClientProvider>
        );
      },
    });

  const createTodoOk = async () => todo;
  const createTodoNg = async () => {
    throw new Error("error");
  };

  describe("必要な情報を入力して保存ボタンを押した場合", () => {
    const title = "test";

    describe("保存成功の場合", () => {
      test("onSavedイベントを発生させる", async () => {
        const user = userEvent.setup();
        const r = output(createTodoOk);

        const titleText = r.getByTestId("titleText") as HTMLInputElement;
        await user.type(titleText, title);
        expect(titleText.value).toBe(title);

        expect(onSaved).not.toHaveBeenCalled();

        const saveButton = r.getByTestId("saveButton");
        await user.click(saveButton);
        await waitFor(() => client.isMutating());
        expect(onSaved).toHaveBeenCalled();
      });
    });

    describe("保存失敗の場合", () => {
      test("エラーメッセージを表示する", async () => {
        const user = userEvent.setup();
        const r = output(createTodoNg);

        const saveButton = r.getByTestId("saveButton");
        await user.click(saveButton);
        await waitFor(() => client.isMutating());

        expect(r.getByTestId("errorMessage")).toBeInTheDocument();
        expect(onSaved).not.toHaveBeenCalled();
      });
    });
  });

  describe("キャンセルボタンを押した場合", () => {
    test("onCancelイベントを発生させる", async () => {
      const user = userEvent.setup();
      const r = output();

      expect(onCancel).not.toHaveBeenCalled();

      const cancelButton = r.getByTestId("cancelButton");
      await user.click(cancelButton);
      expect(onCancel).toHaveBeenCalled();
    });
  });
});
