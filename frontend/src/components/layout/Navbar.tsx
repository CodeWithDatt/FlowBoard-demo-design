"use client";

import Link from "next/link";

import { ArrowRight, Menu, X } from "lucide-react";

import { useRef, useState } from "react";

import { authApi } from "@/services/api";

import gsap from "gsap";

import { useGSAP } from "@gsap/react";

import ThemeToggle from "./ThemeToggle";

import ScrollProgress from "./ScrollProgress";

import { useCurrentUser } from "@/hooks/useCurrentUser";

const navLinks = [
  {
    label: "Workspaces",
    href: "#workspaces",
  },
  {
    label: "Connected system",
    href: "#connected-system",
  },
  {
    label: "How it works",
    href: "#how-it-works",
  },
  {
    label: "AI",
    href: "#ai",
  },
  {
    label: "About",
    href: "#about",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { user, isLoading: isUserLoading } = useCurrentUser();

  const menuOverlayRef = useRef<HTMLDivElement>(null);

  const menuPanelRef = useRef<HTMLDivElement>(null);

  const menuContentRef = useRef<HTMLDivElement>(null);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // ============================================================
  // MOBILE MENU ANIMATION
  // ============================================================

  useGSAP(
    () => {
      if (
        !menuOverlayRef.current ||
        !menuPanelRef.current ||
        !menuContentRef.current
      ) {
        return;
      }

      const menuItems = menuContentRef.current.querySelectorAll(".menu-item");

      if (isMenuOpen) {
        gsap.set(menuOverlayRef.current, {
          display: "block",
          autoAlpha: 0,
        });

        gsap.set(menuPanelRef.current, {
          autoAlpha: 0,
          y: -18,
          scale: 0.98,
        });

        gsap.set(menuItems, {
          autoAlpha: 0,
          y: -10,
        });

        gsap
          .timeline({
            defaults: {
              ease: "power3.out",
            },
          })
          .to(menuOverlayRef.current, {
            autoAlpha: 1,
            duration: 0.2,
          })
          .to(
            menuPanelRef.current,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.35,
            },
            "-=0.05",
          )
          .to(
            menuItems,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.055,
            },
            "-=0.15",
          );

        gsap.to(menuButtonRef.current, {
          scale: 0.96,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        });
      } else {
        gsap
          .timeline({
            defaults: {
              ease: "power2.inOut",
            },
          })
          .to(menuItems, {
            autoAlpha: 0,
            y: -6,
            duration: 0.15,
            stagger: {
              each: 0.025,
              from: "end",
            },
          })
          .to(
            menuPanelRef.current,
            {
              autoAlpha: 0,
              y: -12,
              scale: 0.985,
              duration: 0.2,
            },
            "-=0.05",
          )
          .to(
            menuOverlayRef.current,
            {
              autoAlpha: 0,
              duration: 0.2,
              onComplete: () => {
                if (menuOverlayRef.current) {
                  gsap.set(menuOverlayRef.current, {
                    display: "none",
                  });
                }
              },
            },
            "-=0.1",
          );
      }
    },
    {
      dependencies: [isMenuOpen],
    },
  );

  // ============================================================
  // MENU CONTROLS
  // ============================================================

  const toggleMenu = () => setIsMenuOpen((previous) => !previous);

  const closeMenu = () => setIsMenuOpen(false);

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    try {
      setIsLoggingOut(true);

      await authApi.logout();

      closeMenu();

      /*
       * The backend session has now been deleted.
       *
       * A normal client-side router navigation does not
       * necessarily reset the existing useCurrentUser()
       * state. A full navigation makes the homepage run
       * the authentication check again.
       */
      window.location.replace("/");
    } catch (error) {
      console.error("Homepage logout failed:", error);

      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* ============================================================
          NAVBAR
      ============================================================ */}

      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-xl">
        <ScrollProgress />

        <nav className="container-flow flex h-[72px] items-center justify-between">
          {/* ======================================================
              LOGO
          ====================================================== */}

          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-display text-sm font-semibold !text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              F
            </div>

            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              FlowBoard
            </span>
          </Link>

          {/* ======================================================
              DESKTOP NAVIGATION
          ====================================================== */}

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13.5px] font-medium text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ======================================================
              DESKTOP ACTIONS
          ====================================================== */}

          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />

            {!isUserLoading && user ? (
              <div className="flex items-center gap-2">
                {/* Open Dashboard */}

                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[13.5px] font-semibold !text-white transition-all duration-200 hover:bg-accent-hover"
                >
                  Open dashboard
                  <ArrowRight size={15} />
                </Link>

                {/* Logout */}

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="rounded-lg border border-border px-4 py-2.5 text-[13.5px] font-medium text-ink-2 transition-colors duration-200 hover:bg-surface-hover hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </button>
              </div>
            ) : !isUserLoading ? (
              <>
                {/* Login */}

                <Link
                  href="/login"
                  className="text-[13.5px] font-medium text-ink-2 transition-colors duration-200 hover:text-ink"
                >
                  Log in
                </Link>

                {/* Signup */}

                <Link
                  href="/signup"
                  className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[13.5px] font-semibold !text-white transition-all duration-200 hover:bg-accent-hover"
                >
                  Get started
                  <ArrowRight size={15} />
                </Link>
              </>
            ) : null}
          </div>

          {/* ======================================================
              MOBILE ACTIONS
          ====================================================== */}

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />

            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMenu}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-ink-2 transition-all duration-200 hover:text-ink active:scale-95"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ============================================================
          MOBILE MENU OVERLAY
      ============================================================ */}

      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-40 hidden bg-ink/40 backdrop-blur-sm lg:hidden"
        onClick={closeMenu}
      >
        <div
          ref={menuPanelRef}
          className="absolute top-[72px] right-0 left-0 border-b border-border bg-background"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="container-flow py-4">
            <div
              ref={menuContentRef}
              className="rounded-2xl border border-border bg-surface p-4 shadow-lg"
            >
              {/* ==================================================
                  MOBILE NAVIGATION LINKS
              ================================================== */}

              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    className="menu-item flex items-center rounded-xl px-4 py-3.5 text-sm font-medium text-ink-2 transition-all duration-200 hover:bg-surface-hover hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="menu-item my-3 h-px bg-border" />

              {/* ==================================================
                  MOBILE AUTH ACTIONS
              ================================================== */}

              {!isUserLoading && user ? (
                <div className="menu-item flex flex-col gap-2">
                  {/* Dashboard */}

                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3.5 text-sm font-semibold !text-white transition-all duration-200 active:scale-[0.99]"
                  >
                    Open dashboard
                    <ArrowRight size={17} />
                  </Link>

                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center justify-center rounded-xl border border-border px-4 py-3.5 text-sm font-medium text-ink-2 transition-all duration-200 hover:bg-surface-hover hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoggingOut ? "Logging out..." : "Log out"}
                  </button>
                </div>
              ) : !isUserLoading ? (
                <>
                  {/* Login */}

                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="menu-item flex items-center justify-center rounded-xl border border-border px-4 py-3.5 text-sm font-medium text-ink transition-all duration-200 hover:bg-surface-hover"
                  >
                    Log in
                  </Link>

                  {/* Signup */}

                  <div className="menu-item mt-3 rounded-2xl border border-border bg-background p-3">
                    <Link
                      href="/signup"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3.5 text-sm font-semibold !text-white transition-all duration-200 active:scale-[0.99]"
                    >
                      Get started
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
