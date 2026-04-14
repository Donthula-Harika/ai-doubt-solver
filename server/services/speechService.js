// const { AssemblyAI } = require('assemblyai');

// const client = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY });

// const transcribeAudio = async (audioFilePath) => {
//   try {
//     const transcript = await client.transcripts.transcribe({
//       audio: audioFilePath,
//       language_detection: true,
//       punctuate: true,
//       format_text: true,
//     });

//     if (transcript.status === 'error') {
//       throw new Error(`Transcription failed: ${transcript.error}`);
//     }

//     if (!transcript.text || transcript.text.trim() === '') {
//       throw new Error('No speech detected in the audio. Please speak clearly and try again.');
//     }

//     return transcript.text;
//   } catch (error) {
//     if (error.message.includes('No speech detected')) throw error;
//     throw new Error(`Speech-to-text failed: ${error.message}`);
//   }
// };

// // const isSpeechServiceAvailable = () => {
// //   return !!(process.env.ASSEMBLYAI_API_KEY && process.env.ASSEMBLYAI_API_KEY !== 'your_assemblyai_api_key_here');
// // };

// const isSpeechServiceAvailable = () => {
//   return !!process.env.ASSEMBLYAI_API_KEY;
// };

// module.exports = { transcribeAudio, isSpeechServiceAvailable };


const { AssemblyAI } = require('assemblyai');
const path = require('path');

const client = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY });

const transcribeAudio = async (audioFilePath) => {
  try {
    const audioFilename = path.basename(audioFilePath);
    const publicAudioUrl = `http://localhost:5000/uploads/audio/${audioFilename}`;

    console.log('🎙️ URL:', publicAudioUrl);

    // 1. Submit transcription job
    const transcript = await client.transcripts.transcribe({
      audio: publicAudioUrl,
      speech_models: ['universal-3-pro'],
      language_detection: true,
      punctuate: true,
      format_text: true,
    });

    console.log('📤 Job ID:', transcript.id);

    // 2. POLL until completed (new SDK method)
    let status = transcript.status;
    while (status !== 'completed' && status !== 'error') {
      // Wait 2 seconds between polls
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fetch latest status
      const updatedTranscript = await client.transcripts.getTranscript(transcript.id);
      status = updatedTranscript.status;
      console.log('⏳ Status:', status);
    }

    // 3. Check for errors
    if (status === 'error') {
      throw new Error(`AssemblyAI Error: ${JSON.stringify(transcript.error)}`);
    }

    // 4. Return text
    if (!transcript.text?.trim()) {
      throw new Error('No speech detected');
    }

    console.log('✅ SUCCESS:', `"${transcript.text.substring(0, 80)}..."`);
    return transcript.text;
  } catch (error) {
    console.error('❌ FULL ERROR:', error.message);
    throw new Error(`Speech-to-text failed: ${error.message}`);
  }
};

const isSpeechServiceAvailable = () => {
  return !!process.env.ASSEMBLYAI_API_KEY;
};

module.exports = { transcribeAudio, isSpeechServiceAvailable };