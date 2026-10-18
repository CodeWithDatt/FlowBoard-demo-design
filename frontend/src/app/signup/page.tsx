"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

import AuthShell from "@/components/auth/AuthShell";
import OAuthButtons from "@/components/auth/OAuthButtons";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";

import { authApi } from "@/services/api";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ========================================
  // Handle Signup
  // ========================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    // ========================================
    // 1. Client-side validation
    // ========================================

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      setError(
        "Fill in every field to create your workspace.",
      );

      return;
    }

    if (trimmedName.length < 2) {
      setError(
        "Your name must be at least 2 characters.",
      );

      return;
    }

    if (password.length < 8) {
      setError(
        "Use at least 8 characters for your password.",
      );

      return;
    }

    // ========================================
    // 2. Start loading
    // ========================================

    setIsLoading(true);

    try {
      // ========================================
      // 3. Send signup request to backend
      // ========================================

      await authApi.signup({
        name: trimmedName,
        email: trimmedEmail,
        password,
      });

      // ========================================
      // 4. Signup successful
      // ========================================

      router.push("/login");
    } catch (error) {
      // ========================================
      // 5. Handle backend error
      // ========================================

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Something went wrong while creating your account.",
        );
      }
    } finally {
      // ========================================
      // 6. Stop loading
      // ========================================

      setIsLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="mb-5">
        <h1 className="font-display text-[1.7rem] font-semibold tracking-tight text-ink">
          Create your workspace
        </h1>

        <p className="mt-1.5 text-[13.5px] text-ink-2">
          Free for individuals. No credit card required.
        </p>
      </div>

      <OAuthButtons />

      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />

        <span className="font-mono text-[10.5px] text-ink-3">
          OR CONTINUE WITH EMAIL
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
        noValidate
      >
        <AuthInput
          id="signup-name"
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />

        <AuthInput
          id="signup-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        <PasswordInput
          id="signup-password"
          label="Password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        {error && (
          <p
            role="alert"
            className="text-[12.5px] text-danger"
          >
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
              <Loader2
                size={16}
                className="animate-spin"
              />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight size={15} />
            </>
          )}
        </button>

        <p className="text-center text-[11.5px] leading-relaxed text-ink-3">
          By creating an account you agree to FlowBoard&apos;s{" "}
          <Link
            href="/terms"
            className="underline underline-offset-2 hover:text-ink-2"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-ink-2"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      <p className="mt-4 text-center text-[13px] text-ink-2">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-accent hover:text-accent-hover"
        >
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}