import { useState } from "react";
import { FiCopy, FiCheck, FiUser } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export function ChatMessage({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const copy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} animate-in fade-in`}>
      {!isUser && (
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm text-primary-foreground">
          🩺
        </div>
      )}
      <div className={`group max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-card text-card-foreground border border-border rounded-tl-sm"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:my-2">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 px-1 text-[10px] text-muted-foreground opacity-0 transition group-hover:opacity-100">
          <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          {!isUser && (
            <button
              onClick={copy}
              className="flex items-center gap-1 hover:text-foreground"
              aria-label="Copy answer"
            >
              {copied ? <FiCheck className="h-3 w-3" /> : <FiCopy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      </div>
      {isUser && (
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
          <FiUser className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
