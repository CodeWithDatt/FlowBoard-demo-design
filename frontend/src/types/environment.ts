import type { LucideIcon } from "lucide-react";

/**
 * The six conceptual environments of FlowBoard. Every section of the
 * landing page that references "the six environments" (Workspaces,
 * Features, Footer, How It Works) pulls from the same source of truth
 * in `constants/environments.ts` so copy and color never drift apart.
 */
export type EnvironmentKey =
  | "draw"
  | "write"
  | "design"
  | "plan"
  | "connect"
  | "resources";

export interface Environment {
  key: EnvironmentKey;
  index: string;
  name: string;
  verb: string;
  tagline: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  /** Matches a `--color-{key}` token defined in globals.css */
  colorVar: EnvironmentKey;
}
