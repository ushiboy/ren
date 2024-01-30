import { render } from "@testing-library/react";
import { TodoListRow } from "../TodoListRow";
import { unCompletedTodo, completedTodo } from "@/__fixtures__/todo";
import { Todo } from "@/domains/models";
import { vi } from "vitest";

describe("TodoListRow", () => {
  const onClick = vi.fn();

  const output = (todo: Todo) =>
    render(<TodoListRow todo={todo} onClick={onClick} />, {
      wrapper({ children }) {
        return (
          <table>
            <tbody>{children}</tbody>
          </table>
        );
      },
    });

  test("titleを表示する", async () => {
    const r = output(completedTodo);
    expect(r.getByTestId("todoTitle").textContent).toBe(completedTodo.title);
  });

  describe("完了済みの場合", () => {
    test("oを表示する", async () => {
      const r = output(completedTodo);
      expect(r.getByTestId("completed").textContent).toBe("o");
    });
  });

  describe("未完了の場合", () => {
    test("xを表示する", async () => {
      const r = output(unCompletedTodo);
      expect(r.getByTestId("completed").textContent).toBe("x");
    });
  });

  test("createdAtをフォーマットして表示する", async () => {
    const r = output(completedTodo);
    expect(r.getByTestId("createdAt").textContent).toBe("2020/1/1");
  });
});
