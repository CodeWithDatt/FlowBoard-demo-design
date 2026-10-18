"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { GoogleIcon, DiscordIcon, AppleIcon } from "./ProviderIcons";
import { GithubIcon } from "@/components/common/SocialIcons";

type Provider = "google" | "discord" | "github" | "apple";

const secondaryProviders: {
  key: Provider;
  label: string;
  icon: typeof DiscordIcon;
}[] = [
  {
    key: "discord",
    label: "Continue with Discord",
    icon: DiscordIcon,
  },
  {
    key: "github",
    label: "Continue with GitHub",
    icon: GithubIcon,
  },
  {
    key: "apple",
    label: "Continue with Apple",
    icon: AppleIcon,
  },
];

const OAuthButtons = () => {
  const [pending, setPending] = useState<Provider | null>(null);

  const handleProvider = async (provider: Provider) => {
    setPending(provider);

    // TODO: redirect to /api/auth/{provider} once the backend OAuth
    // routes exist. This is a visual placeholder for now.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setPending(null);
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* ================= GOOGLE ================= */}

      <button
        type="button"
        onClick={() => handleProvider("google")}
        disabled={pending !== null}
        className="flex h-11 items-center justify-center gap-2.5 rounded-lg border border-border bg-surface text-[13.5px] font-medium text-ink transition-colors duration-200 hover:bg-surface-hover disabled:opacity-70"
      >
        {pending === "google" ? (
          <Loader2 size={16} className="animate-spin text-ink-2" />
        ) : (
          <GoogleIcon size={17} />
        )}
        Continue with Google
      </button>

      {/* ================= DISCORD / GITHUB / APPLE ================= */}

      <div className="grid grid-cols-3 gap-2.5">
        {secondaryProviders.map(({ key, label, icon: Icon }) => {
          const iconColor =
            key === "discord"
              ? "text-[#5865F2]"
              : key === "github"
                ? "text-[#181717] dark:text-[#F0F6FC]"
                : "text-[#000000] dark:text-[#FFFFFF]";

          return (
            <button
              key={key}
              type="button"
              onClick={() => handleProvider(key)}
              disabled={pending !== null}
              aria-label={label}
              title={label}
              className="flex h-11 items-center justify-center rounded-lg border border-border bg-surface transition-colors duration-200 hover:bg-surface-hover disabled:opacity-70"
            >
              {pending === key ? (
                <Loader2 size={16} className={`animate-spin ${iconColor}`} />
              ) : (
                <Icon size={17} className={iconColor} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OAuthButtons;
