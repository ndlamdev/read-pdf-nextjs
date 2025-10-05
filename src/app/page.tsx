"use client";

import React, { useState } from "react";
import { FileText } from "lucide-react";
import { PDFUpload } from "@/components/pdf-upload";
import { PDFViewer } from "@/components/pdf-viewer";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/providers/language-provider";

export default function Home() {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleClose = () => {
    setSelectedFile(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
              <p className="text-sm text-muted-foreground">{t.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl">
          {!selectedFile ? (
            <PDFUpload onFileSelect={handleFileSelect} />
          ) : (
            <PDFViewer file={selectedFile} onClose={handleClose} />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Built with Next.js 15.5.4, React PDF, Tailwind CSS, and shadcn/ui
          </p>
        </footer>
      </div>
    </main>
  );
}
