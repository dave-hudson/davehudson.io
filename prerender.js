#!/usr/bin/env node

import puppeteer from 'puppeteer';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import path from 'path';
import os from 'os';

const parser = new XMLParser();

/**
 * Fetches the sitemap content from a URL.
 * @param {string} url - The URL of the sitemap.
 * @returns {Promise<string>} - The sitemap content.
 */
async function fetchSitemap(url) {
    try {
        const response = await axios.get(url, { maxRedirects: 10 });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch sitemap: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Parses the sitemap XML content.
 * @param {string} xml - The XML content of the sitemap.
 * @returns {Object} - The parsed sitemap object.
 */
function parseSitemap(xml) {
    return parser.parse(xml);
}

/**
 * Replaces URLs based on the provided replace rule.
 * @param {string[]} urls - The list of URLs.
 * @param {string} replaceRule - The replace rule in the form "new=old".
 * @returns {string[]} - The list of updated URLs.
 */
function replaceUrl(urls, replaceRule) {
    const [newPrefix, oldPrefix] = replaceRule.split('=');
    return urls.map(url => url.replace(oldPrefix, newPrefix));
}

/**
 * Constructs the file path for the rendered page.
 * @param {string} url - The URL of the page.
 * @param {string} outputDir - The output directory.
 * @returns {string} - The file path for the rendered page.
 */
function getFilePath(url, outputDir) {
    const urlObj = new URL(url);
    let filePath = path.join(outputDir, urlObj.pathname);

    if (!urlObj.pathname.endsWith('/') && !urlObj.pathname.endsWith('.html')) {
        filePath = path.join(filePath, 'index.html');
    } else if (urlObj.pathname.endsWith('/')) {
        filePath = path.join(filePath, 'index.html');
    } else {
        filePath += '.html';
    }

    return filePath;
}

/**
 * Saves the rendered page content to a file.
 * @param {string} filePath - The file path to save the content.
 * @param {string} content - The rendered page content.
 */
async function saveRenderedPage(filePath, content) {
    try {
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.writeFile(filePath, content);
    } catch (error) {
        console.error(`Failed to save rendered page: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Renders a page using Puppeteer.
 * @param {object} browser - The Puppeteer browser instance.
 * @param {string} url - The URL of the page to render.
 * @param {number} retries - The number of retries for rendering.
 * @returns {Promise<string>} - The rendered page content.
 */
async function renderPage(browser, url, retries) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        let page;
        try {
            page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });
            const content = await page.content();
            return content;
        } catch (error) {
            console.error(`Failed to render ${url} (attempt ${attempt + 1}): ${error.message}`);
            if (attempt < retries) {
                const delay = Math.floor(Math.random() * 8000) + 1;
                await new Promise(res => setTimeout(res, delay)); // Wait before retrying
            } else {
                throw error;
            }
        } finally {
            if (page) {
                await page.close();
            }
        }
    }
}

/**
 * Processes the URLs from the sitemap.
 * @param {string[]} urls - The list of URLs.
 * @param {object} browser - The Puppeteer browser instance.
 * @param {string} outputDir - The output directory.
 * @param {number} retries - The number of retries for rendering.
 * @param {number} parallelRenders - The number of parallel renders.
 */
async function processSitemapUrls(urls, browser, outputDir, retries, parallelRenders) {
    const queue = urls.slice();
    const workers = new Array(parallelRenders).fill(null).map(async () => {
        while (queue.length) {
            const url = queue.shift();
            if (!url) continue;
            const filePath = getFilePath(url, outputDir);
            try {
                await fs.promises.rm(filePath, { force: true });
            } catch (error) {
                console.error(`Failed to delete old file ${filePath}: ${error.message}`);
                continue; // Skip rendering if we can't clean up the old file
            }
            try {
                const content = await renderPage(browser, url, retries);
                await saveRenderedPage(filePath, content);
                console.log(`Rendered: ${url}`);
            } catch (error) {
                console.error(`Failed: ${url}: ${error.message}`);
                process.exit(1);
            }
        }
    });
    await Promise.all(workers);
}

/**
 * Recursively processes sitemaps from a sitemap index.
 * @param {string} urlOrFilePath - The URL or file path of the sitemap index.
 * @returns {Promise<string[]>} - A list of URLs found in the sitemap index.
 */
async function processSitemapIndex(urlOrFilePath) {
    console.log(`Processing sitemap index: ${urlOrFilePath}`);
    let sitemapContent;
    if (urlOrFilePath.startsWith('http')) {
        sitemapContent = await fetchSitemap(urlOrFilePath);
    } else {
        sitemapContent = await fs.promises.readFile(urlOrFilePath, 'utf-8');
    }
    const parsedSitemap = parseSitemap(sitemapContent);
    let urls = [];

    if (parsedSitemap.sitemapindex && parsedSitemap.sitemapindex.sitemap) {
        for (const sitemap of parsedSitemap.sitemapindex.sitemap) {
            console.log(`Processing nested sitemap: ${sitemap.loc}`);
            const nestedUrls = await processSitemapIndex(sitemap.loc);
            urls = urls.concat(nestedUrls);
        }
    } else if (parsedSitemap.urlset && parsedSitemap.urlset.url) {
        const urlEntries = Array.isArray(parsedSitemap.urlset.url)
            ? parsedSitemap.urlset.url
            : [parsedSitemap.urlset.url];
        urls = urlEntries.map(entry => entry.loc);
    }

    return urls;
}

/**
 * Launches the Puppeteer browser with retry logic.
 * @param {number} retries - The number of retries for launching the browser.
 * @returns {Promise<object>} - The Puppeteer browser instance.
 */
async function launchBrowserWithRetries(retries) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await puppeteer.launch();
        } catch (error) {
            console.error(`Failed to launch browser (attempt ${attempt + 1}): ${error.message}`);
            if (attempt < retries) {
                const delay = Math.floor(Math.random() * 8000) + 1;
                await new Promise(res => setTimeout(res, delay)); // Wait before retrying
            } else {
                throw error;
            }
        }
    }
}

/**
 * Closes the Puppeteer browser with retry logic.
 * @param {object} browser - The Puppeteer browser instance.
 * @param {number} retries - The number of retries for closing the browser.
 */
async function closeBrowserWithRetries(browser, retries) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            await browser.close();
            return;
        } catch (error) {
            console.error(`Failed to close browser (attempt ${attempt + 1}): ${error.message}`);
            if (attempt < retries) {
                const delay = Math.floor(Math.random() * 8000) + 1;
                await new Promise(res => setTimeout(res, delay)); // Wait before retrying
            } else {
                throw error;
            }
        }
    }
}

async function main() {
    const argv = yargs(hideBin(process.argv))
        .option('sitemap-file', {
            describe: 'Path to the sitemap file',
            type: 'string',
            conflicts: 'sitemap-url'
        })
        .option('sitemap-url', {
            describe: 'URL of the sitemap file',
            type: 'string',
            conflicts: 'sitemap-file'
        })
        .option('replace-url', {
            describe: 'Replace URL prefix in the form "new=old"',
            type: 'string'
        })
        .option('output', {
            describe: 'Output directory',
            type: 'string',
            demandOption: true
        })
        .option('parallel-renders', {
            describe: 'Number of parallel renders',
            type: 'number',
            default: os.cpus().length
        })
        .option('max-retries', {
            describe: 'Max retries for rendering a page',
            type: 'number',
            default: 3
        })
        .help('h')
        .alias('h', 'help')
        .argv;

    let urls = [];
    if (argv['sitemap-file']) {
        urls = await processSitemapIndex(argv['sitemap-file']);
    } else if (argv['sitemap-url']) {
        urls = await processSitemapIndex(argv['sitemap-url']);
    } else {
        console.error('Either --sitemap-file or --sitemap-url must be provided.');
        process.exit(1);
    }

    if (argv['replace-url']) {
        urls = replaceUrl(urls, argv['replace-url']);
    }

    const browser = await launchBrowserWithRetries(argv['max-retries']);
    await processSitemapUrls(urls, browser, argv.output, argv['max-retries'], argv['parallel-renders']);
    await closeBrowserWithRetries(browser, argv['max-retries']);
    console.log('All pages rendered successfully.');
    process.exit(0);
}

main();
