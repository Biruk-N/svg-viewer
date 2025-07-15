import React, { ChangeEvent, useRef } from "react";

function SvgViewer() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [svgContent, setSvgContent] = React.useState("");
  const [bgColor, setBgColor] = React.useState("#ffffff"); // Default white background

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".svg")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result == "string") {
          setSvgContent(result);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please select a valid .svg file.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        SVG File Viewer
      </h2>
      <div className="flex items-center gap-3 mb-4">
        <label
          htmlFor="bg-color-picker"
          className="text-gray-700 dark:text-gray-200 text-sm"
        >
          Background:
        </label>
        <input
          id="bg-color-picker"
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-8 h-8 border-0 p-0 rounded"
          title="Pick background color"
        />
        <select
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="ml-2 px-2 py-1 rounded border text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        >
          <option value="#ffffff">White</option>
          <option value="#000000">Black</option>
          <option value="#f3f4f6">Gray</option>
          <option value="#e5e7eb">Light Gray</option>
          <option value="#1e293b">Slate</option>
          <option value="#fef08a">Yellow</option>
          <option value="#fca5a5">Red</option>
          <option value="#6ee7b7">Green</option>
          <option value="#93c5fd">Blue</option>
        </select>
      </div>
      <input
        type="file"
        accept=".svg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="mb-4"
      />
      <div
        className="w-full max-w-2xl rounded shadow p-4 min-h-[300px] flex items-center justify-center"
        style={{ background: bgColor, transition: "background 0.2s" }}
      >
        {svgContent ? (
          <div
            className="svg-preview w-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <span className="text-gray-400">No SVG loaded.</span>
        )}
      </div>
    </div>
  );
}

export default SvgViewer;
