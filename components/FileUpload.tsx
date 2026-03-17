"use client";

import * as React from "react";
import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { File, Trash, Upload } from "lucide-react";

interface FileUploadProps {
  label: string;
  note?: string;
  acceptedFormats: string;
  maxSize: number;
  file: File | string | null;
  onChange: (file: File | string | null) => void;
}

export default function FileUpload({
  label,
  note,
  acceptedFormats,
  maxSize,
  file,
  onChange,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (selectedFile: File) => {
      if (!selectedFile.type.includes("image")) {
        setError("Please upload a valid image file");
        return;
      }
      if (selectedFile.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return;
      }
      setError(null);
      onChange(selectedFile);
    },
    [maxSize, onChange]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  return (
    <div className="flex flex-col space-y-2">
      <Label className="font-semibold text-green1">{label}</Label>
      {note && <p className="text-sm text-muted-foreground">{note}</p>}

      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <Card
          className={`relative border-2 border-dashed rounded-lg p-3 overflow-hidden max-h-40 transition-colors ${
            dragActive
              ? "border-green-500 bg-green-50"
              : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept={acceptedFormats}
            onChange={handleChange}
          />

          <div className="flex flex-col items-center justify-center gap-2 py-4">
            {file ? (
              typeof file === "string" ? (
                <>
                  <File className="h-8 w-8 text-gray-500" />
                  <a
                    href={file}
                    className="text-blue-500 text-sm hover:underline z-10"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Show File
                  </a>
                  <Trash
                    className="h-4 w-4 absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer z-10"
                    onClick={() => onChange(null)}
                  />
                </>
              ) : (
                <>
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin fill-green-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <p className="text-sm text-gray-600 font-semibold">
                    Uploading {file.name}...
                  </p>
                </>
              )
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-500" />
                <p className="text-sm text-gray-600">
                  Drag and drop file or{" "}
                  <span className="underline underline-offset-2 font-extrabold">
                    Choose File
                  </span>
                </p>
              </>
            )}

            {error && (
              <p className="text-sm text-red-600 w-full text-center">{error}</p>
            )}
          </div>
        </Card>

        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">Supported formats: {acceptedFormats}</p>
          <p className="text-xs text-gray-500">Maximum size: {maxSize}MB</p>
        </div>
      </div>
    </div>
  );
}
