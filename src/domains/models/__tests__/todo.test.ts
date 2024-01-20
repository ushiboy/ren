import { unCompletedTodo, unCompletedTodoRaw } from "@/__fixtures__/todo";
import { convertRawToTodo } from "../todo";

describe("convertRawToTodo", () => {
  test("レスポンスデータをTodoモデルに変換する", () => {
    expect(convertRawToTodo(unCompletedTodoRaw)).toEqual(unCompletedTodo);
  });
});
