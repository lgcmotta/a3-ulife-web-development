import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";
const studentAreaKeyPatterns = ["student:*", "ids:*"];

export async function clearStudentAreaTestData() {
  const client = createClient({ url: redisUrl });

  await client.connect();

  try {
    const allKeys = (
      await Promise.all(studentAreaKeyPatterns.map((pattern) => client.keys(pattern)))
    ).flat();

    if (allKeys.length > 0) {
      await client.del(allKeys);
    }
  } finally {
    await client.quit();
  }
}
