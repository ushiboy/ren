/**
 * Todos Mock Api
 */
import { delay, http, HttpResponse, PathParams } from "msw";
import { setupWorker } from "msw/browser";
import Dexie from "dexie";

interface Todo {
  id?: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface DraftTodo {
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DraftEditTodo {
  title: string;
  completed: boolean;
}

class TodoDb extends Dexie {
  todos: Dexie.Table<Todo, number>;
  constructor() {
    super("TodoDb");
    this.version(1).stores({
      todos: "++id, title, completed, createdAt, updatedAt",
    });
    this.todos = this.table("todos");
  }
}

const db = new TodoDb();

const handlers = [
  http.post<PathParams, DraftTodo>("/api/todos", async ({ request }) => {
    const { title } = await request.json();
    await delay(1000);
    if (!title || title.length > 100) {
      return new HttpResponse(null, {
        status: 400,
      });
    }
    const id = await db.todos.add({
      title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const todo = await db.todos.get(id);
    return new HttpResponse(JSON.stringify(todo), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.get("/api/todos", async () => {
    const todos = await db.todos.toArray();
    return HttpResponse.json({
      todos,
    });
  }),
  http.put<{ id: string }, DraftEditTodo>(
    "/api/todos/:id",
    async ({ request, params }) => {
      const id = Number(params.id);
      const todo = await db.todos.get(id);
      await delay(1000);
      if (!todo) {
        return new HttpResponse(null, {
          status: 404,
        });
      }
      const { title, completed } = await request.json();
      if (!title || title.length > 100) {
        return new HttpResponse(null, {
          status: 400,
        });
      }
      await db.todos.update(todo, {
        title,
        completed,
        updatedAt: new Date(),
      });
      const updated = await db.todos.get(id);
      return new HttpResponse(JSON.stringify(updated), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  ),
  http.delete<{ id: string }>("/api/todos/:id", async ({ params }) => {
    const id = Number(params.id);
    const todo = await db.todos.get(id);
    await delay(1000);
    if (!todo) {
      return new HttpResponse(null, {
        status: 404,
      });
    }
    await db.todos.delete(id);
    return new HttpResponse(null, {
      status: 204,
    });
  }),
];

export const worker = setupWorker(...handlers);
