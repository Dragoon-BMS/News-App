const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 8080;

// Serve static files from the current directory
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname) });
});

app.get('/api', async (req, res) => {
  console.log(req._parsedUrl.query);
  let url = "https://newsapi.org/v2/everything?" + req._parsedUrl.query;
  try {
    let r = await axios(url);
    let a = r.data;
    res.json(a);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
