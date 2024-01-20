import { useMutation } from "@tanstack/react-query";
import { useRepository } from "@/presentations/contexts";

export const useCreateTodo = () => {
  const { createTodo } = useRepository();
  return useMutation({
    mutationFn: createTodo,
  });
};
