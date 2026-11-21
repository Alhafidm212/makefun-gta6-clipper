// GTA 6 clipper entry: manifest + VIDEO.json validator.
// Node 22, standard library only, no network access.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));

interface Moment {
  start: number;
  end: number;
  label: string;
}

interface Manifest {
  title: string;
  sourceVideo: string;
  sourceId: string;
  sourceDurationSec: number;
  moments: Moment[];
  pitch: string;
  clip: { file: string; durationSec: number; width: number; height: number };
}

const MANIFEST: Manifest = {
  title: "GTA 6 — Vice City Is Back (Lucia, chaos & the mud club)",
  sourceVideo: "Grand Theft Auto VI Trailer 1",
  sourceId: "QdBZY2fkU-0",
  sourceDurationSec: 90,
  moments: [
    { start: 8, end: 12, label: "Lucia in prison — Vice City is back" },
    { start: 22, end: 26, label: "Rooftop pool party" },
    { start: 46, end: 53, label: "Night street takeover, alligator in the store" },
    { start: 55, end: 60, label: "Red muscle car burnout" },
  ],
  pitch: "Make clips like this with AI and earn money on make.fun",
  clip: { file: "clip.mp4", durationSec: 30, width: 1080, height: 1920 },
};

const YOUTUBE_RE =
  /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&#].*)?$/;

function readVideoUrl(): string {
  const path = join(ROOT, "VIDEO.json");
  if (!existsSync(path)) {
    throw new Error("VIDEO.json not found at repository root");
  }
  const raw: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (typeof raw !== "object" || raw === null || !("url" in raw)) {
    throw new Error("VIDEO.json must be an object with a url field");
  }
  const url = (raw as { url: unknown }).url;
  if (typeof url !== "string" || url.length === 0) {
    throw new Error("VIDEO.json url must be a non-empty string");
  }
  return url;
}

function validateMoments(manifest: Manifest): void {
  let prevEnd = 0;
  let total = 0;
  for (const m of manifest.moments) {
    if (m.start < 0 || m.end <= m.start || m.end > manifest.sourceDurationSec) {
      throw new Error(`moment ${m.start}-${m.end}s is outside the source (0-${manifest.sourceDurationSec}s)`);
    }
    if (m.start < prevEnd) {
      throw new Error(`moments must be in ascending, non-overlapping order (bad at ${m.start}s)`);
    }
    prevEnd = m.end;
    total += m.end - m.start;
  }
  if (total > manifest.clip.durationSec) {
    throw new Error(`moments total ${total}s but clip is only ${manifest.clip.durationSec}s`);
  }
}

function main(): void {
  const asJson = process.argv.includes("--json");
  validateMoments(MANIFEST);
  const url = readVideoUrl();
  if (asJson) {
    console.log(JSON.stringify({ ...MANIFEST, videoUrl: url }, null, 2));
    return;
  }
  console.log(`title: ${MANIFEST.title}`);
  console.log(`source: ${MANIFEST.sourceVideo} (youtube:${MANIFEST.sourceId})`);
  console.log(
    `clip: ${MANIFEST.clip.file} ${MANIFEST.clip.durationSec}s ` +
      `${MANIFEST.clip.width}x${MANIFEST.clip.height}`,
  );
  for (const m of MANIFEST.moments) {
    console.log(`moment ${m.start}-${m.end}s: ${m.label}`);
  }
  console.log(`pitch: ${MANIFEST.pitch}`);
  if (url === "PENDING_UPLOAD") {
    console.log("video: PENDING_UPLOAD — upload the clip to YouTube, then set VIDEO.json url");
    return;
  }
  const match = YOUTUBE_RE.exec(url.trim());
  if (!match) {
    throw new Error(`VIDEO.json url is not a valid YouTube video URL: ${url}`);
  }
  console.log(`video: https://www.youtube.com/shorts/${match[1]} (id ${match[1]})`);
}

main();
