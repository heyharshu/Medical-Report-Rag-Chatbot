import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { UploadCard } from "./UploadCard";

interface SidebarProps {
  uploaded: boolean;
  uploading: boolean;
  selectedFile: File | null;
  onSelect: (file: File) => void;
  onUpload: () => void;
}

export function Sidebar(props: SidebarProps) {
  return (
    <aside className="hidden w-[300px] shrink-0 flex-col gap-4 border-r border-border bg-muted/30 p-5 md:flex">
      <div>
        <h2 className="text-sm font-semibold">Report Status</h2>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-sm">
          {props.uploaded ? (
            <>
              <FiCheckCircle className="h-4 w-4 text-primary" />
              <span>Report ready</span>
            </>
          ) : (
            <>
              <FiCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">No report uploaded</span>
            </>
          )}
        </div>
      </div>

      <UploadCard {...props} compact />


    </aside>
  );
}
