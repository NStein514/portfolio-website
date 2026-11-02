import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  MapPin,
  Phone,
  FileText,
  Github,
  Linkedin,
  ArrowRight,
  FileCode2,
} from "lucide-react";

import { EditorTabs, IdeGutter, SiteNav } from "../components/site-chrome";
import { StatusPill } from "../components/project-status";
import { projectCounts, projects, statusMeta } from "../lib/projects";

const resumeUrl = "/nathaniel-stein-resume.pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nathaniel Stein — Mobile Developer" },
      {
        name: "description",
        content:
          "Portfolio of Nathaniel Stein, a Mobile Developer specializing in Unity/C#, Flutter/Dart, and cross-platform iOS & Android development.",
      },
      { property: "og:title", content: "Nathaniel Stein — Mobile Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Nathaniel Stein, a Mobile Developer specializing in Unity/C#, Flutter/Dart, and cross-platform iOS & Android development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const skills = {
  languages: ["C#", "Dart", "JavaScript", "Swift", "Kotlin"],
  frameworks: ["Flutter SDK", "Unity", "Firebase", "XCode", "Android Studio", "Git/GitHub"],
  platforms: ["iOS", "Android", "Windows", "Mac"],
  tools: ["Blender", "Affinity Designer", "Audacity", "OpenCV"],
};

