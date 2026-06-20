import { FiMoon, FiSun, FiTrash2, FiFilePlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  dark: boolean;
  onToggleDark: () => void;
  onClearChat: () => void;
  onNewReport: () => void;
  uploaded: boolean;
}

export function Header({ dark, onToggleDark, onClearChat, onNewReport, uploaded }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          🩺
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold">MediWise</h1>
          <p className="truncate text-xs text-muted-foreground">
            AI-powered Medical Report Assistant
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {uploaded && (
          <>
            <Button variant="ghost" size="sm" onClick={onClearChat} className="gap-2">
              <FiTrash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Clear chat</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onNewReport} className="gap-2">
              <FiFilePlus className="h-4 w-4" />
              <span className="hidden sm:inline">New report</span>
            </Button>
          </>
        )}
        <Button variant="ghost" size="icon" onClick={onToggleDark} aria-label="Toggle theme">
          {dark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}
