"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

import { FaChevronLeft, FaChevronRight, FaDownload } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/CardComponent";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

export default function Resume() {
  const router = useRouter();
  const resumeUrl = "/docs/MyResume.pdf";
  const viewerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState<number>(1.5);

  // Initialize plugins
  const zoomPluginInstance = zoomPlugin();
  const { ZoomIn: ZoomInHandler, ZoomOut: ZoomOutHandler } = zoomPluginInstance;
  const pageNavigationPluginInstance = pageNavigationPlugin();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fix for white space: Add custom CSS to container
    if (viewerRef.current) {
      const style = document.createElement("style");
      style.textContent = `
        .rpv-core__inner-page {
          padding: 0 !important;
        }
        .rpv-core__inner-pages {
          padding: 0 !important;
          background-color: #ff00ff !important;

        }
        .rpv-core__viewer {
          background-color: transparent !important;
        }
        .rpv-core__inner-page canvas {
          max-width: 100% !important;
        }
      `;
      viewerRef.current.appendChild(style);
    }
  }, [viewerRef]);

  const handleTryAgain = () => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.setAttribute("download", "Aarab's resume.pdf");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDocumentLoad = (e: any) => {
    setNumPages(e.doc.numPages);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const renderZoomButtons = () => (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
            >
              <BsZoomOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom Out</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm min-w-14 text-center">
        {Math.round(scale * 100)}%
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              disabled={scale >= 3}
            >
              <BsZoomIn className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom In</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <div className="flex flex-col w-full mx-auto p-4 sm:p-6">
      <Card className="overflow-hidden">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b">
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push("/")}
                  >
                    <FaHome className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Go Home</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button variant="outline" onClick={handleDownload}>
              <FaDownload className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>

          {renderZoomButtons()}

          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage <= 1 || isLoading || error !== null}
                  >
                    <FaChevronLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Previous Page</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center space-x-1">
              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm min-w-8 text-center">
                {currentPage}
              </span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{numPages || "-"}</span>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, numPages || 1)
                      )
                    }
                    disabled={
                      currentPage >= (numPages || 1) ||
                      isLoading ||
                      error !== null
                    }
                  >
                    <FaChevronRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Next Page</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* PDF Container */}
        <div
          className="bg-slate-900 w-full"
          style={{
            height: "calc(100vh - 150px)",
            minHeight: "600px",
          }}
          ref={viewerRef}
        >
          {isLoading && !error && (
            <div className="flex flex-col items-center justify-center w-full h-full text-center p-4">
              <div className="w-full max-w-xl h-full flex flex-col gap-4">
                <Skeleton className="h-8 w-1/2 mx-auto" />
                <Skeleton className="h-[70%] w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
              <p className="mt-4 text-muted-foreground animate-pulse">
                Loading PDF Document...
              </p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center w-full h-full text-center p-4">
              <p className="text-destructive mb-2 font-semibold text-lg">
                Error Loading Resume
              </p>
              <p className="text-muted-foreground mb-4 text-sm max-w-md">
                {error}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button onClick={handleTryAgain} variant="default">
                  <FiRefreshCw className="h-4 w-4 mr-2" />
                  <span>Try Again</span>
                </Button>
                <Button onClick={() => router.push("/")} variant="outline">
                  <FaHome className="h-4 w-4 mr-2" />
                  <span>Go Home</span>
                </Button>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <div className="w-full h-full pdf-viewer-container">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={resumeUrl}
                  plugins={[zoomPluginInstance, pageNavigationPluginInstance]}
                  initialPage={currentPage - 1}
                  onPageChange={(e) => setCurrentPage(e.currentPage + 1)}
                  onDocumentLoad={handleDocumentLoad}
                  defaultScale={scale}
                  renderLoader={(percentages) => (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-primary">
                          Loading {Math.round(percentages)}%
                        </p>
                      </div>
                    </div>
                  )}
                />
              </Worker>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
