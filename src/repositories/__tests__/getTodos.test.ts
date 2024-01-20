import axios from "axios";
import { vi } from "vitest";
import { getTodos } from "../getTodos";
import { unCompletedTodo, unCompletedTodoRaw } from "@/__fixtures__/todo";

vi.mock("axios");
const mocked = vi.mocked(axios.get);

describe("getTodos", () => {
  beforeEach(() => {
    mocked.mockResolvedValue({
      data: {
        todos: [unCompletedTodoRaw],
      },
    });
  });

  test("レスポンスデータをTodoモデルのリストに変換する", async () => {
    const r = await getTodos();
    expect(r).toEqual([unCompletedTodo]);
  });
});
