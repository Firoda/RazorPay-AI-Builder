import { createApp } from "./app";
import { buildContainer } from "./container";

try {
  process.loadEnvFile(".env");
} catch {
  // no .env file: rely on the real environment (e.g. Cloud Run env vars)
}

const container = buildContainer();
const port = Number(process.env.PORT ?? 8080);

createApp(container).listen(port, () => {
  const { aiMode, model, razorpayTest } = container.config;
  console.log(`SeatSaver backend on http://localhost:${port}  (AI: ${aiMode}/${model}, Razorpay test API: ${razorpayTest ? "on" : "simulated"})`);
});
