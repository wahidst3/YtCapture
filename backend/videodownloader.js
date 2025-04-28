const express = require('express');
const fs = require('fs');
const ytdl = require("@distube/ytdl-core");
const app = express();
const PORT = 3000;
const path = require('path');
const cors = require('cors');
var ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);



app.use(cors());


app.use(express.json());
app.use('/videos', express.static(path.join(__dirname, 'videos')));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.post('/transcribe', (req, res) => {
   let url = req.body.link;
   const audioStream = ytdl(youtubeURL, { filter: 'audioonly' });
   async function getVideoTitle() {
    try {
      const info = await ytdl.getInfo(url);
      const videoTitle = info.videoDetails.title.slice(0, 20).replace(/[\/\\?%*:|"<>]/g, '-')

      const videoStream = ytdl(url, { 
        quality: 'lowest', 
        filter: format => format.hasAudio && format.hasVideo 
    });
    
      const savePath = path.join(__dirname, 'videos', `${videoTitle}.mp4`);

      const writeStream = fs.createWriteStream(savePath);
      videoStream.pipe(writeStream);

writeStream.on('finish', () => {
        console.log('Download finished!');
        res.send( `${videoTitle}.mp4`);
        
      });

    } catch (error) {
      console.error('Error fetching video info:', error);
    }
  }
  
  getVideoTitle();


});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
