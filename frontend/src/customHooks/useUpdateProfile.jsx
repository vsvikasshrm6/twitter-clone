import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const { mutate: updateProfile,error, isPending} = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await fetch("/api/user/update", {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          throw new Error(error);
        }
        const data = await res.json();
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({queryKey : ["Profile"]})
      queryClient.invalidateQueries({queryKey : ["authUser"]})
    },
  });
  return {updateProfile, isPending}
};

export default useUpdateProfile;