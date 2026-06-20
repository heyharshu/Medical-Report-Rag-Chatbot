import { useEffect, useRef } from "react";
import { ChatMessage, type Message } from "./ChatMessage";
import { Loading } from "./Loading";

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  uploaded: boolean;
  onUploadClick: () => void;
  onSuggestion: (q: string) => void;
}

const SUGGESTIONS = [
  "What is my hemoglobin?",
  "What is my cholesterol level?",
  "Summarize my report.",
  "Are there any abnormal values?",
];

export function ChatWindow({
  messages,
  loading,
  uploaded,
  onUploadClick,
  onSuggestion,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!uploaded && messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-3xl">
            🩺
          </div>
          <h2 className="text-xl font-semibold">MediWise</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload your medical report to begin.
          </p>
        
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}

        {messages.length === 1 && uploaded && (
          <div className="flex flex-wrap gap-2 pl-11">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => onSuggestion(s)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground transition hover:border-primary hover:bg-primary/5"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm text-primary-foreground">
              🩺
            </div>
            <div className="rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3">
              <Loading />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
