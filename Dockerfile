# SeatSaver: single container serving the API and the built frontend (Cloud Run friendly).
FROM node:24-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV=production
# Cloud Run injects PORT (default 8080); the server reads it.
EXPOSE 8080
CMD ["npx", "tsx", "server.ts"]
