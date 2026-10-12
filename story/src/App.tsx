import { useEffect } from "react";
import { refreshSoon } from "./engine/scroll";
import { Scene01, Scene02, Scene03, Scene04, Scene05 } from "./scenes/ScenesA";
import { Scene06a, Scene06b, Scene07, Scene08, Scene09, Scene10 } from "./scenes/ScenesB";
import { ChapterDots, ClockPill, IntroGate, MuteToggle, ProgressLine, SkipLink } from "./ui/Chrome";
import { LensToggle } from "./ui/Lens";

export function App() {
  useEffect(() => {
    document.fonts?.ready.then(refreshSoon);
    // Pre-warm the server so Portal 2 opens fast after the story.
    fetch("/api/health").catch(() => undefined);
  }, []);

  return (
    <>
      <IntroGate />
      <ProgressLine />
      <header className="chrome-top">
        <ClockPill />
        <div className="chrome-right">
          <SkipLink />
          <MuteToggle />
        </div>
      </header>
      <ChapterDots />
      <div className="chrome-bottom-right"><LensToggle /></div>
      <main>
        <Scene01 />
        <Scene02 />
        <Scene03 />
        <Scene04 />
        <Scene05 />
        <Scene06a />
        <Scene06b />
        <Scene07 />
        <Scene08 />
        <Scene09 />
        <Scene10 />
      </main>
    </>
  );
}
