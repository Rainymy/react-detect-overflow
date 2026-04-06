# react-detect-overflow

React hooks for detecting horizontal and vertical overflow on DOM elements. Reactively updates when the element is resized.

---

## Usage

### `useDetectOverflowX`

Detects horizontal overflow on an element.

```tsx
import { useDetectOverflowX } from "react-detect-overflow";

export default function MyComponent() {
  const { isOverflowing, amount, ratio, ref } =
    useDetectOverflowX<HTMLDivElement>();

  return (
    <div ref={ref} style={{ width: "100px", background: "yellow" }}>
      <div style={{ width: "132px", background: "teal" }}>
        {/* Overflow by 32px */}
        {isOverflowing ? (
          <div>Overflowing by {amount}px</div>
        ) : (
          <div>No Overflow</div>
        )}
      </div>
    </div>
  );
}
```

### `useDetectOverflowY`

Detects vertical overflow on an element.

```tsx
import { useDetectOverflowY } from "react-detect-overflow";

function MyComponent() {
  const { isOverflowing, amount, ratio, ref } =
    useDetectOverflowY<HTMLDivElement>();

  return (
    <div ref={ref} style={{ height: "100px", background: "yellow" }}>
      <div style={{ height: "231px", background: "teal" }}>
        {/* Overflow by 131px */}
        {isOverflowing ? (
          <div>Overflowing by {amount}px</div>
        ) : (
          <div>No Overflow</div>
        )}
      </div>
    </div>
  );
}
```

### Using an external ref

If you already have a ref on the element, pass it in to avoid creating a second one.

```tsx
import { useRef } from "react";
import { useDetectOverflowX } from "react-detect-overflow";

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const { isOverflowing } = useDetectOverflowX(ref);

  return <div ref={ref}>{isOverflowing && <span>Overflowing!</span>}</div>;
}
```

---

### Example usage with `ratio`

`ratio` is the `scrollSize / clientSize` of the element. A value of `1` means no overflow — values above `1` indicate how much larger the content is relative to the visible area. This can be used to drive animations or dynamic styles.

```tsx
/**
 * A text title that bounces when overflowing.
 */
function BouncyTitle({ title }) {
  const { isOverflowing, amount, ratio, ref } =
    useDetectOverflowX<HTMLDivElement>();

  const base_duration = 3;

  return (
    <div ref={ref} className={"container"}>
      <span
        className={`text_content ${isOverflowing ? "bounce" : ""}`}
        data-overflow={amount}
        data-animation-duration={base_duration * ratio}
      >
        {title}
      </span>
    </div>
  );
}
```
