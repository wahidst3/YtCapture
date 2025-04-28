import React from 'react';

const DownloadButton = () => {
    function downloadPDF() {
        window.location.href = 'http://localhost:3000/download-pdf';
      }
  return (
    <button
      className="inline-block rounded-lg bg-blue-500 text-white font-sans text-sm shadow-[0_14px_56px_-11px_rgba(24,117,255,0.7)] w-40 py-3 px-4 transition-all duration-400 ease-in-out hover:bg-blue-600 focus:outline-none"
      onClick={downloadPDF}
    >
      <span className="relative inline-block transition-all duration-400 ease-in-out group-hover:pr-14">
        Download
        <span className="absolute opacity-0 top-0 -right-5 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:right-0">
          PDF
        </span>
      </span>
    </button>
  );
};

export default DownloadButton;