import { convertRawToTodo, TodoRaw } from "../todo";

describe("convertRawToTodo", () => {
  const raw: TodoRaw = {
    id: 1,
    title: "a",
    completed: false,
    createdAt: "2020-01-01",
    updatedAt: "2020-01-02",
  };

  test("レスポンスデータをTodoモデルに変換する", () => {
    expect(convertRawToTodo(raw)).toEqual({
      ...raw,
      createdAt: new Date(raw.createdAt),
      updatedAt: new Date(raw.updatedAt),
    });
  });
});
