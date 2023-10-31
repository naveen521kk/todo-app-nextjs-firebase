import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/router";

import { createUser, signIn } from "@/firebase/auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface UserFormProps extends React.HTMLAttributes<HTMLDivElement> {
  form: { email: string; password: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
  onSubmit: any;
  errorMessage: string | null;
  isLoading: boolean;
}

function UserForm({
  form,
  setForm,
  isLoading,
  className,
  onSubmit,
  errorMessage,
  ...props
}: UserFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        {errorMessage && (
          <>
            <Alert variant="destructive" className="mb-3">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          </>
        )}
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              value={form.password}
              onChange={(event) =>
                setForm({ ...form, password: event.target.value })
              }
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login / Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export function UserSignupForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    console.log("Creating an account!");
    try {
      const user = await createUser(form.email, form.password);
      console.log(user);
    } catch (error: any) {
      console.log("Error creating user", error);
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    router.push("/login");
  }

  return (
    <UserForm
      form={form}
      setForm={setForm}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
      isLoading={isLoading}
      className={className}
      {...props}
    />
  );
}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    console.log("Logging in!");
    try {
      const user = await signIn(form.email, form.password);
      console.log(user);
    } catch (error: any) {
      console.log("Error logging in", error);
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    router.push("/app");
  }

  return (
    <UserForm
      form={form}
      setForm={setForm}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
      isLoading={isLoading}
      className={className}
      {...props}
    />
  );
}
