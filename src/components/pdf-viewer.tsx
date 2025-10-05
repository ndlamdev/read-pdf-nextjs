"use client";

import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Download, Loader2, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/language-provider";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export interface PDFViewerProps {
  file: File;
  onClose: () => void;
}

// Helper function to get default scale based on screen size
const getDefaultScale = (): number => {
  if (typeof window === "undefined") return 1.0;
  // Mobile: < 768px -> 60%
  // Tablet/Desktop: >= 768px -> 100%
  return window.innerWidth < 768 ? 0.6 : 1.0;
};

export function PDFViewer({ file, onClose }: PDFViewerProps) {
  const { t } = useLanguage();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(getDefaultScale());
  const [loading, setLoading] = useState<boolean>(true);

  // Set initial scale and handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newScale = getDefaultScale();
      setScale(newScale);
    };

    // Set initial scale
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Reset page number and scale when file changes
  useEffect(() => {
    setPageNumber(1);
    setScale(getDefaultScale());
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = () => {
    setLoading(false);
    alert(t.error);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const downloadFile = () => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              title={t.previousPage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {t.page} {pageNumber} {t.of} {numPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              title={t.nextPage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={zoomOut}
              disabled={scale <= 0.5}
              title={t.zoomOut}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={zoomIn}
              disabled={scale >= 3.0}
              title={t.zoomIn}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 justify-center w-full md:w-fit">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadFile}
              title={t.download}
            >
              <Download className="mr-2 h-4 w-4" />
              {t.download}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onClose}
              title={t.closeFile}
            >
              <X className="mr-2 h-4 w-4" />
              {t.closeFile}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-auto">
        <div className="flex justify-center p-4">
          {loading && (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="mx-auto"
            />
          </Document>
        </div>
      </Card>
    </div>
  );
}
