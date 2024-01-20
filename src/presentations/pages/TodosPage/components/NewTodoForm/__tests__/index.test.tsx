import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewTodoForm } from "..";
import { QueryClient } from "@tanstack/react-query";
import { CreateTodo } from "@/repositories";
import { unCompletedTodo } from "@/__fixtures__/todo";
import { WebApiWrap } from "@/__fixtures__/helper";

describe("NewTodoForm", () => {
  const onCancel = vi.fn();
  const onSaved = vi.fn();

  const client = new QueryClient();

  const output = (createTodo?: CreateTodo) =>
    render(<NewTodoForm onCancel={onCancel} onSaved={onSaved} />, {
      wrapper({ children }) {
        const overrides = createTodo
          ? {
              createTodo,
            }
          : undefined;
        return (
          <WebApiWrap client={client} overrideRepositories={overrides}>
            {children}
          </WebApiWrap>
        );
      },
    });

  const createTodoOk = async () => unCompletedTodo;
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
