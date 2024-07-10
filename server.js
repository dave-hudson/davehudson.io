import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import { existsSync, statSync } from 'fs';
const app = express();

// Calculate __dirname based on the current file location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use strict routing.
app.set('strict routing', true);

// Redirect foo/ to foo.
app.use((req, res, next) => {
    if (req.path.endsWith('/') && req.path.length > 1) {
        const newPath = req.path.slice(0, -1);
        res.redirect(301, newPath + req.url.slice(req.path.length));
        return;
    }

    // Does our path exist?
    const tryPath = path.join(__dirname, 'build', req.path);
    if (existsSync(tryPath)) {
        const stats = statSync(tryPath);

        // If the path is a file then serve it.
        if (!stats.isDirectory()) {
            res.setHeader('Cache-Control', 'public, max-age=10');
            res.sendFile(tryPath);
            return;
        }

        // If the path is a directory then see if there's a pre-rendered version of the page that we can serve instead.
	const tryPathIndex = path.join(tryPath, 'index.html');
        if (existsSync(tryPathIndex)) {
            res.setHeader('Cache-Control', 'public, max-age=10');
            res.sendFile(tryPathIndex);
            return;
        }
    }

    // If the file does not exist, move to the next middleware/route handler
    next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'build'), {
    index: 'index.html',
    setHeaders: function (res, path) {
        res.setHeader('Cache-Control', 'public, max-age=10');
    },
    redirect: false
}));

// Handle every other route with spa.html
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, 'build/spa.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
