"use client";

import { useEffect, useState } from "react";
import { authApi } from "@/services/api";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
};

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await authApi.me();

        if (active) {
          setUser((response.user as CurrentUser | undefined) ?? null);
        }
      } catch {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return { user, isLoading };
}
