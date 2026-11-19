import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200 || res.statusCode === 304) resolve(true);
        else setTimeout(check, 300);
      }).on('error', () => {
        if (Date.now() - start > timeoutMs) reject(new Error('Server start timeout'));
        else setTimeout(check, 300);
      });
    };
    check();
  });
}

async function runAudit() {
  console.log('=== STARTING AUTOMATED TERMINAL & BROWSER DEVTOOLS AUDIT ===\n');

  console.log(`[1] Starting Vite Preview Server on port ${PORT}...`);
  const server = spawn('npx', ['vite', 'preview', '--port', PORT.toString(), '--strictPort'], {
    shell: true,
    stdio: 'pipe'
  });

  server.stdout.on('data', (d) => process.stdout.write('[server] ' + d.toString()));
  server.stderr.on('data', (d) => process.stderr.write('[server error] ' + d.toString()));

  const auditReport = {
    consoleErrors: [],
    consoleWarnings: [],
    networkErrors: [],
    layoutOverflows: [],
    headingViolations: [],
    a11yIssues: [],
    seoIssues: [],
    uxFunctionalIssues: []
  };

  let browser;
  try {
    await waitForServer(BASE_URL);
    console.log(`\n[2] Vite Preview Server is UP and responding at ${BASE_URL}\n`);

    console.log('[3] Launching Chrome in Headless mode with DevTools Protocol enabled...');
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        auditReport.consoleErrors.push(text);
        console.log(`  ❌ Console Error: ${text}`);
      } else if (msg.type() === 'warn') {
        auditReport.consoleWarnings.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      auditReport.consoleErrors.push(`Uncaught Exception: ${err.message}`);
      console.log(`  ❌ Uncaught Exception: ${err.message}`);
    });

    page.on('requestfailed', (req) => {
      auditReport.networkErrors.push(`${req.url()} (${req.failure()?.errorText})`);
      console.log(`  ❌ Network Failure: ${req.url()} - ${req.failure()?.errorText}`);
    });

    // --- TEST 1: HOME PAGE AUDIT (/) ---
    console.log('\n--- AUDITING HOME PAGE (/) ---');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

    // Test Horizontal Overflow
    const homeOverflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    });
    console.log(`  Home Layout: scrollWidth=${homeOverflow.scrollWidth}, clientWidth=${homeOverflow.clientWidth}`);
    if (homeOverflow.hasOverflow) {
      const diff = homeOverflow.scrollWidth - homeOverflow.clientWidth;
      auditReport.layoutOverflows.push(`Home page has horizontal overflow of ${diff}px (scrollWidth > clientWidth)`);
      console.log(`  ❌ Layout Overflow: Home page overflows by ${diff}px!`);
    }

    // Test Headings
    const headingsHome = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
        tag: h.tagName.toLowerCase(),
        level: parseInt(h.tagName.toLowerCase().replace('h', '')),
        text: h.textContent.trim().substring(0, 40)
      }));
    });
    console.log('  Headings found:', headingsHome.map(h => `${h.tag} ("${h.text}")`).join(', '));
    for (let i = 0; i < headingsHome.length - 1; i++) {
      if (headingsHome[i + 1].level > headingsHome[i].level + 1) {
        const err = `Heading level skip on Home: ${headingsHome[i].tag} -> ${headingsHome[i + 1].tag} ("${headingsHome[i + 1].text}")`;
        auditReport.headingViolations.push(err);
        console.log(`  ❌ Heading Skip: ${err}`);
      }
    }

    // --- TEST 2: WORK / PORTFOLIO PAGE AUDIT (/work) ---
    console.log('\n--- AUDITING WORK PAGE (/work) ---');
    await page.goto(`${BASE_URL}/work`, { waitUntil: 'networkidle0' });

    const filterTabsCount = await page.$$eval('[role="tablist"], [data-state], button.filter-pill', els => els.length);
    console.log(`  Filter tabs detected: ${filterTabsCount}`);
    if (filterTabsCount === 0) {
      auditReport.uxFunctionalIssues.push('Work page lacks category filtering controls despite README documenting a filterable portfolio grid.');
      console.log('  ❌ Missing Feature / Docs Discrepancy: Work page has no category filter tabs!');
    }

    // Check project cards accessibility
    const cardAccessibleNames = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.project-card'));
      return cards.map(c => ({
        text: c.textContent.trim(),
        ariaLabel: c.getAttribute('aria-label')
      }));
    });
    console.log(`  Found ${cardAccessibleNames.length} project cards on /work`);

    // --- TEST 3: PROJECT DETAIL PAGE (/work/ladestack) ---
    console.log('\n--- AUDITING PROJECT DETAIL PAGE (/work/ladestack) ---');
    await page.goto(`${BASE_URL}/work/ladestack`, { waitUntil: 'networkidle0' });

    // Check for duplicate images or undefined images
    const projectDetailImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img')).map(i => i.src);
      return {
        total: imgs.length,
        hasUndefined: imgs.some(src => src.includes('undefined')),
        duplicates: imgs.filter((item, index) => imgs.indexOf(item) !== index)
      };
    });
    console.log(`  Project detail images: total=${projectDetailImages.total}, duplicates=${projectDetailImages.duplicates.length}`);
    if (projectDetailImages.hasUndefined) {
      auditReport.uxFunctionalIssues.push('ProjectDetail renders images with "undefined" src attribute.');
      console.log('  ❌ Bug: ProjectDetail contains images with undefined src!');
    }
    if (projectDetailImages.duplicates.length > 0) {
      auditReport.uxFunctionalIssues.push(`ProjectDetail renders identical images multiple times (${projectDetailImages.duplicates.length} duplicate instances).`);
      console.log(`  ⚠️ Repetition: ProjectDetail renders duplicate images across different showcases.`);
    }

    // --- TEST 4: CONTACT PAGE & ESTIMATOR (/contact) ---
    console.log('\n--- AUDITING CONTACT PAGE & INVESTMENT ESTIMATOR (/contact) ---');
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle0' });

    // Check if estimator radio buttons are accessible
    const estimatorA11y = await page.evaluate(() => {
      const radioGroups = document.querySelectorAll('[role="radiogroup"]');
      const radioItems = document.querySelectorAll('[role="radio"]');
      return {
        groupsCount: radioGroups.length,
        itemsCount: radioItems.length
      };
    });
    console.log(`  Estimator ARIA elements: ${estimatorA11y.groupsCount} radiogroups, ${estimatorA11y.itemsCount} radio items`);
    if (estimatorA11y.groupsCount < 4) {
      auditReport.a11yIssues.push(`InvestmentEstimator does not use standard radio group ARIA roles (found ${estimatorA11y.groupsCount}/4 radiogroups).`);
      console.log(`  ❌ A11y Issue: Estimator lacks full ARIA radio group semantics.`);
    }

    // Test form submission behavior
    console.log('  Testing Contact form submit with valid test input...');
    await page.type('input[name="name"]', 'Audit Bot');
    await page.type('input[name="email"]', 'audit@example.com');
    await page.type('textarea[name="message"]', 'This is an automated audit message to test form dispatch.');
    
    // Submit form
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 2000));

    // Check toast
    const toastPresent = await page.evaluate(() => {
      return document.body.textContent.includes('Message sent');
    });
    console.log(`  Form submission feedback toast appeared: ${toastPresent}`);
    auditReport.uxFunctionalIssues.push('Contact form uses client-side mock setTimeout without actually submitting data to any backend or email webhook.');

    // --- TEST 5: MOBILE MENU AUDIT (375x667) ---
    console.log('\n--- AUDITING MOBILE VIEWPORT & NAVIGATION (375x667) ---');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

    const mobileMenuBtn = await page.$('button[aria-label="Open menu"]');
    if (mobileMenuBtn) {
      const ariaExpandedInitial = await page.evaluate(el => el.getAttribute('aria-expanded'), mobileMenuBtn);
      console.log(`  Mobile Menu button aria-expanded: ${ariaExpandedInitial}`);
      if (!ariaExpandedInitial) {
        auditReport.a11yIssues.push('Mobile navigation button lacks aria-expanded attribute (WCAG 4.1.2).');
        console.log('  ❌ A11y Issue: Mobile menu button missing aria-expanded!');
      }

      await mobileMenuBtn.click();
      await new Promise(r => setTimeout(r, 300));

      // Test Escape key
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 300));
      const menuVisibleAfterEscape = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"][aria-label="Mobile navigation"]');
        return dialog && !dialog.classList.contains('pointer-events-none');
      });
      console.log(`  Menu still open after Escape key: ${menuVisibleAfterEscape}`);
      if (menuVisibleAfterEscape) {
        auditReport.a11yIssues.push('Mobile navigation modal does not close when pressing Escape key.');
        console.log('  ❌ Keyboard Nav Issue: Mobile menu ignores Escape key dismissal!');
      }
    }

    // --- TEST 6: SEO, SITEMAP & ROBOTS AUDIT ---
    console.log('\n--- AUDITING SEO, SITEMAP & ROBOTS.TXT ---');
    const robotsPath = 'public/robots.txt';
    const sitemapPath = 'public/sitemap.xml';

    if (!fs.existsSync(robotsPath)) {
      auditReport.seoIssues.push('robots.txt does not exist in public/');
      console.log('  ❌ SEO Issue: public/robots.txt is missing!');
    } else {
      const robotsTxt = fs.readFileSync(robotsPath, 'utf8');
      if (!robotsTxt.includes('Sitemap:')) {
        auditReport.seoIssues.push('robots.txt does not declare Sitemap directive.');
        console.log('  ❌ SEO Issue: robots.txt missing Sitemap link!');
      }
    }

    if (!fs.existsSync(sitemapPath)) {
      auditReport.seoIssues.push('sitemap.xml does not exist in public/');
      console.log('  ❌ SEO Issue: public/sitemap.xml is missing!');
    }

    console.log('\n=== AUDIT COMPLETE ===');
    console.log(JSON.stringify(auditReport, null, 2));

  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

runAudit().catch(err => {
  console.error('\n❌ Audit script crashed:', err);
  process.exit(1);
});
