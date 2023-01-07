import axios from "axios";

const addUser = async (user: User): Promise<User> => {
  const { data } = await axios.post("/api/users", user);
  return data;
};

export function useAddUser() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(addUser, {
    onSuccess: (user: User) => {
      queryClient.setQueryData<User[]>(["users"], (oldUsers) =>
        addOne(oldUsers, user)
      );
    },
  });

  return { isAdding: isLoading, addUser: mutateAsync };
}
