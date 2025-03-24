import { config } from "../config/env";

export const logger = {
  log: (...args: any[]) => {
    if (config.isDev) console.log(...args);
  },
  warn: (...args: any[]) => {
    if (config.isDev) console.warn(...args);
  },
  error: (...args: any[]) => {
    if (config.isDev) console.error(...args);
  },
};
