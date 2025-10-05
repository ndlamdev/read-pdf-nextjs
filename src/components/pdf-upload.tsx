"use client";

import React, { useCallback } from "react";
import { FileText, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";

interface PDFUploadProps {
  onFileSelect: (file: File) => void;
}

export function PDFUpload({ onFileSelect }: PDFUploadProps) {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files[0] && files[0].type === "application/pdf") {
        onFileSelect(files[0]);
      } else {
        alert(t.invalidFile);
      }
    },
    [onFileSelect, t]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && files[0].type === "application/pdf") {
      onFileSelect(files[0]);
    } else {
      alert(t.invalidFile);
    }
  };

  return (
    <Card
      className={`border-2 border-dashed transition-colors ${
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4">
          <FileText className="h-12 w-12 text-primary" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{t.uploadPrompt}</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          {t.uploadDescription}
        </p>
        <label htmlFor="file-upload">
          <Button asChild>
            <span className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              {t.uploadButton}
            </span>
          </Button>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileInput}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
}
