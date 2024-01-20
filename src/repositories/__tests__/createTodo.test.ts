import axios from "axios";
import { vi } from "vitest";
import { createTodo } from "../createTodo";
import { unCompletedTodo, unCompletedTodoRaw } from "@/__fixtures__/todo";

vi.mock("axios");
const mocked = vi.mocked(axios.post);

describe("createTodo", () => {
  const title = unCompletedTodoRaw.title;

  beforeEach(() => {
    mocked.mockResolvedValue({
      data: { ...unCompletedTodoRaw },
    });
  });

  test("Todoを作成してレスポンスデータをTodoモデルに変換する", async () => {
    const r = await createTodo(title);
    expect(r).toEqual(unCompletedTodo);
  });
});
