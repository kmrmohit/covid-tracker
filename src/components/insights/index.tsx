import React from "react";
import { isNumber, numericRenderer } from "../../common-utils";
import { useAnimateNumber } from "../../hooks";
import "./insights.css";

interface ComponentProps {
  label: string;
  value: string | number | undefined;
}

const Insight: React.FC<ComponentProps> = function ({ label, value }) {
  const animatedValue = useAnimateNumber(Number(value));
  const formattedValue = isNumber(animatedValue)
    ? numericRenderer(animatedValue)
    : value;

  return (
    <div className="insight">
      <div className="insight-content">{formattedValue}</div>
      <label htmlFor="Insight Name" className="insight-label">
        {label}
      </label>
    </div>
  );
};

export default Insight;
