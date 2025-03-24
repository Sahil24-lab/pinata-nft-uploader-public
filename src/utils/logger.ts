// utils/logger.js
export const logger = {
  log: (...args: any) => {
    if (
      process.env.NEXT_PUBLIC_NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_NODE_ENV === "local"
    ) {
      console.log(...args);
    }
  },
  warn: (...args: any) => {
    if (
      process.env.NEXT_PUBLIC_NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_NODE_ENV === "local"
    ) {
      console.warn(...args);
    }
  },
  error: (...args: any) => {
    if (
      process.env.NEXT_PUBLIC_NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_NODE_ENV === "local"
    ) {
      console.error(...args);
    }
  },
};
