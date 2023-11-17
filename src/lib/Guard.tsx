import { guardCtx, useAuthStorage } from "./utils";


export function Guard({ children }) {
  const authenticated = useAuthStorage()
  return (
    <guardCtx.Provider
      value={authenticated}
    >{children}</guardCtx.Provider>
  );
}
