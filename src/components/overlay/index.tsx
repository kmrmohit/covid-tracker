import "./overlay.css";

interface ComponentProps {
  opacity?: React.CSSProperties["opacity"];
  onClose?: () => void;
}
export function Overlay({ opacity, onClose }: ComponentProps) {
  return (
    <div
      className="overlay"
      style={{ opacity: opacity || "0.7" }}
      onClick={(e) => {
        e.stopPropagation();
        onClose?.();
      }}
    />
  );
}
