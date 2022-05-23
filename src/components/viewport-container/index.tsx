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
      const { y } = node.getBoundingClientRect();
      const offset = y + window.scrollY;
      node.style.height = `calc(100vh - ${offset}px - ${buffer})`;
    }
  }, []);

  React.useEffect(() => {
    const node = dynNodeRef?.current as any;
    if (node) {
      const { y, width: containerWidth } = node.getBoundingClientRect();
      const containerScrollWidth = node.scrollWidth;
      node.scrollLeft = (containerScrollWidth - containerWidth) / 2;
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    //const resizeInterval = setInterval(updateStyle, 2000);
    updateStyle();
    window.addEventListener("resize", updateStyle);
    return () => {
      window.removeEventListener("resize", updateStyle);
      //clearInterval(resizeInterval);
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
