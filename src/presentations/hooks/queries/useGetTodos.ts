import { useQuery } from "@tanstack/react-query";
import { useRepository } from "@/presentations/contexts";

export const useGetTodos = () => {
  const { getTodos } = useRepository();
  return useQuery({
    queryKey: ["getTodos"],
    queryFn: getTodos,
  });
};
