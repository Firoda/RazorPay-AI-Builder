import { useEffect } from "react";
import { FilmStory } from "./scenes/Film";
import { BuilderBadge } from "./ui/Brand";
import { IntroGate, MuteToggle, SkipLink } from "./ui/Chrome";
import { LensToggle } from "./ui/Lens";

// Portal 1: tap to begin → a ~26 s film (Google Flow clips + animated overlays) → how it works today → the cliffhanger.
// The earlier scroll-driven scenes (scenes/ScenesA, ScenesB) are kept in the repo but no longer mounted.

export function App() {
  useEffect(() => {
    // Pre-warm the server so Portal 2 opens fast after the story.
    fetch("/api/health").catch(() => undefined);
  }, []);

  return (
    <>
      <IntroGate />
      <header className="chrome-top">
        <BuilderBadge />
        <div className="chrome-right">
          <SkipLink />
          <MuteToggle />
        </div>
      </header>
      <div className="chrome-bottom-right"><LensToggle /></div>
      <FilmStory />
    </>
  );
}
