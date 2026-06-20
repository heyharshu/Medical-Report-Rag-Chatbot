import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ChatWindow } from "@/components/ChatWindow";
import { ChatInput } from "@/components/ChatInput";
import { UploadCard } from "@/components/UploadCard";
import type { Message } from "@/components/ChatMessage";
import { sendQuestion, uploadPDF } from "@/services/api";

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  timestamp: Date.now(),
  content: `Hello 👋

I'm your **Medical Report Assistant- MediWise**.

Ask me anything about your uploaded report.

**Examples:**
- What is my hemoglobin?
- What is my cholesterol level?
- Summarize my report.
- Are there any abnormal values?`,
};

export function Home() {
  const [dark, setDark] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const mobileUploadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      await uploadPDF(selectedFile);
      setUploaded(true);
      setMessages([{ ...WELCOME, timestamp: Date.now() }]);
      toast.success("Report processed successfully");
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      if (e.code === "ERR_NETWORK") toast.error("Cannot connect to server.");
      else toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    try {
      const res = await sendQuestion(text);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: res.answer,
          timestamp: Date.now(),
        },
      ]);
    } catch (err: unknown) {
      const e = err as { code?: string };
      const msg =
        e.code === "ERR_NETWORK"
          ? "Cannot connect to server."
          : "Something went wrong.";
      toast.error(msg);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `⚠️ ${msg}`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewReport = () => {
    setUploaded(false);
    setSelectedFile(null);
    setMessages([]);
  };

  const scrollToUpload = () => {
    mobileUploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground md:flex-row">
      <Sidebar
        uploaded={uploaded}
        uploading={uploading}
        selectedFile={selectedFile}
        onSelect={setSelectedFile}
        onUpload={handleUpload}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
          onClearChat={() => setMessages(uploaded ? [{ ...WELCOME, timestamp: Date.now() }] : [])}
          onNewReport={handleNewReport}
          uploaded={uploaded}
        />

        {/* Mobile upload card */}
        <div ref={mobileUploadRef} className="border-b border-border p-4 md:hidden">
          <UploadCard
            uploaded={uploaded}
            uploading={uploading}
            selectedFile={selectedFile}
            onSelect={setSelectedFile}
            onUpload={handleUpload}
            compact
          />
        </div>

        <ChatWindow
          messages={messages}
          loading={loading}
          uploaded={uploaded}
          onUploadClick={scrollToUpload}
          onSuggestion={handleSend}
        />

        <ChatInput
          disabled={!uploaded}
          loading={loading}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
