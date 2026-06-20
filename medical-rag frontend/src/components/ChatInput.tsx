import { useRef, useState, type KeyboardEvent } from "react";
import { FiSend } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  disabled: boolean;
  loading: boolean;
  onSend: (text: string) => void;
  placeholder?: string;
}

export function ChatInput({ disabled, loading, onSend, placeholder }: ChatInputProps) {
  const [value, setValue] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    const text = value.trim();
    if (!text || disabled || loading) return;
    onSend(text);
    setValue("");
    if (taRef.current) taRef.current.style.height = "auto";
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t border-border bg-background/80 p-4 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/40">
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
          }}
          onKeyDown={onKeyDown}
          disabled={disabled || loading}
          placeholder={
            disabled ? "Upload a report to start chatting…" : placeholder ?? "Ask about your report…"
          }
          rows={1}
          className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
        <Button
          onClick={submit}
          disabled={disabled || loading || !value.trim()}
          size="icon"
          className="h-10 w-10 shrink-0 rounded-xl"
          aria-label="Send"
        >
          <FiSend className="h-4 w-4" />
        </Button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground">
        Press <kbd className="rounded bg-muted px-1">Enter</kbd> to send,{" "}
      </p>
    </div>
  );
}
