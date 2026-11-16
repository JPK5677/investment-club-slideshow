import { chromium } from 'playwright'
import { pathToFileURL } from 'node:url'
import { mkdirSync } from 'node:fs'
const url = pathToFileURL('C:/Users/johnk/Documents/investment-club/Investment-Club-Slideshow.html').href
const out = 'shots'; mkdirSync(out, { recursive: true })
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const sizes = [[1920,1080],[1280,720],[390,844]]
for (const [w,h] of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  const errs = [], reqs = []
  page.on('console', m => { if (['error','warning'].includes(m.type())) errs.push(m.text()) })
  page.on('pageerror', e => errs.push('PAGEERR ' + e.message))
  page.on('request', r => { if (!r.url().startsWith('file:') && !r.url().startsWith('data:')) reqs.push(r.url()) })
  await page.goto(url)
  for (let i = 0; i < 8; i++) {
    await page.waitForTimeout(i === 0 ? 3500 : 3800)
    // Wait until the SplitText heading finishes (all words opaque, no offset), up to 15s. Software GL can stall GSAP.
    await page.waitForFunction(() => [...document.querySelectorAll('.split-word')].every(w => getComputedStyle(w).opacity === '1' && /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/.test(getComputedStyle(w).transform)), null, { timeout: 15000 }).catch(() => console.log(w, h, 'slide', i+1, 'WARN heading still animating'))
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${out}/${w}x${h}-slide${i+1}.png` })
    const clip = await page.evaluate(() => { const s=document.querySelector('section'); return s ? s.scrollHeight - s.clientHeight : -1 })
    console.log(w, h, 'slide', i+1, 'overflowPx', clip)
    await page.keyboard.press('ArrowRight')
  }
  if (w===1280) { await page.keyboard.press('n'); await page.waitForTimeout(500); await page.screenshot({ path: `${out}/${w}x${h}-notes.png` }) }
  console.log(w, 'errors:', errs, 'external requests:', reqs)
  await page.close()
}
await browser.close()

