import { createFileRoute } from "@tanstack/react-router";
import SvgViewer from "~/components/SVGViewer";
import SvgViewerDragDrop from "~/components/SVGViewerdrag";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-4 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Welcome to SVG Viewer
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
        Easily preview and inspect your <strong>.svg</strong> files right in the
        browser. Drag and drop an SVG file below, or click the drop area to
        upload one manually. You can also customize the background color to test
        visibility and contrast in different themes.
      </p>
      {/* <SvgViewer /> */}
      <SvgViewerDragDrop />
    </div>
  );
}
