import axios from "axios";
import { vi } from "vitest";
import { updateTodo } from "../updateTodo";
import { unCompletedTodo, unCompletedTodoRaw } from "@/__fixtures__/todo";

vi.mock("axios");
const mocked = vi.mocked(axios.put);

describe("updateTodo", () => {
  beforeEach(() => {
    mocked.mockResolvedValue({
      data: { ...unCompletedTodoRaw },
    });
  });

  test("Todoを更新してレスポンスデータをTodoモデルに変換する", async () => {
    const r = await updateTodo(unCompletedTodo);
    expect(r).toEqual(unCompletedTodo);
  });
});
