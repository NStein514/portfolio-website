# Add Inline Game Demo Videos to the Portfolio

## Goal
Replace the "Demo soon" placeholders on the three project cards with playable game demo videos, hosted on Lovable's CDN so they load fast and don't bloat the repository.

## Recommended approach
Use **Lovable Assets** (the same CDN already serving your resume PDF). Each video becomes a stable `/__l5e/assets-v1/...` URL, and the project cards switch from static images to HTML5 `<video>` players with the existing placeholder as a poster frame.

## Why this path
- Videos stay off GitHub and out of the build bundle.
- CDN delivery is fast for visitors.
- Works on desktop and mobile without extra dependencies.
- Keeps the dark IDE aesthetic intact.

## Step 1 — Get the videos into the sandbox
Because chat uploads have a size limit, choose one of these:

1. **Compress first (simplest for you):** Use a free tool like HandBrake or FFmpeg to shrink each video to under ~25 MB. Target: 1080p or 720p, H.264 MP4, ~5 Mbps. Then upload them directly in chat.
2. **Share a cloud link:** Upload the originals to Google Drive, Dropbox, or similar and paste a shareable download link. I can fetch them in the sandbox.

## Step 2 — Optimize and upload
- Convert videos to web-friendly MP4 (and optionally WebM fallback).
- Run `lovable-assets create --file <video>` for each demo.
- Save the resulting `.asset.json` pointers in `src/assets/` (e.g., `demo-oni-way-out.mp4.asset.json`).

## Step 3 — Update the project cards
- Change `ProjectCard` to render an HTML5 `<video>` element.
- Use the existing placeholder image as the `poster` attribute so the card still looks good before playback.
- Swap the "Demo soon" badge for a subtle play-state indicator.
- Keep videos muted + looping + with user-initiated playback for the best mobile experience.

## Step 4 — Verify
- Run `bun run build`.
- Check that each project card shows the poster and plays its demo video.
- Confirm no console errors and reasonable mobile layout.

## What I need from you
Either compress the three videos and upload them here, or paste a download link where I can fetch them. Once the files are in the sandbox, I can handle the rest.