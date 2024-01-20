import axios from "axios";
import { vi } from "vitest";
import { getTodos } from "../getTodos";
import { TodoRaw } from "@/domains/models";

vi.mock("axios");
const mocked = vi.mocked(axios.get);

describe("getTodos", () => {
  const raw: TodoRaw = {
    id: 1,
    title: "a",
    completed: false,
    createdAt: "2020-01-01",
    updatedAt: "2020-01-02",
  };

  beforeEach(() => {
    mocked.mockResolvedValue({
      data: {
        todos: [raw],
      },
    });
  });

  test("レスポンスデータをTodoモデルのリストに変換する", async () => {
    const r = await getTodos();
    expect(r).toEqual([
      {
        ...raw,
        createdAt: new Date(raw.createdAt),
        updatedAt: new Date(raw.updatedAt),
      },
    ]);
  });
});
