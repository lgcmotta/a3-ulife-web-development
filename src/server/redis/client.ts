import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient> | null = null;

export function getRedisUrl() {
  return process.env.REDIS_URL ?? "redis://localhost:6379";
}

export async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({ url: getRedisUrl() });
    redisClient.on("error", () => {
      // Errors are surfaced through awaited Redis calls; avoid crashing render work.
    });
  }

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  return redisClient;
}

export async function closeRedisClientForTests() {
  if (redisClient?.isOpen) {
    await redisClient.quit();
  }

  redisClient = null;
}
