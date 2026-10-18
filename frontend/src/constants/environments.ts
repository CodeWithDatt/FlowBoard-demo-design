import {
  FolderOpen,
  Frame,
  ListChecks,
  Network,
  PenTool,
  FileText,
} from "lucide-react";
import type { Environment } from "@/types/environment";

export const environments: Environment[] = [
  {
    key: "draw",
    index: "01",
    name: "Draw",
    verb: "Sketch it",
    tagline: "An infinite canvas for thinking out loud",
    description:
      "Pan, zoom and place freely on a canvas with no edges. Shapes, connectors and text, built on a real camera and coordinate system rather than a fixed page.",
    detail: "camera.x 240 · camera.y −80 · zoom 1.4",
    icon: PenTool,
    colorVar: "draw",
  },
  {
    key: "write",
    index: "02",
    name: "Write",
    verb: "Draft it",
    tagline: "A calm, vertical home for documentation",
    description:
      "Nested pages, headings and structure for the ideas that need paragraphs instead of arrows. Every page can reference the work that shaped it.",
    detail: "12 pages · 3 nested · last edit 2m ago",
    icon: FileText,
    colorVar: "write",
  },
  {
    key: "design",
    index: "03",
    name: "Design",
    verb: "Shape it",
    tagline: "Frames, layers and components for real UI",
    description:
      "A FlowBoard-native design surface for laying out screens and components, with properties, spacing and responsive previews close at hand.",
    detail: "frame 1440×1024 · 3 components",
    icon: Frame,
    colorVar: "design",
  },
  {
    key: "plan",
    index: "04",
    name: "Plan",
    verb: "Ship it",
    tagline: "List, board and timeline views of the work",
    description:
      "Tasks with status, priority and owners — each one able to point straight back at the drawing, doc or design it came from.",
    detail: "8 open · 3 in review · 2 blocked",
    icon: ListChecks,
    colorVar: "plan",
  },
  {
    key: "connect",
    index: "05",
    name: "Connect",
    verb: "See it",
    tagline: "The graph of how everything relates",
    description:
      "A living map of your workspace's real relationships — not a decoration, but a view onto the same connections every other environment writes to.",
    detail: "42 nodes · 67 edges",
    icon: Network,
    colorVar: "connect",
  },
  {
    key: "resources",
    index: "06",
    name: "Resources",
    verb: "Keep it",
    tagline: "Files and links, wired into the rest",
    description:
      "Uploads, references and external links live here — and can be attached to any drawing, task or page instead of sitting in a folder alone.",
    detail: "128 files · 34 linked",
    icon: FolderOpen,
    colorVar: "resources",
  },
];
