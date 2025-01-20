const app = require('./app');

const PORT = 3000;

/**
 * Starts the server on the specified port.
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
