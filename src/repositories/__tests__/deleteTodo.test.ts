import axios from "axios";
import { vi } from "vitest";
import { deleteTodo } from "../deleteTodo";
import { unCompletedTodo } from "@/__fixtures__/todo";

vi.mock("axios");
const mocked = vi.mocked(axios.delete);

describe("deleteTodo", () => {
  beforeEach(() => {
    mocked.mockResolvedValue({
      status: 204,
    });
  });

  test("Todoを削除する", async () => {
    const r = await deleteTodo(unCompletedTodo);
    expect(r).toBeUndefined();
  });
});
