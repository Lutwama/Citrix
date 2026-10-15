import {
  CalendarCheck,
  Hammer,
  Camera,
  Megaphone,
  MonitorSmartphone,
  Package,
  PenTool,
  Printer,
  Sparkles,
  type LucideProps,
} from "lucide-react";

// Explicit map keeps the bundle small (no dynamic import of all icons).
// Keep in sync with the `icon` options in src/sanity/schemaTypes/service.ts.
const ICONS = {
  printer: Printer,
  "pen-tool": PenTool,
  sparkles: Sparkles,
  "monitor-smartphone": MonitorSmartphone,
  "calendar-check": CalendarCheck,
  hammer: Hammer,
  megaphone: Megaphone,
  camera: Camera,
  package: Package,
} as const;

export function ServiceIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICONS[name as keyof typeof ICONS] ?? Sparkles;
  return <Icon {...props} />;
}
