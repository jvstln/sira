import { getCurrentUser } from "@/services/api/user.api";
import { User } from "@/types/user.type";
import useSWR from "swr";

export const useCurrentUser = (disableRevalidation?: boolean) => {
  const { data: user, ...swrProps } = useSWR<User>(
    "/auth/user/me",
    getCurrentUser,
    {
      revalidateOnFocus: false,
      revalidateIfStale: !disableRevalidation,
      revalidateOnReconnect: !disableRevalidation,
    }
  );

  return {
    user,
    ...swrProps,
  };
};
