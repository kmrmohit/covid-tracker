import { MouseEventHandler } from "react";
import Loader from "../loader";
import "./refresh-button.css";

interface ComponentProps {
  label: string;
  onClick: MouseEventHandler;
  loading?: boolean;
}

const RefreshButton: React.FC<ComponentProps> = function ({
  label,
  onClick,
  loading = false,
}) {
  return (
    <div
      className="button"
      aria-disabled={loading}
      style={{
        backgroundColor: loading ? "grey" : "#3d4c53",
        cursor: loading ? "default" : "pointer",
      }}
      onClick={loading ? undefined : onClick}
    >
      <span className="btnText">{label}</span>
      <div className="btnTwo">
        <span className="btnText2">{loading ? <Loader /> : <>&#x21bb;</>}</span>
      </div>
    </div>
  );
};

export default RefreshButton;
