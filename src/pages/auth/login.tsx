/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStorage } from "@/lib/utils";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toJSON } from "./toJSON";
import { signInUser } from "@/lib/supabase";
import { useUserStore } from "@/lib/store";
import { $signal } from "rc-extended/store";
import { Show } from "rc-extended/components";

export function LoginForm() {
  const authStore = useAuthStorage();
  const navigate = useNavigate();
  const isPending = $signal(false);
  const { setUser } = useUserStore();

  useEffect(() => {
    if (authStore.value.authenticated) navigate("/home");
  }, []);

  if (authStore.value.authenticated) return null;

  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <Card className="border-0 sm:border md:w-[380px] w-[300px]">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">Login</CardTitle>
          <CardDescription>
            Login to your account to continue using our services.
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={async (e) => {
            isPending.value = true;
            e.preventDefault();
            const formdata = new FormData(e.target as HTMLFormElement);
            const data = toJSON<{ email: string; password: string }>(formdata);
            console.log(data);
            const res = await signInUser({
              email: data.email,
              password: data.password,
              phone: "",
            });
            console.log(res);

            //@ts-expect-error data is not null
            setUser(res?.data);

            isPending.value = false;

            navigate("/home");
          }}
        >
          <CardContent>
            <div className=" flex flex-col space-y-3">
              <div>
                <label htmlFor="user" className="mb-2 font-medium text-md">
                  Email
                </label>
                <Input disabled={isPending.value} name="email" type="email" />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 font-medium text-md">
                  Password
                </label>
                <Input disabled={isPending.value} name="password" type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div>
              <Button
                disabled={isPending.value}
                className="mb-2 bg-primary hover:bg-blend-overlay"
              >
                <Show $when={isPending} fallback="Log In">
                  Logging In...
                </Show>
              </Button>
              <p className="text-sm text-gray-500">
                Don't Have an account?{" "}
                <Link
                  className="italic font-medium text-primary hover:underline"
                  to="/sign-in"
                >
                  Sign In
                </Link>
                .
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
