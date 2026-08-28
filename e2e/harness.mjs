import { chromium } from 'playwright';
import { existsSync } from 'node:fs';

export const BASE = process.env.E2E_BASE ?? 'http://localhost:5173';

const launchOptions = () => {
  const candidates = [
    process.env.E2E_CHROME,
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);

  const executablePath = candidates.find(existsSync);
  return executablePath ? { executablePath } : {};
};

export const launch = () => chromium.launch(launchOptions());

/** Retry only the Windows/Chromium loopback suspension observed in long sweeps. */
export async function navigate(page, url, options) {
  try {
    return await page.goto(url, options);
  } catch (error) {
    if (!String(error).includes('ERR_NETWORK_IO_SUSPENDED')) throw error;
    await new Promise((resolve) => setTimeout(resolve, 250));
    return page.goto(url, options);
  }
}

/**
 * Minimal test recorder. Collects failures rather than throwing, so one broken
 * step doesn't hide the rest of the run.
 */
export function createRun(name) {
  const failures = [];
  const pageErrors = [];
  let passed = 0;

  return {
    failures,
    pageErrors,
    get passed() {
      return passed;
    },

    /** Attach to a page to capture uncaught runtime errors. */
    watch(page) {
      page.on('pageerror', (error) => pageErrors.push(String(error).slice(0, 200)));
      return page;
    },

    async step(label, fn) {
      try {
        await fn();
        passed++;
        console.log(`    ok   ${label}`);
      } catch (error) {
        const message = String(error).split('\n')[0].slice(0, 160);
        failures.push(`${label} :: ${message}`);
        console.log(`    FAIL ${label}`);
        console.log(`         ${message}`);
      }
    },

    note(text) {
      console.log(`         ${text}`);
    },

    heading(text) {
      console.log(`\n  ${name} - ${text}`);
    },
  };
}

export const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
