import { statusMeta, type ProjectStatus } from "../lib/projects";

/** Git-status style pill used in the explorer list, cards and file tree. */
export function StatusPill({
  status,
  className = "",
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const meta = statusMeta[status];
  const Icon = meta.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border font-mono text-[9px] uppercase tracking-widest whitespace-nowrap ${meta.badge} ${className}`}
    >
      <Icon className={`size-3 ${status === "in-development" ? "animate-spin" : ""}`} />
      {meta.label}
    </span>
  );
}
