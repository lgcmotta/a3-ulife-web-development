import type { BuilderFeedbackMessage } from "@/server/student-area/types";

export type StudentActionResult<T = unknown> =
  | {
      ok: true;
      data: T;
      feedback: BuilderFeedbackMessage;
    }
  | {
      ok: false;
      feedback: BuilderFeedbackMessage;
    };

function createFeedback(kind: BuilderFeedbackMessage["kind"], message: string, relatedAction: string) {
  return {
    messageId: crypto.randomUUID(),
    kind,
    message,
    relatedAction,
  } satisfies BuilderFeedbackMessage;
}

export function createActionSuccess<T>(message: string, data: T, relatedAction = "success") {
  return {
    ok: true,
    data,
    feedback: createFeedback("success", message, relatedAction),
  } satisfies StudentActionResult<T>;
}

export function createActionError(message: string, relatedAction = "error") {
  return {
    ok: false,
    feedback: createFeedback("error", message, relatedAction),
  } satisfies StudentActionResult<never>;
}

export function friendlyActionError(
  error: unknown,
  fallback: string,
  { useErrorMessage = true }: { useErrorMessage?: boolean } = {},
) {
  if (useErrorMessage && error instanceof Error && error.message) {
    return createActionError(error.message);
  }

  return createActionError(fallback);
}
