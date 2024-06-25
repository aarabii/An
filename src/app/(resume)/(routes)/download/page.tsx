"use client";

import { useEffect } from "react";

export default function Download() {
  const resumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/docs/resume.pdf";
    link.download = "Aarab_Nishchal's Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    resumeDownload();
  }, []);

  return null;
}
