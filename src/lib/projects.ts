import { CheckCircle2, LoaderCircle } from "lucide-react";

import supershotVideo from "../assets/supershot-demo.mp4.asset.json";
import supershotPoster from "../assets/supershot-poster.jpg.asset.json";
import tonedeafVideo from "../assets/tonedeaf-demo.mp4.asset.json";
import tonedeafPoster from "../assets/tonedeaf-poster.jpg.asset.json";
import bullseyeVideo from "../assets/bullseye-bill-demo.mp4.asset.json";
import bullseyePoster from "../assets/bullseye-bill-poster.jpg.asset.json";
import subthreadVideo from "../assets/subthread-demo.mp4.asset.json";
import subthreadPoster from "../assets/subthread-poster.jpg.asset.json";

// Videos/posters are served from Lovable's asset CDN. Use absolute URLs so
// they keep working when the site is deployed off Lovable (e.g. Cloudflare).
const assetBase = "https://id-preview--92decfce-4258-4ad6-ba0c-acc6e8b5d2bd.lovable.app";
const asset = (a: { url: string }) => assetBase + a.url;

/** Completed = shipped/finished build. In Development = still being worked on. */
export type ProjectStatus = "completed" | "in-development";

export type Project = {
  /** Used for in-page anchors and React keys. */
  slug: string;
  title: string;
  /** Shown in the IDE-style file tree / tab labels. */
  file: string;
  category: "MOBILE" | "VR" | "GAME" | "WEB";
  status: ProjectStatus;
  /** Optional demo capture. Entries without one show a placeholder panel. */
  video?: string;
  poster?: string;
  /** App icon shown beside the capture on mobile-only projects. */
  appIcon?: string;
  description: string;
  tags: string[];
  /** Public GitHub repository for this project. */
  repoUrl: string;
  /** Optional live build, shown as an extra button next to the repo link. */
  liveUrl?: string;
  accent: "primary" | "secondary" | "accent";
};

