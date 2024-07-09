import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

// Define the path to your sitemap.xml file
const sitemapPath = './build/sitemap.xml';
const outputDir = './build';
const localBaseUrl = 'http://localhost:3000';

/**
 * Utility function to create directories recursively
 */
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

    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    for (const url of urls) {
        const urlPath = new URL(url).pathname;
        const localURL = url.replace(/^https?:\/\/[^\/]+/, localBaseUrl);

        console.log(`Processing URL: ${localURL}`)
        const page = await browser.newPage();
        await page.goto(localURL, { waitUntil: 'networkidle0' });

        // Get the content of the page
        const html = await page.content();

        // Write the content to an appropriate pre-rendered file.
        const filePath = path.join(outputDir, urlPath, 'index.html');
        ensureDirectoryExistence(filePath);
        fs.writeFileSync(filePath, html);
        await page.close();
    }

    // Close the browser
    await browser.close();
})();
