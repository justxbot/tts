import express from 'express';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const elevenlabs = new ElevenLabsClient({
  apiKey: "sk_f0f7b04d01e203a16bbefbd258278b5e6c770b3e013b17ed",
});

const VOICE_ID = 'tZssYepgGaQmegsMEXjK';

app.post('/tts', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });

    const audio = await elevenlabs.textToSpeech.convert(VOICE_ID, {
      text,
      modelId: 'eleven_v3',
      outputFormat: 'mp3_44100_128',
    });

    const chunks = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const filePath = path.join(process.cwd(), 'output.mp3');
    fs.writeFileSync(filePath, buffer);

    res.download(filePath, 'tts.mp3', (err) => {
      if (err) console.error(err);
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate audio' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
