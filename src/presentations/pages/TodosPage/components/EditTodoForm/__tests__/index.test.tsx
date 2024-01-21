import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditTodoForm } from "..";
import { QueryClient } from "@tanstack/react-query";
import { UpdateTodo } from "@/repositories";
import { unCompletedTodo } from "@/__fixtures__/todo";
import { WebApiWrap } from "@/__fixtures__/helper";

describe("EditTodoForm", () => {
  const onCancel = vi.fn();
  const onSaved = vi.fn();

  const client = new QueryClient();

  const output = (updateTodo?: UpdateTodo) =>
    render(
      <EditTodoForm
        todo={unCompletedTodo}
        onCancel={onCancel}
        onSaved={onSaved}
      />,
      {
        wrapper({ children }) {
          const overrides = updateTodo
            ? {
                updateTodo,
              }
            : undefined;
          return (
            <WebApiWrap client={client} overrideRepositories={overrides}>
              {children}
            </WebApiWrap>
          );
        },
      },
    );

  const updateTodoOk = async () => unCompletedTodo;
  const updateTodoNg = async () => {
    throw new Error("error");
  };

  describe("必要な情報を入力して保存ボタンを押した場合", () => {
    const typeText = "2";
    const title = unCompletedTodo.title + typeText;

    describe("保存成功の場合", () => {
      test("onSavedイベントを発生させる", async () => {
        const user = userEvent.setup();
        const r = output(updateTodoOk);

        const titleText = r.getByTestId("titleText") as HTMLInputElement;
        await user.type(titleText, typeText);
        expect(titleText.value).toBe(title);

        const completedCheck = r.getByTestId(
          "completedCheck",
        ) as HTMLInputElement;
        await user.click(completedCheck);
        expect(completedCheck.checked).toBe(true);

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
        const r = output(updateTodoNg);

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
