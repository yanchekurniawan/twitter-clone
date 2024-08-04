import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: follow, isPending } = useMutation({
    mutationKey: ["follow"],
    mutationFn: async (userId) => {
      try {
        await axios.post(`/api/users/follow/${userId}`);
        queryClient.refetchQueries({ queryKey: ["suggestedUser"] });
        queryClient.refetchQueries({ queryKey: ["userProfile"] });
        queryClient.refetchQueries({ queryKey: ["authUser"] });
        document.getElementById("confirmUnfollow").close();
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  return { follow, isPending };
};

export default useFollow;
