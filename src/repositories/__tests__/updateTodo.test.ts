import axios from "axios";
import { vi } from "vitest";
import { updateTodo } from "../updateTodo";
import { Todo, TodoRaw } from "@/domains/models";

vi.mock("axios");
const mocked = vi.mocked(axios.put);

describe("updateTodo", () => {
  const todo: Todo = {
    id: 1,
    title: "a",
    completed: false,
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2020-01-02"),
  };
  const raw: TodoRaw = {
    id: 1,
    title: "a",
    completed: false,
    createdAt: "2020-01-01",
    updatedAt: "2020-01-02",
  };

  beforeEach(() => {
    mocked.mockResolvedValue({
      data: { ...raw },
    });
  });

  test("Todoを更新してレスポンスデータをTodoモデルに変換する", async () => {
    const r = await updateTodo(todo);
    expect(r).toEqual({
      ...raw,
      createdAt: new Date(raw.createdAt),
      updatedAt: new Date(raw.updatedAt),
    });
  });
});
