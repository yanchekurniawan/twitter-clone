import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useUpdateProfileUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (data) => {
      try {
        await axios.put("/api/users/update", {
          ...data,
        });
        queryClient.refetchQueries({ queryKey: ["userProfile"] });
        queryClient.refetchQueries({ queryKey: ["authUser"] });
        queryClient.refetchQueries({ queryKey: ["post"] });
        document.getElementById("editProfileModal").close();
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  return { updateProfile, isPending };
};

export default useUpdateProfileUser;
