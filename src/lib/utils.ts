/* eslint-disable react-hooks/exhaustive-deps */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const guardCtx = createContext<ReturnType<typeof useAuthStorage> | null>(null);

export function useAuthStorage() {
  const store = useUserStore()
  console.log(store)
  return {
    get value(): { authenticated: boolean } {
      return {
        authenticated: Boolean(store.isLoggedIn)
      }
    },
    get user() {
      return store.session?.user
    }
  }
}

export function useGuard() {
   const navigate = useNavigate()
   const authStore = useAuthStorage()
    useEffect(() => {
      if (!authStore.value.authenticated) {
          navigate('/login')
      }
    }, [])
    
   return {
    get authenticated() {
      return authStore.value.authenticated
    }
   }
}

