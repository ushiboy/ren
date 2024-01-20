import { WebApiDebugger } from "@/WebApiDebugger";
import { TodosPage } from "./pages";

export function App() {
  return (
    <>
      <TodosPage />
      <hr />
      <WebApiDebugger />
    </>
  );
}
