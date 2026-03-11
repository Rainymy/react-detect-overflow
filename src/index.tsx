import type { RefObject } from "react";
import { useDetectOverflow } from "./overflow";
import type { DetectOverflow } from "./types";

export { useDetectOverflow };

/**
 * Detects horizontal (X-axis) overflow on a DOM element.
 * Reactively updates when the element is resized.
 *
 * @param externRef - An optional external ref. If not provided, an internal ref is created.
 * @returns `isOverflowing` — whether the element overflows horizontally
 * @returns `amount` — the number of overflowing pixels
 * @returns `ratio` — `scrollWidth / clientWidth` (1 means no overflow)
 * @returns `ref` — attach this to the element you want to observe
 *
 * @example
 * const { isOverflowing, amount, ratio, ref } = useDetectOverflowX();
 * return <div ref={ref}>...</div>;
 */
export function useDetectOverflowX<T extends HTMLElement>(
  externRef?: RefObject<T | null>,
): DetectOverflow<T> {
  return useDetectOverflow(
    (el) => ({ scrollSize: el.scrollWidth, clientSize: el.clientWidth }),
    externRef,
  );
}

/**
 * Detects vertical (Y-axis) overflow on a DOM element.
 * Reactively updates when the element is resized.
 *
 * @param externRef - An optional external ref. If not provided, an internal ref is created.
 * @returns `isOverflowing` — whether the element overflows vertically
 * @returns `amount` — the number of overflowing pixels
 * @returns `ratio` — `scrollHeight / clientHeight` (1 means no overflow)
 * @returns `ref` — attach this to the element you want to observe
 *
 * @example
 * const { isOverflowing, amount, ratio, ref } = useDetectOverflowY();
 * return <div ref={ref}>...</div>;
 */
export function useDetectOverflowY<T extends HTMLElement>(
  externRef?: RefObject<T | null>,
): DetectOverflow<T> {
  return useDetectOverflow(
    (el) => ({ scrollSize: el.scrollHeight, clientSize: el.clientHeight }),
    externRef,
  );
}
