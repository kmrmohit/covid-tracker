import { useEffect, useState } from "react";
import { isNumber } from "./common-utils";

export function useAnimateNumber(number: number): number {
  const [current, setCurrent] = useState(0);
  const times = Math.max(1, Math.floor(number / 100));

  useEffect(() => {
    let it: any;
    if (isNumber(number)) {
      it = setInterval(() => {
        setCurrent((current) => {
          if (current === number) {
            clearInterval(it);
            return current;
          } else return current + (times + current > number ? 1 : times);
        });
      }, 50);
    }
    return () => {
      clearInterval(it);
    };
  }, [number, times]);

  return isNumber(number) ? current : NaN;
}
