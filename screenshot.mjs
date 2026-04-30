import puppeteer from 'puppeteer';

async function scrollToReveal(page) {
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = 600;
  for (let y = 0; y < totalHeight; y += step) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await new Promise(r => setTimeout(r, 120));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
}

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// ── Desktop ──────────────────────────────────────────────
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 15000 });
await scrollToReveal(page);

await page.screenshot({ path: 'screenshots/above_fold.png' });
console.log('Saved: above_fold.png');

await page.screenshot({ path: 'screenshots/full_page.png', fullPage: true });
console.log('Saved: full_page.png');

// ── Mobile ───────────────────────────────────────────────
await page.setViewport({ width: 390, height: 844 });
await page.reload({ waitUntil: 'networkidle0' });
await scrollToReveal(page);

await page.screenshot({ path: 'screenshots/mobile.png', fullPage: true });
console.log('Saved: mobile.png');

await browser.close();
console.log('Done.');
