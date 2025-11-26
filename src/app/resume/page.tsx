"use client";

import { Fragment, useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar, Footer, Background } from "@/components/common";
import { nasalization } from "@/app/fonts";
import { PDFErrorBoundary } from "@/components/PDFErrorBoundary";
import {
  HiDownload,
  HiZoomIn,
  HiZoomOut,
  HiOutlineArrowsExpand,
  HiExternalLink,
} from "react-icons/hi";

interface HTMLIFrameElementWithFullscreen extends HTMLIFrameElement {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface DocumentWithFullscreen extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

// Utility to detect browser capabilities - Removed as simplified viewer doesn't use it
// const getBrowserInfo = () => { ... };

export default function Resume() {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const PDF_URL = "/docs/Aarab_Nishchal_Resume.pdf";

  const ref = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const iframe = document.querySelector(
        "iframe"
      ) as HTMLIFrameElementWithFullscreen;
      if (iframe?.requestFullscreen) {
        iframe.requestFullscreen();
        setIsFullscreen(true);
      } else if (iframe?.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as DocumentWithFullscreen).webkitExitFullscreen) {
        (document as DocumentWithFullscreen).webkitExitFullscreen();
      } else if ((document as DocumentWithFullscreen).msExitFullscreen) {
        (document as DocumentWithFullscreen).msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`min-h-screen selection:bg-primary/20 ${nasalization.className}`}>
      <Background />
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary mb-2">
              Resume
            </h1>
            <p className="text-muted-foreground">
              View or download my resume
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={toggleFullscreen}
              className="group relative flex items-center gap-2 px-5 py-3 rounded-xl overflow-hidden transition-all duration-300 border border-secondary/30 bg-card/30 hover:bg-secondary/10"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px hsl(var(--secondary) / 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                <HiOutlineArrowsExpand className="w-4 h-4 text-secondary relative z-10 pointer-events-none" />
                <span className="text-foreground font-medium relative z-10 pointer-events-none">
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </span>
              </motion.button>

              <motion.a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 px-5 py-3 rounded-xl overflow-hidden transition-all duration-300 border border-secondary/30 bg-card/30 hover:bg-secondary/10"
                whileHover={{
                  scale: 1.05,
                  borderColor: "hsl(var(--secondary) / 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <HiExternalLink className="w-4 h-4 text-secondary pointer-events-none" />
                <span className="text-foreground font-medium pointer-events-none">
                  Open in New Tab
                </span>
              </motion.a>

              <motion.a
                href={PDF_URL}
                download="Aarab_Nishchal_Resume.pdf"
                className="group relative flex items-center gap-2 px-6 py-3 rounded-xl overflow-hidden transition-all duration-300 font-medium text-primary-foreground"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
                  boxShadow: "0 8px 25px hsl(var(--primary) / 0.3)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 35px hsl(var(--primary) / 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                <HiDownload className="w-4 h-4 relative z-10 pointer-events-none" />
                <span className="relative z-10 pointer-events-none">Download PDF</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-3xl shadow-2xl z-10"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-card/30 via-card/20 to-card/30 backdrop-blur-xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-3xl pointer-events-none" />
            <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-3xl bg-clip-border pointer-events-none" />

            <PDFErrorBoundary pdfUrl={PDF_URL}>
              <motion.div
                className="pdf-container relative w-full overflow-hidden bg-white/95 backdrop-blur-sm rounded-3xl"
                style={{ height: "800px" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <div className="pdf-viewer">
                  <div
                    className="flex justify-center items-start min-h-full p-4"
                    style={{
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: "top center",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  >
                    <iframe
                      src={`${PDF_URL}#view=FitH&toolbar=0&navpanes=0&scrollbar=1`}
                      width="100%"
                      height="780px"
                      className="border-0 shadow-lg rounded-lg"
                      title="Resume PDF"
                      style={{
                        maxWidth: "100%",
                        minHeight: "600px",
                        background: "#ffffff",
                      }}
                      allow="fullscreen"
                    />
                  </div>
                  </div>

              </motion.div>
            </PDFErrorBoundary>
          </motion.div>
        </div>

        <Footer />

    </div>
  );
}
