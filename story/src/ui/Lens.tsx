import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { lensOn, notesFor, onLensChange, setLens } from "../../../shared/judgeLens";

export function useLens(): boolean {
  const [on, setOn] = useState(lensOn);
  useEffect(() => onLensChange(setOn), []);
  return on;
}

/** Margin annotations for judges, shown only when the Judge lens is on. */
export function LensNotes({ anchor }: { anchor: string }) {
  const on = useLens();
  const notes = notesFor(1, anchor);
  if (!on || !notes.length) return null;
  return (
    <aside className="lens-notes" aria-label="Notes for judges">
      {notes.map((n) => (
        <div key={n.label} className="lens-card">
          <div className="lens-label">{n.label}</div>
          <div className="lens-text">{n.text}</div>
        </div>
      ))}
    </aside>
  );
}

export function LensToggle() {
  const on = useLens();
  return (
    <button className={`chrome-btn lens-toggle ${on ? "on" : ""}`} onClick={() => setLens(!on)} aria-pressed={on} title="Show what judges look for">
      {on ? <Eye size={16} /> : <EyeOff size={16} />}
      <span>Judge lens</span>
    </button>
  );
}
