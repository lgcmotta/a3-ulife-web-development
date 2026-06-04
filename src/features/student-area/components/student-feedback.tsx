"use client";

import { toast } from "sonner";

import type { BuilderFeedbackMessage } from "@/server/student-area/types";
import { Toaster } from "@/ui/components/sonner";

export function StudentFeedback({
  message,
}: {
  message?: BuilderFeedbackMessage | null;
}) {
  return (
    <>
      <Toaster richColors />
      <div aria-live="polite" className="sr-only" role="status">
        {message?.message}
      </div>
    </>
  );
}

export function showStudentFeedback(message: BuilderFeedbackMessage) {
  if (message.kind === "error") {
    toast.error(message.message);
    return;
  }

  if (message.kind === "success") {
    toast.success(message.message);
    return;
  }

  toast(message.message);
}
