import express from 'express';
import fs from 'fs';

const ytdl = require('ytdl-core');

const app = express();
app.use(express.json());
const port = 3000;


// Opções para a qualidade do áudio (aqui, estamos usando a melhor qualidade)
const audioOptions = {
  quality: 'highestaudio',
};

// Função para baixar e salvar o áudio
const downloadAudio = async (videoURL: any) => {
  try {
    const info = await ytdl.getInfo(videoURL);
    const audioFormat = ytdl.chooseFormat(info.formats, audioOptions);

    if (audioFormat) {
      const audioStream = ytdl.downloadFromInfo(info, audioOptions);
      const audioFileName = `${info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`;

      audioStream.pipe(fs.createWriteStream(audioFileName));

      audioStream.on('end', () => {
        console.log(`Áudio baixado e salvo como ${audioFileName}`);
      });
    } else {
      console.error('Não foi possível encontrar um formato de áudio adequado.');
    }
  } catch (error) {
    console.error('Ocorreu um erro ao baixar o áudio:', error);
  }
};

// Define a route for /download
app.post('/download', async (req, res) => {
  const {url} = req.body;

  await downloadAudio(url);

  return res.json({message: 'ok'});
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
