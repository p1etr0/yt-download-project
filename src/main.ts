import express from 'express';
import fs from 'fs';
import path from 'path';

const { dlAudio } = require("youtube-exec");

const app = express();
app.use(express.json());
const port = 3000;

// Define a route for /download
app.post('/download', async (req, res) => {
  const {url} = req.body;

  const name = url.split('v=')[1];
  const filename = name.split('&')[0];

  try {
    const teste = await dlAudio({
      url,
      filename,
      quality: "best",
    });
    console.log(teste)
    console.log("Audio downloaded successfully! 🔊🎉");
  } catch (err: any) {
    console.error("An error occurred:", err.message);
  }
  
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
