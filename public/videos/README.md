Place your MP4 video(s) in this folder.

Recommended filename: `intro.mp4`

Web-accessible URL for the example file:
  /videos/intro.mp4

Example usage in `app/page.tsx`:

Using ReactPlayer:

```tsx
<ReactPlayer url="/videos/intro.mp4" width="100%" height="100%" controls playing onEnded={() => setIsVideoPlaying(false)} />
```

Or with native HTML5 video:

```tsx
<video src="/videos/intro.mp4" width="100%" height="100%" controls onEnded={() => setIsVideoPlaying(false)} />
```

After copying the file, start the dev server and open `http://localhost:3000` to verify playback.