# SeatSaver: single container serving the API and the built frontend (Cloud Run friendly).
FROM node:24-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx vite build --config web/vite.config.ts
ENV NODE_ENV=production
# Cloud Run injects PORT (default 8080); the server reads it.
EXPOSE 8080
CMD ["npx", "tsx", "server/index.ts"]
