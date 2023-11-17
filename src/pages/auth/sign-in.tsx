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
import { createUser } from "@/lib/supabase";
import { useAuthStorage } from "@/lib/utils";
import { FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toJSON } from "./toJSON";

function SignUpLayout({ children }: { children: React.ReactNode }) {
  const authStore = useAuthStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.value.authenticated) navigate("/home");
  }, [authStore.value.authenticated, navigate]);

  return (
    <section className="h-screen w-screen flex md:flex-row">
      <div className="w-full p-9 md:w-1/2">{children}</div>
      <div className="relative hidden md:block md:w-1/2">
        <div className="hidden md:block absolute top-0 bottom-0 left-0 right-0 h-full w-full bg-primary bg-opacity-80" />
        <div className="absolute top-0 bottom-0 left-0 right-0 h-full w-full flex flex-col space-y-3 items-center justify-center">
          <div className="text-white text-4xl font-bold">
            Welcome to <span className="text-white">RC-Twitter</span>
          </div>
          <p className="text-white text-lg">
            A Twitter Clone Built with React, RC-Extended, and TailwindCSS
          </p>
        </div>
      </div>
    </section>
  );
}

function SignUpComponent() {
  async function signUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formdata = new FormData(event.target as HTMLFormElement)

    const { password2, ...data } = toJSON<{ email: string; phone: string; age: string; password: string; firstname: string; lastname: string; dob: string; password2: string }>(formdata)

    if (data.password !== password2 ) {
      alert("Password doesn't match")
      return
    }

    const { error, data: user } = await createUser({
      email: data.email,
      password: data.password,
      phone: data.phone,
      options: {
        data: {
          age: data.age,
          first_name: data.firstname,
          last_name: data.lastname,
          dob: data.dob,
          created: Date.now().toString()
        }
      }
    })

    console.log(user, error)
  }

  return (
    <SignUpLayout>
      <form onSubmit={signUp} className="contents w-full h-[100dvh]">
        <Card className="m-auto md:border-none">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">
              Create An Account
            </CardTitle>
            <CardDescription>
              Create an account to continue using our services.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col space-y-3">
            <div>
              <label htmlFor="firstname" className="mb-2 font-medium text-md">
                First Name
              </label>
              <Input name="firstname" placeholder="FirstName" />
            </div>
            <div>
              <label htmlFor="lastname" className="mb-2 font-medium text-md">
                Last Name
              </label>
              <Input name="lastname" placeholder="Last Name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 font-medium text-md">
                Email
              </label>
              <Input name="email" type="email" autoSave="true" autoComplete="email" placeholder="user@example.com" />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 font-medium text-md">
                Phone
              </label>
              <Input name="phone" type="number" placeholder="user@example.com" />
            </div>
            <div>
              <label htmlFor="dob" className="mb-2 font-medium text-md">
                Date of Birth
              </label>
              <Input name="dob" type="date" placeholder="user@example.com" />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 font-medium text-md">
                Password
              </label>
              <Input name="password" autoSave="true" type="password" />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 font-medium text-md"
              >
                Confirm Password
              </label>
              <Input id="confirm-password" name="password2" type="password" />
            </div>
          </CardContent>

          <CardFooter className="flex-col space-y-2 items-start">
            <Button className="mb-2 bg-primary hover:bg-blend-overlay">
              Sign Up
            </Button>
            <p className="text-sm text-gray-500">
              Already Have an account?{" "}
              <Link
                className="italic font-medium text-primary hover:underline"
                to="/login"
              >
                Login
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </form>
    </SignUpLayout>
  );
}

export { SignUpComponent };
