import React, { ReactNode } from "react";

export const ViewportContainer: React.FC<{
  buffer: string;
  minHeight: string;
  children: ReactNode;
}> = function ({ children, buffer, minHeight }) {
  const dynNodeRef = React.useRef<HTMLDivElement>(null);
  const updateStyle = React.useCallback(() => {
    const node = dynNodeRef?.current as any;
    if (node) {
      const offset = node.getBoundingClientRect().y + window.scrollY;
      node.style.height = `calc(100vh - ${offset}px - ${buffer})`;
    }
  }, [dynNodeRef]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const resizeInterval = setInterval(updateStyle, 2000);
    updateStyle();
    window.addEventListener("resize", updateStyle);
    return () => {
      window.removeEventListener("resize", updateStyle);
      clearInterval(resizeInterval);
    };
  }, []);

  return (
    <div
      ref={dynNodeRef}
      style={{
        minHeight,
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default ViewportContainer;
