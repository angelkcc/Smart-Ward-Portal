"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { UNAUTHORIZED_EVENT } from "@/lib/api";
import * as authService from "@/services/auth.service";
import * as userService from "@/services/user.service";
import type { User } from "@/types";

interface AuthValue {
  /** The signed-in user as reported by the server, or null. */
  user: User | null;
  /** True until the first "who am I?" check has finished. */
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);

/**
 * Authentication is cookie based: the backend sets an `access_token` cookie on
 * login and reads it on every protected request. This provider never touches
 * the token. It simply asks the server (GET /users/profile) who is signed in,
 * so the role shown in the UI always comes from the server.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    userService
      .getProfile()
      .then((profile) => {
        if (!cancelled) setUser(profile);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Any 401 from the API means the cookie is missing or expired.
  useEffect(() => {
    const onUnauthorized = () => setUser(null);
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authService.login(email, password);
    setUser(result.user);
    return result.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      loading,
      isAdmin: user?.role === "ADMIN",
      login,
      logout,
    }),
    [user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
