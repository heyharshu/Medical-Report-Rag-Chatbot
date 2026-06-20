import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { FiUploadCloud, FiFileText, FiCheckCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Loading } from "./Loading";

interface UploadCardProps {
  uploaded: boolean;
  uploading: boolean;
  selectedFile: File | null;
  onSelect: (file: File) => void;
  onUpload: () => void;
  compact?: boolean;
}

export function UploadCard({
  uploaded,
  uploading,
  selectedFile,
  onSelect,
  onUpload,
  compact,
}: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) return;
    onSelect(f);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
    handleFiles(e.dataTransfer.files);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files);

  return (
    <div
      className={`rounded-2xl border border-border bg-card p-4 shadow-sm transition ${
        compact ? "" : "p-6"
      }`}
    >
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition ${
          drag
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/60 hover:bg-muted/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={onChange}
        />
        {uploaded && !selectedFile ? (
          <>
            <FiCheckCircle className="mb-2 h-8 w-8 text-primary" />
            <p className="text-sm font-medium">Report processed</p>
            <p className="text-xs text-muted-foreground">Click to upload a new one</p>
          </>
        ) : selectedFile ? (
          <>
            <FiFileText className="mb-2 h-8 w-8 text-primary" />
            <p className="line-clamp-1 break-all text-sm font-medium">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </>
        ) : (
          <>
            <FiUploadCloud className="mb-2 h-8 w-8 text-primary" />
            <p className="text-sm font-medium">Drop your PDF here</p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
          </>
        )}
      </div>

      {uploading ? (
        <div className="mt-4 space-y-2 rounded-xl bg-muted/50 p-3 text-xs">
          <Loading label="Uploading" />
          <p className="text-muted-foreground">Processing report…</p>
          <p className="text-muted-foreground">Generating embeddings…</p>
        </div>
      ) : (
        selectedFile && (
          <Button onClick={onUpload} className="mt-4 w-full" disabled={uploading}>
            Upload PDF
          </Button>
        )
      )}

      {uploaded && !uploading && (
        <p className="mt-3 text-center text-xs text-primary">
          ✅ Ready — ask questions in the chat
        </p>
      )}
    </div>
  );
}
