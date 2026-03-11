import {
  type RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { DetectOverflow, GetSizes } from "./types";

/**
 * Base hook for detecting overflow on a DOM element given axis.
 * Observes the element for size changes and recomputes overflow reactively.
 *
 * @param getSizes - A function that extracts scroll and client sizes from the element
 * @param externRef - An optional external ref to attach to the element. If not provided, an internal ref is created.
 * @returns An object containing overflow state and the ref to attach to the element
 *
 * @example
 * // Custom axis (e.g. both dimensions summed)
 * const { isOverflowing, ref } = useDetectOverflow(
 *   (el) => ({ scrollSize: el.scrollWidth, clientSize: el.clientWidth }),
 * );
 */
export function useDetectOverflow<T extends HTMLElement>(
  getSizes: GetSizes,
  externRef?: RefObject<T | null>,
): DetectOverflow<T> {
  const __intern_ref = useRef<T>(null);
  const getSizesRef = useRef(getSizes);

  const ref = externRef ?? __intern_ref;

  // Keep ref in sync with latest getSizes
  useLayoutEffect(() => {
    getSizesRef.current = getSizes;
  }, [getSizes]);

  const [isOverflowing, setIsOverflowing] = useState(false);
  const [overflowAmount, setOverflowAmount] = useState(0);
  const [overflowRatio, setOverflowRatio] = useState(0);

  const updateState = useCallback((element: T | Element) => {
    const { scrollSize, clientSize } = getSizesRef.current(element);
    const overflowAmount = scrollSize - clientSize;
    const overflowRatio = clientSize > 0 ? scrollSize / clientSize : 0;

    setOverflowAmount(Math.max(0, overflowAmount));
    setIsOverflowing(overflowAmount > 0);
    setOverflowRatio(overflowRatio);
  }, []);

  useLayoutEffect(() => {
    const span = ref.current;
    if (!span) {
      const WARNING_MESSAGE = "ref is not attached to React element";
      console.warn(`${WARNING_MESSAGE}: ${span}`);
      return;
    }

    updateState(span);

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        updateState(entries[0].target);
      }
    });
    resizeObserver.observe(span);

    return () => {
      resizeObserver.unobserve(span);
    };
  }, [ref, updateState]);

  return {
    isOverflowing: isOverflowing,
    amount: overflowAmount,
    ratio: overflowRatio,
    ref: ref,
  };
}
