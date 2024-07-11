import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';
import os from 'os';

// Define the paths to the sitemap.xml file and output directory
const sitemapPath = './build/sitemap.xml';
const outputDir = './build';
const localBaseUrl = 'http://localhost:3000';

// Determine the number of CPU cores
const numCPUs = os.cpus().length;
console.log(`Number of CPU cores: ${numCPUs}`);

// Set the concurrency limit and retry limit
const maxConcurrentRenders = numCPUs * 2;
const maxRetries = 3;

// Utility function to create directories recursively
const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }

    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
};

// Utility function to delete a file if it exists
const deleteFileIfExists = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

// Function to render a single page with retries
const renderPageWithRetries = async (url, browser, retries = maxRetries) => {
    const localUrl = url.replace(/^https?:\/\/[^\/]+/, localBaseUrl);
    const urlPath = new URL(url).pathname;
    const filePath = path.join(outputDir, urlPath, 'index.html');

    // Ensure the directory exists
    ensureDirectoryExistence(filePath);

    // Delete the target file if it exists
    deleteFileIfExists(filePath);

    try {
        const page = await browser.newPage();
        await page.goto(localUrl, { waitUntil: 'networkidle0' });
        const html = await page.content();

        // Save the HTML content to the file
        fs.writeFileSync(filePath, html);
        await page.close();
        console.log(`Successfully rendered: ${localUrl}`);
    } catch (error) {
        console.error(`Error rendering ${localUrl}: ${error.message}`);
        if (retries > 0) {
            console.log(`Retrying... (${maxRetries - retries + 1}/${maxRetries})`);
            await renderPageWithRetries(url, browser, retries - 1);
        } else {
            console.error(`Failed to render ${localUrl} after ${maxRetries} retries.`);
        }
    }
};

(async () => {
    // Read and parse the sitemap.xml file
    const sitemapData = fs.readFileSync(sitemapPath, 'utf8');
    const sitemap = await parseStringPromise(sitemapData);

    // Extract URLs from the sitemap
    const urls = sitemap.urlset.url.map(entry => entry.loc[0]);

    // Launch Puppeteer
    const browser = await puppeteer.launch();

    // Function to process URLs with a limit on concurrency
    const processUrls = async (urls, limit) => {
        const activePromises = [];
        for (const url of urls) {
            const promise = renderPageWithRetries(url, browser).then(() => {
                activePromises.splice(activePromises.indexOf(promise), 1);
            });

            activePromises.push(promise);
            if (activePromises.length >= limit) {
                await Promise.race(activePromises);
            }
        }

        await Promise.all(activePromises);
    };

    // Process all URLs with the defined concurrency limit
    await processUrls(urls, maxConcurrentRenders);

    // Close the browser
    await browser.close();
})();
