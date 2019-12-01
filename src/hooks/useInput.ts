import React from "react";

function useInput(
  keys: number[],
  keyDown?: (e: KeyboardEvent) => void,
  keyUp?: (e: KeyboardEvent) => void
) {
  const keyDownHandler = keyDown
    ? (e: KeyboardEvent) => {
        if (keys.includes(e.keyCode)) {
          keyDown(e);
        }
      }
    : null;

  const keyUpHandler = keyUp
    ? (e: KeyboardEvent) => {
        if (keys.includes(e.keyCode)) {
          keyUp(e);
        }
      }
    : null;

  React.useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyUpHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  });
}

export { useInput };
