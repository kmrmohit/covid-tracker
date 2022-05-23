import React, { useEffect } from "react";
import { Overlay } from "../../overlay";

const ESC_KEY_CODE = 27;
interface ColumnFilterProps {
  column: { filterValue: any; preFilteredRows: any; setFilter: any };
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: ColumnFilterProps) {
  const count = preFilteredRows?.length || 0;
  const [showInput, setShowInput] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleOutsideClick(e: KeyboardEvent | MouseEvent) {
    switch (e.type) {
      case "click":
        checkAndClose(e.target);
        break;
      case "keydown":
        if (e instanceof KeyboardEvent && e.keyCode === ESC_KEY_CODE) {
          checkAndClose(e.target);
        }
        break;
    }
    function checkAndClose(target: EventTarget | null) {
      if (inputRef?.current && !inputRef.current.contains(target as Node)) {
        e.stopPropagation();
        setShowInput(false);
      }
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
    window.addEventListener("click", handleOutsideClick);
    window.addEventListener("keydown", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [showInput]);

  return (
    <div className="column-filter" style={{ minHeight: "8px" }}>
      {showInput ? (
        <input
          ref={inputRef}
          className="search-input"
          value={filterValue || ""}
          onChange={(e) => {
            setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          placeholder={`Search ${count} records...`}
        />
      ) : (
        <span
          className="search-icon"
          onClick={(e) => {
            e.stopPropagation();
            setShowInput(true);
          }}
        >
          &#x1F50E;&#xFE0E;
        </span>
      )}
      {showInput ? (
        <Overlay opacity="0" onClose={() => setShowInput(false)} />
      ) : null}
    </div>
  );
}

export { DefaultColumnFilter };
