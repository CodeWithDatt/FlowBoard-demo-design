"use client";

import Link from "next/link";
import { GithubIcon, LinkedinIcon, XIcon } from "./SocialIcons";
import { environments } from "@/constants/environments";

const footerColumns = [
  {
    title: "Product",
    links: environments.map((env) => ({ label: env.name, href: `#workspaces` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Status", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

const socials = [
  { icon: XIcon, href: "#", label: "X (Twitter)" },
  { icon: GithubIcon, href: "#", label: "GitHub" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
];

const FooterSection = () => {
  return (
    <footer className="bg-surface-2 pt-20 pb-10">
      <div className="container-flow">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-display text-sm font-semibold text-accent-ink">
                F
              </div>
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                FlowBoard
              </span>
            </Link>
            <p className="mt-4 max-w-[32ch] text-[13.5px] leading-relaxed text-ink-2">
              Create anywhere. Use everywhere. Connect everything.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-2 transition-colors duration-200 hover:border-border-strong hover:text-ink"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="font-mono text-[11px] tracking-wide text-ink-3">
                  {column.title.toUpperCase()}
                </p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-ink-2 transition-colors duration-200 hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="font-mono text-[11px] text-ink-3">
            © {new Date().getFullYear()} FlowBoard. Built for connected work.
          </p>
          <p className="font-mono text-[11px] text-ink-3">v0.1.0 — MVP</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
