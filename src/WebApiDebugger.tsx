/**
 * Web Api Debugger
 */
export function WebApiDebugger() {
  return (
    <div>
      <h1>Todos API Debug</h1>
      <button
        onClick={async () => {
          const r = await fetch("/api/todos");
          const data = await r.json();
          console.table(data.todos);
        }}
      >
        GET /api/todos
      </button>
      <hr />
      <form
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const title = form.get("title");
          const r = await fetch("/api/todos", {
            method: "POST",
            body: JSON.stringify({
              title,
            }),
          });
          console.log(r.status);
        }}
      >
        <input type="text" name="title" />
        <button type="submit">POST /api/todos</button>
      </form>
      <hr />
      <form
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const title = form.get("title");
          const id = form.get("id");
          const completed = Boolean(form.get("completed"));
          const r = await fetch(`/api/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify({
              title,
              completed,
            }),
          });
          console.log(r.status);
        }}
      >
        <input type="number" name="id" />
        <input type="text" name="title" />
        <input type="checkbox" name="completed" value="true" />
        <button type="submit">PUT /api/todos/:id</button>
      </form>
      <hr />
      <form
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const id = form.get("id");
          const r = await fetch(`/api/todos/${id}`, {
            method: "DELETE",
          });
          console.log(r.status);
        }}
      >
        <input type="number" name="id" />
        <button type="submit">DELETE /api/todos/:id</button>
      </form>
    </div>
  );
}
