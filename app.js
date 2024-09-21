// app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
    res.status(200).send('bom gay');
});

app.get('/about', (req, res) => {
    res.send('about gay')
});

// Export the app for testing
module.exports = app;

// Start the server only if the module is the main module
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}
