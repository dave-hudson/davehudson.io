import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
const app = express();

// Calculate __dirname based on the current file location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'build'), {
    index: 'index.html',
    setHeaders: function (res, path) {
        res.setHeader('Cache-Control', 'public, max-age=10');
    }
}));

// Handle every other route with spa.html
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, 'build/spa.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