export const projects: Project[] = [
  {
    slug: "healthy-habits",
    title: "Healthy Habits",
    file: "healthy-habits.dart",
    category: "MOBILE",
    status: "completed",
    video: "/media/healthy-habits-demo.mp4",
    poster: "/media/healthy-habits-poster.jpg",
    appIcon: "/media/healthy-habits-icon.png",
    description:
      "Solo mobile development project of a daily healthy habits checklist with an emphasis on virtual decorations.",
    tags: ["Flutter", "Dart", "Mobile"],
    repoUrl: "https://github.com/NStein514/CozyHabitGame",
    accent: "secondary",
  },
  {
    slug: "devorbit",
    title: "DevOrbit",
    file: "devorbit.tsx",
    category: "WEB",
    status: "completed",
    video: "/media/devorbit-demo.mp4",
    poster: "/media/devorbit-poster.jpg",
    description:
      "A calmer mission control for individual developers and their side projects: a space-inspired workspace for planning, building and shipping. Includes a responsive homepage, personalization settings, a customizable Kanban workspace, project-level bug tracking, milestones, GitHub integration, changelog generation and a customizable Pomodoro Timer, built with React, TypeScript and Vite. The homepage shows real project/task progress and bug/milestone summaries.",
    tags: ["React", "TypeScript", "Vite"],
    repoUrl: "https://github.com/NStein514/DevOrbit",
    liveUrl: "https://devorbit.steindev.workers.dev/",
    accent: "secondary",
  },
  {
    slug: "trail-off",
    title: "Trail Off",
    file: "trail-off.dart",
    category: "MOBILE",
    status: "completed",
    video: "/media/trail-off-demo.mp4",
    poster: "/media/trail-off-poster.jpg",
    appIcon: "/media/trail-off-icon.png",
    description:
      "A Flutter application for hikers: discover trails, download offline maps, track routes, see the stars in the sky above, and record outdoor adventures. It also recommends routes based on ability and conditions, generates packing checklists, and answers questions from downloaded trail information.",
    tags: ["Flutter", "Dart", "Offline Maps", "AI"],
    repoUrl: "https://github.com/NStein514/TrailOff",
    accent: "secondary",
  },
  {
    slug: "cursed-auction-house",
    title: "Cursed Auction House",
    file: "cursed-auction-house.dart",
    category: "GAME",
    status: "completed",
    video: "/media/cursed-auction-house-demo.mp4",
    poster: "/media/cursed-auction-house-poster.jpg",
    appIcon: "/media/cursed-auction-house-icon.png",
    description:
      "A Flutter game for iOS, Android, Windows, macOS, Linux and the web. You are an artifact dealer in increasingly dangerous auctions: every lot hides a true value, maybe a charm and maybe a curse. Five AI rivals bid against you, each with a secret personality, a budget and preferences. Learn them, read their tells and manipulate the bidding wars.",
    tags: ["Flutter", "Dart", "AI", "Multiplatform"],
    repoUrl: "https://github.com/NStein514/CursedAuctionHouse",
    accent: "accent",
  },
  {
    slug: "tonedeaf",
    title: "ToneDeaf (Symphonic Revolution)",
    file: "tonedeaf.cs",
    category: "VR",
    status: "completed",
    video: asset(tonedeafVideo),
    poster: asset(tonedeafPoster),
    description:
      "Collaborative interactive VR escape-room experience centered on music-driven puzzles and a staged finale.",
    tags: ["Unity", "VR", "C#"],
    repoUrl: "https://github.com/gl-rukwa/tonedeaf",
    accent: "accent",
  },
  {
    slug: "bullseye-bill",
    title: "Bullseye Bill",
    file: "bullseye-bill.cs",
    category: "GAME",
    status: "completed",
    video: asset(bullseyeVideo),
    poster: asset(bullseyePoster),
    description:
      "Collaborative dart-throwing game made during the internal Lantern Light Studios' game jam. I served as the lead programmer on this project.",
    tags: ["Unity", "C#", "Team Dev"],
    repoUrl: "https://github.com/NStein514/BullseyeBill",
    accent: "primary",
  },
  {
    slug: "synthwave-supershot",
    title: "Synthwave Supershot",
    file: "synthwave-supershot.cs",
    category: "GAME",
    status: "completed",
    video: asset(supershotVideo),
    poster: asset(supershotPoster),
    description:
      "Collaborative third-person, wave-based Unity shooter featuring a humanoid mech fighting robotic enemies.",
    tags: ["Unity", "C#", "Team Dev"],
    repoUrl: "https://github.com/NStein514/Synthwave-SuperShot",
    accent: "secondary",
  },
  {
    slug: "subthread",
    title: "SubThread",
    file: "subthread.cs",
    category: "GAME",
    status: "completed",
    video: asset(subthreadVideo),
    poster: asset(subthreadPoster),
    description:
      "A sidescroller Unity game following the main character, Fate, who has been cut off from his destiny and all he now has is his red string of destiny to help him find where he is meant to be, while also fighting off the dangers of the world around him.",
    tags: ["Unity", "C#", "2D"],
    repoUrl: "https://github.com/NStein514/SubThread",
    accent: "primary",
  },
  {
    slug: "pantry-pal",
    title: "Pantry Pal",
    file: "pantry-pal.dart",
    category: "MOBILE",
    status: "in-development",
    description:
      "A smart pantry and expiration tracker built with Flutter. Scan groceries, track expiration dates, get reminded before food goes bad, and receive AI-generated recipes that use up what is about to expire.",
    tags: ["Flutter", "Dart", "Mobile", "AI"],
    repoUrl: "https://github.com/NStein514/PantryPal",
    accent: "accent",
  },
  {
    slug: "deckbuilding-dungeon",
    title: "Deckbuilding Dungeon",
    file: "deckbuilding-dungeon.dart",
    category: "GAME",
    status: "in-development",
    description:
      "A mobile-first, offline single-player roguelike deckbuilder set in the Ashen Crypt. Your cards are your attacks, wards, spells and tactical choices: attack, defend, heal and cast spells using the cards you draw. Your deck changes as you explore, and cards can combine into powerful abilities. Developed as a solo Flutter/Dart project.",
    tags: ["Flutter", "Dart", "Roguelike", "Solo Dev"],
    repoUrl: "https://github.com/NStein514/DeckbuildingDungeon",
    accent: "primary",
  },
  {
    slug: "fakeos",
    title: "FakeOS",
    file: "fakeos.tsx",
    category: "WEB",
    status: "in-development",
    description:
      "A self-contained, responsive, desktop-and-mobile React mystery played through a fictional device. Explore Messages, Mail, Contacts, Files, the Wave social feed, Browser and Calendar; clues can surface an encrypted contact, recover a hidden backup, expose a planted search result and alter the feed.",
    tags: ["React", "TypeScript", "Narrative"],
    repoUrl: "https://github.com/NStein514/FakeOS",
    accent: "primary",
  },
];

/** Labels and styling shared by every place a project status is shown. */
export const statusMeta: Record<
  ProjectStatus,
  { label: string; dot: string; badge: string; icon: typeof CheckCircle2 }
> = {
  completed: {
    label: "Completed",
    dot: "bg-secondary",
    badge: "border-secondary/30 bg-secondary/10 text-secondary",
    icon: CheckCircle2,
  },
  "in-development": {
    label: "In Development",
    dot: "bg-accent",
    badge: "border-accent/30 bg-accent/10 text-accent",
    icon: LoaderCircle,
  },
};

export const projectCounts = {
  total: projects.length,
  completed: projects.filter((p) => p.status === "completed").length,
  inDevelopment: projects.filter((p) => p.status === "in-development").length,
};
