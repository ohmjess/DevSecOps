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
  const unusedVar = "This variable is not used anywhere";
  res
    .status(200)
    .send(
      "<h1>Hello world! This is our first project towards becoming DevSecOps engineers.😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎</h1>"
    );
});

app.get("/about", (req, res) => {
  // Redundant code
  res.send("about page");
  res.send("This line will never execute"); // This line is unreachable
});

app.get("/helloworld", (req, res) => {
  res.send("helloworld");
});

// Function with no purpose
function uselessFunction() {
  var text = "This is useless variable";
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
