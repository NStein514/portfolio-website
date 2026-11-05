import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  FileCode2,
  FolderOpen,
  Github,
} from "lucide-react";

import { EditorTabs, IdeGutter, SiteNav } from "../components/site-chrome";
import { StatusPill } from "../components/project-status";
import {
  projectCounts,
  projects,
  statusMeta,
  type Project,
  type ProjectStatus,
} from "../lib/projects";

export const Route = createFileRoute("/projects")({
  validateSearch: (search: Record<string, unknown>): { project?: string } => {
    const project = search["project"];
    return typeof project === "string" ? { project } : {};
  },
  head: () => ({
    meta: [
      { title: "Projects — Nathaniel Stein" },
      {
        name: "description",
        content:
          "Project explorer for Nathaniel Stein: mobile apps, VR experiences and games with their current development status.",
      },
      { property: "og:title", content: "Projects — Nathaniel Stein" },
      {
        property: "og:description",
        content:
          "Project explorer for Nathaniel Stein: mobile apps, VR experiences and games with their current development status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

type Filter = "all" | ProjectStatus;

const filters: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "All", count: projectCounts.total },
  { id: "completed", label: "Completed", count: projectCounts.completed },
  { id: "in-development", label: "In Development", count: projectCounts.inDevelopment },
];

function ProjectsPage() {
  const { project: projectParam } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = filter === "all" ? projects : projects.filter((p) => p.status === filter); // Fall back to the first visible file if the URL points at something hidden.
  const selected = visible.find((p) => p.slug === projectParam) ?? visible[0];

  const selectProject = (slug: string) => {
    navigate({ search: { project: slug } });
  };

  const applyFilter = (next: Filter) => {
    setFilter(next);
    const nextVisible = next === "all" ? projects : projects.filter((p) => p.status === next);
    const keepSelection = selected && nextVisible.some((p) => p.slug === selected.slug);
    const firstVisible = nextVisible[0];
    if (!keepSelection && firstVisible) {
      navigate({ search: { project: firstVisible.slug }, replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <IdeGutter />
      <div className="sticky top-0 z-40">
        <SiteNav />
        <EditorTabs active="projects" />
      </div>

      <main className="max-w-6xl mx-auto px-6 lg:pl-24">
        <header className="pt-14 lg:pt-20 pb-10 animate-reveal">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-5">
            // ~/portfolio/projects
          </p>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tighter leading-[0.95] mb-6">
            Project <span className="text-primary">Explorer</span>
          </h1>
          <p className="max-w-2xl text-base lg:text-lg text-muted-foreground leading-relaxed mb-10">
            Every build I have shipped or am actively working on, with the current status of each
            one. Pick a file in the explorer to open it.
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-xl font-mono">
            <Stat label="Projects" value={projectCounts.total} className="text-foreground" />
            <Stat label="Completed" value={projectCounts.completed} className="text-secondary" />
            <Stat
              label="In Development"
              value={projectCounts.inDevelopment}
              className="text-accent"
            />
          </div>
        </header>

        <div className="flex flex-wrap items-center gap-2 pb-8">
          {filters.map((option) => {
            const isActive = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => applyFilter(option.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded border font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  isActive
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {option.label}
                <span className="text-[9px] opacity-60">{option.count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[15rem_1fr] gap-8 pb-16 items-start">
          {" "}
          <FileTree
            projects={visible}
            selectedSlug={selected?.slug ?? ""}
            onSelect={selectProject}
          />
          <div className="min-w-0">
            <MobileFilePicker
              projects={visible}
              selectedSlug={selected?.slug ?? ""}
              onSelect={selectProject}
            />

            {!selected ? (
              <p className="border border-dashed border-border rounded-xl bg-card/20 px-6 py-10 font-mono text-xs text-muted-foreground">
                // Nothing in development right now — every project here is finished.
              </p>
            ) : (
              <ProjectDetail project={selected} />
            )}
          </div>
        </div>

        <div className="border-t border-border py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              // Status
            </span>
            <StatusPill status="completed" />
            <StatusPill status="in-development" />
          </div>
          <Link
            to="/"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            &larr; back to index.tsx
          </Link>
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value, className }: { label: string; value: number; className: string }) {
  return (
    <div className="border border-border rounded-lg bg-card/30 px-4 py-3">
      <div className={`text-2xl font-bold leading-none ${className}`}>{value}</div>
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground mt-2 whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}

function FileTree({
  projects: entries,
  selectedSlug,
  onSelect,
}: {
  projects: Project[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 border border-border rounded-lg bg-card/20 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Explorer
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/60">{entries.length}</span>
        </div>
        <div className="p-2 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 px-2 py-1.5 text-foreground/70">
            <ChevronDown className="size-3" />
            <FolderOpen className="size-3 text-primary" />
            projects
          </div>
          {entries.map((project) => {
            const isSelected = project.slug === selectedSlug;
            return (
              <button
                key={project.slug}
                type="button"
                onClick={() => onSelect(project.slug)}
                aria-current={isSelected ? "true" : undefined}
                title={`${project.title} — ${statusMeta[project.status].label}`}
                className={`w-full flex items-center gap-2 pl-6 pr-2 py-1.5 rounded text-left transition-colors ${
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <span
                  className={`size-1.5 shrink-0 rounded-full ${statusMeta[project.status].dot}`}
                />
                <FileCode2
                  className={`size-3 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground/50"}`}
                />
                <span className="truncate">{project.file}</span>
              </button>
            );
          })}
          {entries.length === 0 ? (
            <p className="pl-6 py-1.5 text-muted-foreground/60">// no matches</p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

/** The explorer is hidden on narrow screens, so let phones pick the file here. */
function MobileFilePicker({
  projects: entries,
  selectedSlug,
  onSelect,
}: {
  projects: Project[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}) {
  if (entries.length === 0) return null;

  return (
    <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 -mx-1 px-1">
      {entries.map((project) => {
        const isSelected = project.slug === selectedSlug;
        return (
          <button
            key={project.slug}
            type="button"
            onClick={() => onSelect(project.slug)}
            aria-current={isSelected ? "true" : undefined}
            className={`shrink-0 inline-flex items-center gap-2 px-2.5 py-1.5 rounded border font-mono text-[10px] transition-colors ${
              isSelected
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className={`size-1.5 rounded-full ${statusMeta[project.status].dot}`} />
            {project.file}
          </button>
        );
      })}
    </div>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const badgeClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    accent: "bg-accent/10 text-accent border-accent/20",
  };

  return (
    <article
      key={project.slug}
      className="border border-border bg-card/20 rounded-xl overflow-hidden animate-reveal"
    >
      <div className="relative border-b border-border">
        {project.appIcon ? (
          <div className="bg-card/20 p-5 lg:p-8">
            <div className="flex flex-col items-center sm:flex-row sm:items-center justify-center gap-5 lg:gap-8">
              <img
                src={project.appIcon}
                alt={`${project.title} app icon`}
                className="size-24 lg:size-40 shrink-0 self-center rounded-2xl border border-border object-cover shadow-xl shadow-black/40"
              />
              {project.video ? (
                <video
                  key={project.slug}
                  src={project.video}
                  poster={project.poster}
                  controls
                  playsInline
                  preload="none"
                  aria-label={`${project.title} screen recording`}
                  className="h-[52vh] max-h-[32rem] w-auto max-w-full rounded-xl border border-border bg-black"
                />
              ) : null}
            </div>
          </div>
        ) : (
          <div className="bg-black flex items-center justify-center">
            {project.video ? (
              <video
                key={project.slug}
                src={project.video}
                poster={project.poster}
                controls
                playsInline
                preload="none"
                aria-label={`${project.title} gameplay demo`}
                className="w-full max-h-[60vh] object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
                <FileCode2 className="size-6 text-muted-foreground/40" />
                <p className="font-mono text-[11px] text-muted-foreground">{project.file}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                  // demo capture coming soon
                </p>
              </div>
            )}
          </div>
        )}
        <div className="pointer-events-none absolute top-3 left-3">
          <StatusPill status={project.status} className="bg-background/85 backdrop-blur-sm" />
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-[10px] text-muted-foreground">
            projects / <span className="text-foreground/80">{project.file}</span>
          </span>
          <span
            className={`text-[9px] font-mono px-2 py-1 rounded border ${badgeClasses[project.accent]}`}
          >
            {project.category}
          </span>
        </div>

        <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tighter text-primary mb-4">
          {project.title}
        </h2>

        <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-3xl mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded border border-border bg-background/40 font-mono text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open the live ${project.title} build (opens in a new tab)`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-secondary/40 bg-secondary/10 font-mono text-[10px] uppercase tracking-widest text-secondary hover:bg-secondary/20 transition-colors"
              >
                <ExternalLink className="size-3.5" />
                Live Site
              </a>
            ) : null}

            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ${project.title} on GitHub (opens in a new tab)`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-border bg-background/40 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <Github className="size-3.5" />
              GitHub Repository
              <ArrowUpRight className="size-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
