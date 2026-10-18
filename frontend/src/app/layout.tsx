import type { Metadata } from "next";
import { Instrument_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "FlowBoard — Create Anywhere. Use Everywhere. Connect Everything.",
  description:
    "FlowBoard is a connected creative workspace. Draw, write, design and plan in specialized environments that stay wired to one shared body of work.",
};

/**
 * Sets the `dark` class on <html> before React hydrates, using the
 * user's saved preference or their OS setting. This runs synchronously
 * in <head>, so there is no light-flash on a dark-mode visit.
 */
const noFlashThemeScript = `
(function () {
  try {
    var stored = localStorage.getItem("flowboard-theme");
    var theme = stored
      ? stored
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body
        className={`${instrumentSans.variable} ${inter.variable} ${jetbrainsMono.variable} bg-background font-body text-ink antialiased`}
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            <ToastProvider>{children}</ToastProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
