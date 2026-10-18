"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

import AuthShell from "@/components/auth/AuthShell";
import OAuthButtons from "@/components/auth/OAuthButtons";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";

type LoginResponse = {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    // ========================================
    // 1. Basic validation
    // ========================================

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Enter your email and password to continue.");

      return;
    }

    setIsLoading(true);

    try {
      // ======================================
      // 2. Backend URL
      // ======================================

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      // ======================================
      // 3. Send login request
      // ======================================

      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      // ======================================
      // 4. Read response safely
      // ======================================

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "The server returned an unexpected response. Make sure the backend is running on http://localhost:5000.",
        );
      }

      const data: LoginResponse = await response.json();

      // ======================================
      // 5. Handle backend error
      // ======================================

      if (!response.ok || !data.success) {
        setError(
          data.message || "Unable to log in. Please check your credentials.",
        );

        return;
      }

      // ======================================
      // 6. Login successful
      // ======================================

      router.replace("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Unable to connect to FlowBoard. Please make sure the backend is running.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="mb-6">
        <h1 className="font-display text-[1.7rem] font-semibold tracking-tight text-ink">
          Welcome back
        </h1>

        <p className="mt-1.5 text-[13.5px] text-ink-2">
          Log in to keep your work connected.
        </p>
      </div>

      <OAuthButtons />

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />

        <span className="font-mono text-[10.5px] text-ink-3">
          OR CONTINUE WITH EMAIL
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3.5"
        noValidate
      >
        <AuthInput
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="text-[12.5px] font-medium text-ink-2"
            >
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-[12px] font-medium text-accent hover:text-accent-hover"
            >
              Forgot password?
            </Link>
          </div>

          <div className="mt-1.5">
            <PasswordInput
              id="login-password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-[12.5px] leading-relaxed text-danger">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-1 flex h-11 items-center justify-center gap-2 rounded-lg bg-accent text-[13.5px] font-semibold text-accent-ink transition-all duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              Log in
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      <p className="mt-5 text-center text-[13px] text-ink-2">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-accent hover:text-accent-hover"
        >
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}
