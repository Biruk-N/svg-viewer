import React, { useRef, useState, ChangeEvent, DragEvent } from 'react';

function SvgViewerDragDrop() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFile = (file: File) => {
    if (file && file.name.endsWith('.svg')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setSvgContent(result);
        }
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid .svg file.');
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">SVG File Viewer</h2>

      {/* Background color selector */}
      <div className="flex items-center gap-3 mb-4">
        <label htmlFor="bg-color-picker" className="text-gray-700 dark:text-gray-200 text-sm">Background:</label>
        <input
          id="bg-color-picker"
          type="color"
          value={bgColor}
          onChange={e => setBgColor(e.target.value)}
          className="w-8 h-8 border-0 p-0 rounded cursor-pointer"
          title="Pick background color"
        />
        <select
          value={bgColor}
          onChange={e => setBgColor(e.target.value)}
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

      {/* File input fallback */}
      <input
        type="file"
        accept=".svg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="mb-4 hidden"
      />

      {/* Drag and Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full max-w-2xl mb-4 p-6 border-2 rounded-lg border-dashed transition-colors ${
          isDragging
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-700'
        }`}
        style={{ backgroundColor: bgColor }}
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          {isDragging ? 'Drop your .svg file here' : 'Click or drag & drop an SVG file'}
        </p>
      </div>

      {/* SVG Preview */}
      <div
        className="w-full max-w-2xl rounded shadow p-4 min-h-[300px] flex items-center justify-center border border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: bgColor, transition: 'background 0.2s' }}
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

export default SvgViewerDragDrop;
