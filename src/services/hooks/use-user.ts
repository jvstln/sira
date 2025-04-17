import { getCurrentUser } from "@/services/api/user.api";
import { User } from "@/types/user.type";
import useSWR from "swr";

export const useCurrentUser = () => {
  const { data: user, ...swrProps } = useSWR<User>(
    "/auth/user/me",
    getCurrentUser,
    { revalidateOnFocus: false }
  );

  return {
    user,
    ...swrProps,
  };
};
