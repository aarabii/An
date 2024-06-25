"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const ResumeRender = () => {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <Document
        className="z-0"
        file="/docs/resume.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="mt-4">
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages ?? "--"}
        </p>
        <div className="flex space-x-2 bg-slate-500">
          <button
            type="button"
            className="px-4 py-2 text-black rounded disabled:opacity-50"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            <FaArrowLeft />
          </button>
          <button
            type="button"
            className="px-4 py-2 text-black rounded disabled:opacity-50"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
