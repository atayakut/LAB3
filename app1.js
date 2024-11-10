const express = require('express');
const app = express();
const PORT = 3001
;

app.get('/', (req, res) => {
  res.send('<h1>Group 21: My Group</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
