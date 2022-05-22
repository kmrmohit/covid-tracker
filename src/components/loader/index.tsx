import "./loader.css";

interface ComponentProps {
  variant?: "small" | "medium" | "large";
}

const Loader: React.FC<ComponentProps> = function ({ variant = "medium" }) {
  return (
    <div className={`loader-container ${variant}`}>
    </div>
  );
};

export default Loader;