const experience = [
  {
    role: "Mobile Developer",
    company: "Strikeman",
    period: "Mar 2025 — Present",
    description:
      "Develop and maintain mobile application features across Unity/C# and Flutter/Dart for iOS and Android. Build training/gameplay session systems, scoring, target interactions, camera and video workflows, and platform-specific input handling.",
  },
  {
    role: "Junior Programmer",
    company: "Lantern Light Studios",
    period: "Oct 2023 — Aug 2025",
    description:
      "Programmed game mechanics and UI for an undisclosed Unity project, collaborating with designers and developers across disciplines.",
  },
  {
    role: "Lab Technician",
    company: "Ohio University — G.R.I.D. Lab",
    period: "Aug 2023 — Dec 2024",
    description:
      "Maintained software and systems used in game-development courses, troubleshot technical issues, and supported students and faculty in a multidisciplinary production lab.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <IdeGutter />
      {/* Brand + open files stay pinned together while the page scrolls. */}
      <div className="sticky top-0 z-40">
        <SiteNav />
        <EditorTabs active="index" />
      </div>

      <main className="max-w-6xl mx-auto px-6 lg:pl-24">
        <Hero />
        <Projects />
        <Expertise />
        <Education />
        <Footer />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-10 pb-20 lg:pt-16 lg:pb-36 animate-reveal">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono mb-8 tracking-widest uppercase">
        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
        Mobile Developer — Flutter/Dart & Unity/C# & Firebase/JavaScript
      </div>

      <h1 className="text-5xl lg:text-8xl font-extrabold tracking-tighter mb-8 text-balance leading-[0.9]">
        Crafting <span className="text-primary">performant</span> apps &{" "}
        <span className="text-secondary">engaging</span> games.
      </h1>

      <p className="max-w-2xl text-lg lg:text-xl text-foreground/80 text-pretty leading-relaxed mb-10">
        I am <span className="text-primary">Nathaniel Stein</span>, a Mobile Developer focused on
        cross-platform architectures and interactive experiences. Currently building the future of
        mobile training systems at <span className="text-accent">Strikeman</span>.
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          to="/projects"
          className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground font-bold font-mono text-sm rounded transition-all hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(220,220,170,0.25)]"
        >
          View My Work
        </Link>
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border text-primary font-mono text-sm rounded hover:bg-white/5 transition-all"
        >
          <FileText className="size-4" />
          View Resume
        </a>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="work" className="py-20 border-t border-border/50 scroll-mt-20">
      <h2 className="text-xl font-mono text-primary mb-10 tracking-tight">// Selected Projects</h2>

      <div className="border border-border rounded-xl overflow-hidden bg-card/20 animate-reveal">
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-border font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="text-primary normal-case">explorer</span>
            <span>/ projects</span>
          </span>
          <span>{projectCounts.total} entries</span>
        </div>

        <ul className="divide-y divide-border/60">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                to="/projects"
                search={{ project: project.slug }}
                className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.03]"
              >
                <span
                  className={`size-1.5 shrink-0 rounded-full ${statusMeta[project.status].dot}`}
                />
                <FileCode2 className="size-3.5 shrink-0 text-muted-foreground/60" />
                <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground/70 truncate">
                  {project.file}
                </span>
                <span className="text-sm font-bold text-primary group-hover:text-foreground transition-colors truncate">
                  {project.title}
                </span>
                <span className="ml-auto flex items-center gap-3 shrink-0">
                  <span className="hidden md:inline text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                    {project.category}
                  </span>
                  <StatusPill status={project.status} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-mono">
          // {projectCounts.total} projects — {projectCounts.completed} completed,{" "}
          {projectCounts.inDevelopment} in development.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-foreground transition-colors"
        >
          Open project explorer
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section id="stack" className="py-20 border-t border-border/50 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="animate-reveal">
          <h2 className="text-xl font-mono text-primary mb-10 tracking-tight">
            // Technical Skills
          </h2>

          <div className="space-y-10 border-l border-border pl-8">
            <SkillGroup title="Programming Languages" skills={skills.languages} color="primary" />
            <SkillGroup title="Frameworks & Engines" skills={skills.frameworks} color="secondary" />
            <SkillGroup title="Platforms" skills={skills.platforms} color="accent" />
            <SkillGroup title="Additional Tools" skills={skills.tools} color="foreground" />
          </div>
        </div>

        <div id="experience" className="animate-reveal scroll-mt-20 [animation-delay:150ms]">
          <h2 className="text-xl font-mono text-secondary mb-10 tracking-tight">
            // Professional History
          </h2>

          <div className="space-y-10">
            {experience.map((job) => (
              <div key={`${job.company}-${job.period}`} className="group">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <h4 className="text-base lg:text-lg font-bold text-primary group-hover:text-foreground transition-colors">
                    {job.role}
                  </h4>
                  <span className="text-[10px] font-mono text-muted-foreground">{job.period}</span>
                </div>
                <p className="text-sm text-secondary font-mono mb-2">{job.company}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillGroup({
  title,
  skills,
  color,
}: {
  title: string;
  skills: string[];
  color: "primary" | "secondary" | "accent" | "foreground";
}) {
  const colorClasses = {
    primary: "text-primary border-primary/20 bg-primary/5",
    secondary: "text-secondary border-secondary/20 bg-secondary/5",
    accent: "text-accent border-accent/20 bg-accent/5",
    foreground: "text-foreground border-border bg-card/50",
  };

  return (
    <div>
      <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest block mb-4">
        {title}
      </span>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`px-3 py-1.5 border rounded text-xs font-mono ${colorClasses[color]}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function Education() {
  return (
    <section className="py-16 border-t border-border/50">
      <h2 className="text-xl font-mono text-accent mb-8 tracking-tight">// Education</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card/30 border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-2">B.S. in VR & Game Development</h3>
          <p className="text-sm text-secondary font-mono mb-1">Ohio University</p>
          <p className="text-[10px] font-mono text-muted-foreground mb-3">Aug 2021 — Dec 2024</p>
          <p className="text-sm text-muted-foreground">
            Minor: Communication Studies • Degree GPA: 3.818 • Major GPA: 3.830
          </p>
        </div>

        <div className="bg-card/30 border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-2">Certifications</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <span className="text-primary font-mono">[C#]</span> Introduction to C# Programming in
              Unity — University of Colorado / Coursera, Jul 2023
            </li>
            <li>
              <span className="text-primary font-mono">[Game Design]</span> Gamification
              Certification — Wharton / Coursera, Jul 2023
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="py-24 border-t border-border scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tighter">
            Let's build something <span className="text-primary italic">remarkable</span> together.
          </h2>
          <p className="text-muted-foreground mb-8 text-base lg:text-lg leading-relaxed">
            Currently open to mobile development, Unity game systems, and Flutter/Dart projects.
            Based in Cincinnati, Ohio — available for remote work.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="mailto:nstein514@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-secondary text-secondary-foreground font-bold font-mono text-sm rounded hover:bg-secondary/90 transition-all"
            >
              <Mail className="size-4" />
              Contact Me
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border text-primary font-mono text-sm rounded hover:bg-white/5 transition-all"
            >
              <FileText className="size-4" />
              Resume
            </a>
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground font-mono">
            <a
              href="mailto:nstein514@gmail.com"
              className="inline-flex items-center gap-2 hover:text-secondary transition-colors"
            >
              <Mail className="size-4" />
              nstein514@gmail.com
            </a>
            <span className="inline-flex items-center gap-2">
              <Phone className="size-4" />
              (614) 800-5145
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              Cincinnati, Ohio
            </span>
          </div>
        </div>

        <TerminalCard />
      </div>

      <div className="mt-24 pt-10 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
        <p>&copy; {new Date().getFullYear()} NATHANIEL STEIN. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6 items-center">
          <a
            href="https://github.com/nstein514"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Github className="size-3.5" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nathaniel-stein-3b3a36298"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Linkedin className="size-3.5" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

function TerminalCard() {
  return (
    <div className="bg-black/30 p-6 lg:p-8 rounded-xl border border-border font-mono text-xs space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="size-2 rounded-full bg-primary" />
        <span className="text-primary uppercase tracking-widest text-[10px]">System Terminal</span>
      </div>
      <p className="text-primary">$ name</p>
      <p className="text-foreground/90">&gt; Nathaniel Stein</p>
      <p className="text-primary">$ role</p>
      <p className="text-secondary">&gt; Mobile Developer</p>
      <p className="text-primary">$ status</p>
      <p className="text-secondary">&gt; Available for new opportunities</p>
      <p className="text-primary">$ location</p>
      <p className="text-foreground/90">&gt; Cincinnati, OH / Remote</p>
      <p className="animate-pulse text-primary mt-4">_</p>
    </div>
  );
}
