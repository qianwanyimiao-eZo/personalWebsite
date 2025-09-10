export const debounce = (fn: Any, time: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let first = true;

  return function (...args: Any[]) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    if (first) {
      fn(...args);
      first = false;
      return;
    }

    timeout = setTimeout(() => {
      fn(...args);
      timeout = null;
      first = true;
    }, time);
  };
};
