import { useState, useEffect, useCallback } from "react";
import { getSession, logout as logoutFn, type Session } from "../lib/auth";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSession(getSession());
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    logoutFn();
    setSession(null);
  }, []);

  const refresh = useCallback(() => {
    setSession(getSession());
  }, []);

  return { session, loading, logout, refresh };
}
