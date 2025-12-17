# ElevenLabs TTS Server

Minimal Node.js server to generate text-to-speech via ElevenLabs API and download audio.

## Setup

1. Get your ElevenLabs API key.
2. Set environment variable `ELEVENLABS_API_KEY` on your hosting provider.
3. Deploy to Node.js hosting (Render, Railway, etc.)

### API Usage

POST `/tts`

JSON body:
```json
{ "text": "Hello world" }
```

Response: downloads `tts.mp3`