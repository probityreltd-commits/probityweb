"use client";

import { useSession } from "@/lib/auth-client";

export const useAuth = () => {
  const { data: session, isPending } = useSession();

  return {
    user: session?.user,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
  };
};
