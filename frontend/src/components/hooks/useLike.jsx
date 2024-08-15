import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useLike = () => {
  const queryClient = useQueryClient();
  const { mutate: likePost } = useMutation({
    mutationKey: ["like"],
    mutationFn: async (postId) => {
      try {
        await axios.post(`/api/posts/like/${postId}`);
        queryClient.refetchQueries({
          queryKey: ["post"],
        });
        queryClient.refetchQueries({
          queryKey: ["postById"],
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  });
  return { likePost };
};

export default useLike;
