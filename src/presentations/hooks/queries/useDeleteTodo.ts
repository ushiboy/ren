import { useMutation } from "@tanstack/react-query";
import { useRepository } from "@/presentations/contexts";

export const useDeleteTodo = () => {
  const { deleteTodo } = useRepository();
  return useMutation({
    mutationFn: deleteTodo,
  });
};
