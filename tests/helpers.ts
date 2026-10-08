import { FakeProvider } from "../server/ai/fake";
import type { AiProvider } from "../server/ai/provider";
import { buildContainer } from "../server/container";
import { applyScenario, getScenario } from "../server/scenarios";

export function setup(ai: AiProvider = new FakeProvider()) {
  const container = buildContainer({ AI_MODE: "fake" } as NodeJS.ProcessEnv, ai);
  const { store, engine } = container;

  async function inject(id: string) {
    const sc = getScenario(id);
    if (!sc) throw new Error(`no scenario ${id}`);
    const event = applyScenario(store, sc);
    const res = await engine.ingestPaymentEvent(event);
    return { event, caseId: res.caseId!, c: () => store.cases.get(res.caseId!)! };
  }

  return { container, store, engine, inject };
}
