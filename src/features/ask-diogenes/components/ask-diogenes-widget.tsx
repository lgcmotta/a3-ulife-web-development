"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { MessageCircle, Minus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessage, type Message } from "@/ui/components/chat-message";
import { TypingIndicator } from "@/ui/components/typing-indicator";
import { Button } from "@/ui/components/button";
import { cn } from "@/ui/utils";

const promptIds = [
  "platformOrientation",
  "learningTracks",
  "topicStudy",
  "progressFeedback",
  "accessibilityLanguage",
] as const;

const actionTargets = {
  openTracks: "/tracks",
  openBuilder: "/tracks/builder",
  openHistory: "/tracks/history",
  openAccessibility: "/accessibility",
  backHome: "/",
} as const;

type PromptId = (typeof promptIds)[number];
type ActionId = keyof typeof actionTargets;

type PromptScript = {
  label: string;
  userMessage: string;
  response: string;
  actions?: ActionId[];
};

type ActionScript = Record<ActionId, { label: string }>;

type AssistantMessage = Message & {
  role: "user" | "assistant";
};

const typingDelayMs = 550;

function resetFocusTo(element: HTMLElement | null) {
  window.setTimeout(() => element?.focus(), 0);
}

export function AskDiogenesWidget() {
  const t = useTranslations("askDiogenes");
  const prompts = t.raw("prompts") as Record<PromptId, PromptScript>;
  const actions = t.raw("actions") as ActionScript;
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState<PromptId | null>(null);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);

  const clearTypingTimeout = useCallback(() => {
    if (typingTimeoutRef.current !== null) {
      window.clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }, []);

  const resetSession = useCallback(() => {
    clearTypingTimeout();
    setIsTyping(false);
    setSelectedPromptId(null);
    setMessages([]);
  }, [clearTypingTimeout]);

  const closePanel = useCallback(() => {
    resetSession();
    setIsOpen(false);
    resetFocusTo(launcherRef.current);
  }, [resetSession]);

  const openPanel = useCallback(() => {
    resetSession();
    setIsOpen(true);
  }, [resetSession]);

  const selectPrompt = useCallback(
    (promptId: PromptId) => {
      clearTypingTimeout();

      const prompt = prompts[promptId];
      const userMessage: AssistantMessage = {
        id: `${promptId}-user`,
        role: "user",
        content: prompt.userMessage,
      };

      setSelectedPromptId(promptId);
      setIsTyping(true);
      setMessages([userMessage]);

      typingTimeoutRef.current = window.setTimeout(() => {
        const assistantMessage: AssistantMessage = {
          id: `${promptId}-assistant`,
          role: "assistant",
          content: prompt.response,
        };

        setMessages([userMessage, assistantMessage]);
        setIsTyping(false);
        typingTimeoutRef.current = null;
      }, typingDelayMs);
    },
    [clearTypingTimeout, prompts],
  );

  useEffect(() => clearTypingTimeout, [clearTypingTimeout]);

  useEffect(() => {
    if (isOpen) {
      resetFocusTo(panelRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !scrollAreaRef.current) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isOpen, isTyping, messages.length, selectedPromptId]);

  const selectedPrompt = selectedPromptId ? prompts[selectedPromptId] : null;
  const selectedActionIds = selectedPrompt?.actions ?? [];

  return (
    <aside
      aria-label={t("launcher.openLabel")}
      className="fixed bottom-4 right-4 z-[60] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3"
    >
      {isOpen ? (
        <section
          aria-labelledby="ask-diogenes-title"
          className="flex h-[min(34rem,calc(100vh-7rem))] max-h-[min(34rem,calc(100vh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border bg-[var(--surface)] text-[var(--surface-foreground)] shadow-xl"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closePanel();
            }
          }}
          ref={panelRef}
          tabIndex={-1}
        >
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface-strong)] p-4 text-[var(--surface-strong-foreground)]">
            <div className="min-w-0">
              <p id="ask-diogenes-title" className="text-base font-bold">
                {t("panel.title")}
              </p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{t("panel.description")}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                aria-label={t("panel.minimizeLabel")}
                onClick={closePanel}
                size="icon"
                type="button"
                variant="ghost"
              >
                <Minus aria-hidden="true" className="h-4 w-4" />
              </Button>
              <Button
                aria-label={t("panel.closeLabel")}
                onClick={closePanel}
                size="icon"
                type="button"
                variant="ghost"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className="min-h-0 flex-1 overflow-y-auto p-4 pb-6"
            data-testid="ask-diogenes-scroll-area"
            ref={scrollAreaRef}
          >
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] p-3 text-sm text-[var(--surface-strong-foreground)]">
              <p className="font-semibold">{t("persona.name")}</p>
              <p className="mt-1">{t("persona.greeting")}</p>
              <p className="mt-2 text-[var(--muted-foreground)]">{t("persona.description")}</p>
            </div>

            <div aria-label={t("panel.promptGroupLabel")} className="mt-4 grid gap-2" role="group">
              {promptIds.map((promptId) => (
                <Button
                  className={cn(
                    "h-auto justify-start whitespace-normal text-left",
                    selectedPromptId === promptId && "border-[var(--action)]",
                  )}
                  key={promptId}
                  onClick={() => selectPrompt(promptId)}
                  type="button"
                  variant="outline"
                >
                  {prompts[promptId].label}
                </Button>
              ))}
            </div>

            {messages.length > 0 ? (
              <div className="mt-4 grid gap-3" data-testid="ask-diogenes-messages">
                {messages.map((message) => (
                  <ChatMessage animation="fade" key={message.id} {...message} />
                ))}
              </div>
            ) : null}

            <div aria-live="polite" className="mt-4 min-h-12">
              {isTyping ? (
                <div>
                  <p className="sr-only">{t("panel.typingLabel")}</p>
                  <div aria-hidden="true">
                    <TypingIndicator />
                  </div>
                </div>
              ) : null}
            </div>

            {!isTyping && selectedActionIds.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedActionIds.map((actionId) => (
                  <Link
                    className="button-base button-secondary inline-flex min-h-10 items-center justify-center rounded-md border px-3 py-2 text-sm font-semibold"
                    href={actionTargets[actionId]}
                    key={actionId}
                  >
                    {actions[actionId].label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <Button
        aria-label={isOpen ? t("launcher.minimizedLabel") : t("launcher.openLabel")}
        className="h-auto min-h-12 rounded-full px-4 shadow-lg"
        onClick={isOpen ? closePanel : openPanel}
        ref={launcherRef}
        type="button"
      >
        <MessageCircle aria-hidden="true" className="h-5 w-5" />
        <span>{t("launcher.closedLabel")}</span>
      </Button>
    </aside>
  );
}
