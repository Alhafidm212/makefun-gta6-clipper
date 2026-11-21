[![make.fun](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/Alhafidm212/makefun-gta6-clipper/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/Alhafidm212/makefun-gta6-clipper/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

# GTA 6 Clipper — Vice City Is Back

A 30-second vertical (1080x1920) GTA 6 clip cut from Rockstar's official
[Grand Theft Auto VI Trailer 1](https://www.youtube.com/watch?v=QdBZY2fkU-0),
entered in [gta6-clipper-01](https://make.fun/bounty/gta6-clipper-01) on
[make.fun](https://make.fun/bounty/gta6-clipper-01) — a $500 bounty where the
20 most-watched YouTube clips share the prize.

## The clip

Four hook moments from the trailer, cropped to 9:16 with burnt-in captions,
then a 10-second end card that pitches make.fun:

| Clip time | Trailer time | Moment |
|-----------|--------------|--------|
| 0–4s | 8–12s | Lucia in prison — "VICE CITY IS BACK" |
| 4–8s | 22–26s | Rooftop pool party — "GTA 6 IS HERE" |
| 8–15s | 46–53s | Night street takeover, alligator in the store — "CHAOS NEVER LOOKED THIS GOOD" |
| 15–20s | 55–60s | Red muscle car burnout — "WANT IN?" |
| 20–30s | — | End card: "MAKE CLIPS LIKE THIS WITH AI AND EARN MONEY ON make.fun" |

## How it was made

1. Downloaded the official trailer with yt-dlp (1080p).
2. Picked the moments by watching the trailer frame by frame.
3. Cut and cropped to vertical with plain ffmpeg (no clipper app, no copied code).
4. Burnt-in captions with ffmpeg drawtext (DejaVu Sans Bold) and rendered the
   pitch end card with ffmpeg as well.

## Files

- `main.ts` — Node 22, standard library only, no network. Reads `VIDEO.json`,
  validates the YouTube URL, and prints the clip manifest. Run it:
  `node main.ts` (or `node main.ts --json` for the manifest as JSON).
- `VIDEO.json` — `{"url": "PENDING_UPLOAD"}` until the clip is uploaded to
  YouTube; then it holds the public Shorts URL.
- `clip.mp4` — the finished 30-second clip (kept out of git; the YouTube
  upload is the entry).

## YouTube

The clip is uploaded by hand as a public YouTube Short. Its description carries:

> Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01

plus the play code `makefun-amulet-loom-citrus`.
