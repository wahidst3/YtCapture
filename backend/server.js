
// const fs = require('fs');
// const ytdl = require('@distube/ytdl-core');
// const path = require('path');
// const cors = require('cors');
// const ffmpeg = require('fluent-ffmpeg');
// const ffmpegPath = require('ffmpeg-static');
// const axios = require('axios');
// const FormData = require('form-data');
// ffmpeg.setFfmpegPath(ffmpegPath);

// const app = express();
// const PORT = 3000;

// // Increase timeout for large files
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(cors());






// async function sendAudio(audi) {
//   const form = new FormData();
//   form.append('file', fs.createReadStream(audi));

//   const response = await axios.post('http://localhost:5000/transcribe', form, {
//     headers: form.getHeaders()
//   });
// return response.data;
//   console.log(response.data);
// }







// app.post('/download', async (req, res) => {
//     const url = req.body.link;
  
//     if (!url || !ytdl.validateURL(url)) {
//       return res.status(400).json({ error: 'Invalid YouTube URL' });
//     }
  
//     const outputDir = path.join(__dirname, 'downloads');
//     const processedAudioPath = path.join(outputDir, `processed-audio-${Date.now()}.wav`);
  
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir, { recursive: true });
//     }
  
//     try {
//       const audioStream = ytdl(url, {
//         quality: 'highestaudio',
//         filter: 'audioonly',
//       });
  
//       ffmpeg(audioStream)
//         .audioCodec('pcm_s16le')
//         .audioFrequency(16000)
//         .audioChannels(1)
//         .format('wav')
//         .output(processedAudioPath)
//         .on('end', () => {
//           console.log('Audio file processed successfully!');
//           const response=sendAudio(processedAudioPath);
//           console.log(response.text);
//           if(response.text!=""){
          
//             res.send(response.text);
//           }
          
//         })
//         .on('error', (err) => {
//           console.error('FFmpeg error:', err);
//           res.status(500).json({ error: 'Failed to process audio' });
//         })
//         .run();
//     } catch (error) {
//       console.error('Error during processing:', error);
//       res.status(500).json({
//         error: 'Failed to process audio',
//         details: error.message,
//       });
//     }
//   });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const path = require('path');
const cors = require('cors');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const axios = require('axios');
const FormData = require('form-data');
const PDFDocument = require('pdfkit');
const app = express();
const PORT = 3000;
let lastGeneratedPDF = null;  
let title = null; 
let duration = null; 

ffmpeg.setFfmpegPath(ffmpegPath);



app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

//audio file ko transcription ke leye python wale server me  send karne ka function
async function sendAudio(audioPath) {
  if (!fs.existsSync(audioPath)) {
    throw new Error(`Audio file not found at ${audioPath}`);
  }

  const form = new FormData();
  form.append('file', fs.createReadStream(audioPath));

  try {
    console.log('📤 Sending audio for transcription...');
    const response = await axios.post('http://localhost:5000/transcribe', form, {
      headers: form.getHeaders(),
      timeout: 300000, // 5 minute timeout
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });
    console.log(' Transcription received');
    return response.data;
  } catch (error) {
    console.error(' Transcription error:', error.message);
    if (error.response) {
      console.error('Server response:', error.response.data);
    }
    throw error;
  }
}

//yaha pr link se audio download hoga aur uska transcription ke function call hoga or phr pdf process hoga
app.post('/download', async (req, res) => {
  const url = req.body.link;

  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  const outputDir = path.join(__dirname, 'downloads');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const processedAudioPath = path.join(outputDir, `processed-audio-${Date.now()}.wav`);

  try {
    const audioStream = ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly',
      requestOptions: {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      },
    }).on('error', (err) => {
      console.error('ytdl-core error:', err);
    });
    //info
    let info= await ytdl.getInfo(url);
    title = info.videoDetails.title;
    duration = info.videoDetails.lengthSeconds;

    ffmpeg(audioStream)
      .audioCodec('pcm_s16le')
      .audioFrequency(16000)
      .audioChannels(1)
      .format('wav')
      .output(processedAudioPath)
      .on('end', async () => {
        console.log('Audio file processed successfully!');
//pdf processing ka kaam yaha hoga
        try {
          const transcription = await sendAudio(processedAudioPath);

          if (transcription.text) {
            const pdfName = `transcription-${Date.now()}.pdf`;
            const pdfPath = path.join(outputDir, pdfName);

            const pdfDoc = new PDFDocument();
            const writeStream = fs.createWriteStream(pdfPath);
            pdfDoc.pipe(writeStream);

            pdfDoc.font('Times-Roman')
              .fontSize(12)
              .text(transcription.text, {
                align: 'left',
                paragraphGap: 10,
              });

            pdfDoc.end();

            writeStream.on('finish', () => {
              console.log('PDF created successfully!');
              lastGeneratedPDF = pdfName;   
              res.json({transcription, title, duration});
            });
            

          } else {
            res.status(500).json({ error: 'Transcription failed, no text returned' });
          }
        } catch (error) {
          console.error('Error sending audio to transcription service:', error);
          res.status(500).json({ error: 'Failed to get transcription' });
        }
      })
      .on('error', (err) => {
        console.error('FFmpeg error:', err);
        res.status(500).json({ error: 'Failed to process audio' });
      })
      .run();
  } catch (error) {
    console.error('Error during processing:', error);
    res.status(500).json({
      error: 'Failed to process audio',
      details: error.message,
    });
  }
});
app.get('/download-pdf', (req, res) => {
  if (!lastGeneratedPDF) {
    return res.status(404).json({ error: 'No PDF available for download' });
  }

  const pdfPath = path.join(__dirname, 'downloads', lastGeneratedPDF);
  res.download(pdfPath, (err) => {
    if (err) {
      console.error('Error downloading the PDF:', err);
      res.status(500).json({ error: 'Failed to download PDF' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at: http://localhost:${PORT}`);
});
