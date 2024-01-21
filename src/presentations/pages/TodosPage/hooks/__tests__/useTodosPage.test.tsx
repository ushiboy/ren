import {
  RenderHookResult,
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { UseTodosPage, useTodosPage } from "..";
import { QueryClient } from "@tanstack/react-query";
import { WebApiWrap } from "@/__fixtures__/helper";
import { completedTodo, unCompletedTodo } from "@/__fixtures__/todo";

describe("useTodosPage", () => {
  const client = new QueryClient();

  const hook = () =>
    renderHook(() => useTodosPage(), {
      wrapper({ children }) {
        return (
          <WebApiWrap
            client={client}
            overrideRepositories={{
              getTodos: async () => [unCompletedTodo, completedTodo],
            }}
          >
            {children}
          </WebApiWrap>
        );
      },
    });

  let r: RenderHookResult<UseTodosPage, unknown>;

  beforeEach(async () => {
    r = hook();
    await waitFor(() => client.isFetching());
  });

  describe("startAddingNewTodo", () => {
    test("新しいTodo追加を開始する", async () => {
      expect(r.result.current.isShowNewTodoForm).toBe(false);

      act(() => r.result.current.startAddingNewTodo());
      expect(r.result.current.isShowNewTodoForm).toBe(true);
    });
  });

  describe("stopAddingNewTodo", () => {
    beforeEach(() => {
      // 事前に新しいTodo追加を開始しておく
      act(() => r.result.current.startAddingNewTodo());
      expect(r.result.current.isShowNewTodoForm).toBe(true);
    });

    test("新しいTodo追加を終了する", async () => {
      act(() => r.result.current.stopAddingNewTodo());
      expect(r.result.current.isShowNewTodoForm).toBe(false);
    });
  });

  describe("refreshPage", () => {
    beforeEach(() => {
      // 事前に新しいTodo追加を開始しておく
      act(() => r.result.current.startAddingNewTodo());
      expect(r.result.current.isShowNewTodoForm).toBe(true);
      act(() => r.result.current.selectTodo(unCompletedTodo));
      expect(r.result.current.selectedTodo).toBe(unCompletedTodo);
    });

    test("新しいTodo追加を終了して一覧を再取得する", async () => {
      act(() => r.result.current.refreshPage());
      expect(r.result.current.isShowNewTodoForm).toBe(false);
      await waitFor(() => client.isFetching());
    });

    test("選択状態のTodoを解除する", async () => {
      act(() => r.result.current.refreshPage());
      await waitFor(() => client.isFetching());
      expect(r.result.current.selectedTodo).toBeUndefined();
    });
  });

  describe("selectTodo", () => {
    test("指定したTodoを選択状態にする", async () => {
      expect(r.result.current.selectedTodo).toBeUndefined();

      act(() => r.result.current.selectTodo(unCompletedTodo));
      expect(r.result.current.selectedTodo).toBe(unCompletedTodo);
    });
  });

  describe("clearSelectedTodo", () => {
    beforeEach(() => {
      act(() => r.result.current.selectTodo(unCompletedTodo));
      expect(r.result.current.selectedTodo).toBe(unCompletedTodo);
    });

    test("Todoの選択を解除にする", async () => {
      act(() => r.result.current.clearSelectedTodo());
      expect(r.result.current.selectedTodo).toBeUndefined();
    });
  });
});
