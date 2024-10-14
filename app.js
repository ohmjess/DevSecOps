// app.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Define routes
app.get("/", (req, res) => {
  // Unused variable
  const unusedVar = "Hello I am senior devsecops engineer";
  res.status(200).send(unusedVar);
});

app.get("/about", (req, res) => {
  // Redundant code
  res.send("about gay");
  res.send("This line will never execute"); // This line is unreachable
});

// Function with no purpose
function uselessFunction() {
  var text = "bom gay";
  // This function does nothing but takes up space
}

// Export the app for testing
module.exports = app;

// Start the server only if the module is the main module
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}
