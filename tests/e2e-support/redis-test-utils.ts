import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

export async function clearStudentAreaDataForStudent(studentId: string) {
  const client = createClient({ url: redisUrl });

  await client.connect();

  try {
    const studentAreaKeyPatterns = [
      `student:${studentId}`,
      `student:${studentId}:paths:*`,
      `student:${studentId}:feedback`,
    ];
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
