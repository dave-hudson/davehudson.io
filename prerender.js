import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

// Define the path to your sitemap.xml file
const sitemapPath = './build/sitemap.xml';
const outputDir = './prerendered';

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
        console.log(`Processing URL: ${url}`)
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Get the content of the page
        const html = await page.content();

        // Determine the file name based on the URL
        const fileName = url === 'https://davehudson.io' ? 'index.html' : `${url.split('/').pop() || 'index'}.html`;
        const filePath = path.join(outputDir, fileName);

        // Save the HTML content to the file
        fs.writeFileSync(filePath, html);

        // Close the page to free up resources
        await page.close();
    }

    // Close the browser
    await browser.close();
})();

