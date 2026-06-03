import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

export async function clearStudentAreaTestData() {
  const client = createClient({ url: redisUrl });

  await client.connect();

  try {
    const keys = await client.keys("student:*");
    const counterKeys = await client.keys("ids:*");
    const allKeys = [...keys, ...counterKeys];

    if (allKeys.length > 0) {
      await client.del(allKeys);
    }
  } finally {
    await client.quit();
  }
}
