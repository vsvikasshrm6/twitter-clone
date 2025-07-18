import { useMutation, useQueryClient } from "@tanstack/react-query";

const useFollow = () => {
  const queryClient = new useQueryClient();
  const {
    mutate: follow,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["follow"],
    mutationFn: async (userId) => {
      try {
        const res = await fetch(`/api/follow/${userId}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(error);
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(["authUser"]),
        queryClient.invalidateQueries(["suggestedUser"]),
      ]);
    },
  });
  return {isPending, follow}
};

export default useFollow;