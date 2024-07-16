import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { parseStringPromise } from 'xml2js';

// Get the current module path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to your sitemap.xml file
const sitemapPath = path.join(__dirname, 'sitemap.xml');
const outputDir = path.join(__dirname, 'prerendered');
const localBaseUrl = 'http://localhost:3000';

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

    for (const url of urls) {
        // Replace the base URL with the local base URL
        const localUrl = url.replace(/^https?:\/\/[^\/]+/, localBaseUrl);

        const page = await browser.newPage();
        await page.goto(localUrl, { waitUntil: 'networkidle0' });

        // Get the content of the page
        const html = await page.content();

        // Generate the file path based on the original URL path
        const urlPath = new URL(url).pathname;
        const filePath = path.join(outputDir, urlPath, 'index.html');

        // Ensure the directory exists
        ensureDirectoryExistence(filePath);

        // Save the HTML content to the file
        fs.writeFileSync(filePath, html);

        // Close the page to free up resources
        await page.close();
    }

    // Close the browser
    await browser.close();
})();
