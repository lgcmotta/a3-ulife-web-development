import { createHash } from "node:crypto";

import { expect, test as base, type Page, type TestInfo } from "@playwright/test";

import { ANONYMOUS_STUDENT_COOKIE } from "@/server/student-area/student-record";

import { clearStudentAreaDataForStudent } from "./redis-test-utils";

function testIsolationKey(testInfo: TestInfo) {
  const titlePath =
    typeof testInfo.titlePath === "function" ? testInfo.titlePath() : testInfo.titlePath;

  return createHash("sha1")
    .update(
      [
        testInfo.project.name,
        String(testInfo.workerIndex),
        String(testInfo.retry),
        ...titlePath,
      ].join("|"),
    )
    .digest("hex")
    .slice(0, 12);
}

export const test = base.extend({
  page: async ({ page }, run, testInfo) => {
    const isolationKey = testIsolationKey(testInfo);

    await page.setExtraHTTPHeaders({
      "x-forwarded-for": `e2e-${isolationKey}`,
      "accept-language": `en-US,e2e-${isolationKey}`,
    });

    await run(page);

    const studentCookie = (await page.context().cookies()).find(
      (cookie) => cookie.name === ANONYMOUS_STUDENT_COOKIE,
    );

    if (studentCookie) {
      await clearStudentAreaDataForStudent(studentCookie.value);
    }
  },
});

export { expect, type Page };
