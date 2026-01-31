import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload, FileText, X } from "lucide-react";

interface FileUploadProps {
  label: string;
  helperText?: string;
  multiple?: boolean;
  accept?: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
  className?: string;
}

export function FileUpload({
  label,
  helperText,
  multiple = false,
  accept,
  files,
  onFilesChange,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (multiple) {
      onFilesChange([...files, ...droppedFiles]);
    } else {
      onFilesChange(droppedFiles.slice(0, 1));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (multiple) {
      onFilesChange([...files, ...selectedFiles]);
    } else {
      onFilesChange(selectedFiles.slice(0, 1));
    }
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative cursor-pointer rounded-xl border-2 border-dashed p-8 transition-all duration-200",
          "flex flex-col items-center justify-center text-center",
          "hover:border-primary/50 hover:bg-primary/5",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border bg-muted/30"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {helperText && (
          <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          Drag & drop or click to browse
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border bg-card p-3"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="rounded-full p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
