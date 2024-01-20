import axios from "axios";
import { vi } from "vitest";
import { createTodo } from "../createTodo";
import { TodoRaw } from "@/domains/models";

vi.mock("axios");
const mocked = vi.mocked(axios.post);

describe("createTodo", () => {
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

  test("Todoを作成してレスポンスデータをTodoモデルに変換する", async () => {
    const r = await createTodo(raw.title);
    expect(r).toEqual({
      ...raw,
      createdAt: new Date(raw.createdAt),
      updatedAt: new Date(raw.updatedAt),
    });
  });
});
