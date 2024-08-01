import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {parseStringPromise} from 'xml2js';

// Get the current module path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to your sitemap.xml file
const sitemapPath = path.join(__dirname, 'sitemap.xml');
const outputDir = path.join(__dirname, 'prerendered');
const localBaseUrl = 'http://localhost:3000';
const maxConcurrentRenders = 4;

// Utility function to create directories recursively
const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
};

(async () => {
    // Read and parse the sitemap.xml file
    const sitemapData = fs.readFileSync(sitemapPath, 'utf8');
    const sitemap = await parseStringPromise(sitemapData);

    // Extract URLs from the sitemap
    const urls = sitemap.urlset.url.map(entry => entry.loc[0]);

    // Launch Puppeteer
    const browser = await puppeteer.launch();

    // Helper function to render a single page
    const renderPage = async (url) => {
        const localUrl = url.replace(/^https?:\/\/[^\/]+/, localBaseUrl);
        const page = await browser.newPage();
        await page.goto(localUrl, {waitUntil: 'networkidle0'});
        const html = await page.content();
        const urlPath = new URL(url).pathname;
        const filePath = path.join(outputDir, urlPath, 'index.html');
        ensureDirectoryExistence(filePath);
        fs.writeFileSync(filePath, html);
        await page.close();
    };

    // Process URLs in batches of maxConcurrentRenders
    for (let i = 0; i < urls.length; i += maxConcurrentRenders) {
        const batch = urls.slice(i, i + maxConcurrentRenders).map(url => renderPage(url));
        await Promise.all(batch);
    }

    // Close the browser
    await browser.close();
})();
