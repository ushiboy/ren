import {
  RenderHookResult,
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { UseTodosPage, useTodosPage } from "..";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RepositoryContextProvider } from "@/presentations/contexts";
import { repositoryComposition } from "@/repositoryComposition";

describe("useTodosPage", () => {
  const client = new QueryClient();

  const hook = () =>
    renderHook(() => useTodosPage(), {
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
    });

    test("新しいTodo追加を終了して一覧を再取得する", async () => {
      act(() => r.result.current.refreshPage());
      expect(r.result.current.isShowNewTodoForm).toBe(false);
      await waitFor(() => client.isFetching());
    });
  });
});
