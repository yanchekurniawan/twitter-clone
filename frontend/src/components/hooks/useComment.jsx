import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useComment = () => {
  const queryClient = useQueryClient();
  const { mutate: submitComment, isPending: isCommentPending } = useMutation({
    mutationKey: "comment",
    mutationFn: async ({ comment: text, postId }) => {
      try {
        await axios.post(`/api/posts/comment/${postId}`, {
          text,
        });
        queryClient.refetchQueries({
          queryKey: ["post"],
        });
        queryClient.refetchQueries({
          queryKey: ["postById"],
        });
      } catch (error) {
        toast(error.response.data.error, {
          position: "bottom-center",
          style: {
            backgroundColor: "#1D9BF0",
            color: "#fff",
          },
        });
      }
    },
  });

  return { submitComment, isCommentPending };
};

export default useComment;
