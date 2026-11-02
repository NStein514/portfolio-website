import { Link } from "@tanstack/react-router";
import { FileCode2 } from "lucide-react";

const lineNumbers = Array.from({ length: 80 }, (_, i) => String(i + 1).padStart(2, "0"));

/** The faint line-number rail that frames the page like an editor gutter. */
export function IdeGutter() {
  return (
    <div className="fixed left-0 top-0 h-full w-14 border-r border-border hidden lg:flex flex-col items-center pt-10 text-[11px] font-mono text-muted-foreground/30 select-none z-50 bg-background">
      {lineNumbers.map((num, i) => (
        <div
          key={num}
          className={`mb-3 ${i === 2 ? "text-primary/40" : ""} ${i === 7 ? "text-secondary/40" : ""}`}
        >
          {num}
        </div>
      ))}
    </div>
  );
}

/** Brand bar at the top of every page. */
export function SiteNav() {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6 lg:pl-24 py-4 flex items-center">
        <Link to="/" className="font-mono text-sm tracking-tight">
          <span className="text-secondary">const</span>{" "}
          <span className="text-primary">NathanielStein</span> ={" "}
          <span className="text-accent">'Developer'</span>
        </Link>
      </div>
    </header>
  );
}

/**
 * Open-editor tab strip. It sticks to the top while the page scrolls, so the
 * site's navigation is always in reach on every page.
 */
export function EditorTabs({ active }: { active: "index" | "projects" }) {
  // On the home page the section tabs scroll in place; from /projects they go
  // home first and then jump to the section.
  const onHome = active === "index";

  const tabClass = (isOpen: boolean) =>
    `flex items-center gap-2 px-4 py-3 border-r border-border whitespace-nowrap transition-colors ${
      isOpen
        ? "bg-card/50 text-foreground shadow-[inset_0_2px_0_0_var(--color-primary)]"
        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
    }`;

  const fileIcon = (isOpen: boolean) => (
    <FileCode2 className={`size-3.5 ${isOpen ? "text-primary" : ""}`} />
  );

  const sectionTabs = [
    { key: "skills", file: "skills.tsx", hash: "stack" },
    { key: "experience", file: "experience.tsx", hash: "experience" },
    { key: "contact", file: "contact.tsx", hash: "contact" },
  ];

  return (
    <div className="bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 lg:pl-24 flex items-stretch font-mono text-xs overflow-x-auto">
        <Link to="/" className={tabClass(active === "index")}>
          {fileIcon(active === "index")}
          index.tsx
          {active === "index" ? (
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          ) : null}
        </Link>

        <Link to="/projects" className={tabClass(active === "projects")}>
          {fileIcon(active === "projects")}
          projects.tsx
          {active === "projects" ? (
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          ) : null}
        </Link>

        {sectionTabs.map((section) =>
          onHome ? (
            <a key={section.key} href={`#${section.hash}`} className={tabClass(false)}>
              {fileIcon(false)}
              {section.file}
            </a>
          ) : (
            <Link key={section.key} to="/" hash={section.hash} className={tabClass(false)}>
              {fileIcon(false)}
              {section.file}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
