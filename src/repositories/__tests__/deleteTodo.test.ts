import axios from "axios";
import { vi } from "vitest";
import { deleteTodo } from "../deleteTodo";
import { Todo } from "@/domains/models";

vi.mock("axios");
const mocked = vi.mocked(axios.delete);

describe("deleteTodo", () => {
  const todo: Todo = {
    id: 1,
    title: "a",
    completed: false,
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2020-01-02"),
  };

  beforeEach(() => {
    mocked.mockResolvedValue({
      status: 204,
    });
  });

  test("Todoを削除する", async () => {
    const r = await deleteTodo(todo);
    expect(r).toBeUndefined();
  });
});
