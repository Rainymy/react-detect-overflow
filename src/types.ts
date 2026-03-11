import type { RefObject } from "react";

export type DetectOverflow<T> = {
  isOverflowing: boolean;
  amount: number;
  ratio: number;
  ref: RefObject<T | null>;
};

/**
 * A function that extracts the scroll and client sizes from a DOM element,
 * used to determine the axis of overflow detection.
 *
 * @example
 * // Horizontal axis
 * const getSizes: GetSizes = (el) => ({ scrollSize: el.scrollWidth, clientSize: el.clientWidth });
 */
export type GetSizes = (element: Element) => {
  scrollSize: number;
  clientSize: number;
};
