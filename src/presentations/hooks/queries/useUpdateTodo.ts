import { useMutation } from "@tanstack/react-query";
import { useRepository } from "@/presentations/contexts";

export const useUpdateTodo = () => {
  const { updateTodo } = useRepository();
  return useMutation({
    mutationFn: updateTodo,
  });
};
