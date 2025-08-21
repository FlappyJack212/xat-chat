// This script generates simple audio files for testing
const fs = require('fs');
const { exec } = require('child_process');

// Function to generate a simple beep sound using SoX
function generateBeep() {
  console.log('Generating beep.mp3...');
  exec('powershell -Command "Add-Type -AssemblyName System.Speech; $speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; $speak.Speak(\'beep\'); $speak.Dispose()"', (error) => {
    if (error) {
      console.error('Error generating beep sound:', error);
    } else {
      console.log('Beep sound generated successfully!');
    }
  });
}

// Function to create a simple notification sound
function createNotificationSound() {
  console.log('Creating notification.mp3...');
  
  // Create a simple HTML file with audio context
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Generate Audio</title>
  </head>
  <body>
    <script>
      // Function to download the generated audio
      function downloadAudio(buffer, filename) {
        const wav = audioBufferToWav(buffer);
        const blob = new Blob([new Uint8Array(wav)], { type: 'audio/wav' });
        
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
      }
      
      // Create audio context
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create oscillator for notification sound
      function createNotificationSound() {
        const duration = 0.5;
        const buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
          // Create a simple notification sound (ping)
          const t = i / audioContext.sampleRate;
          data[i] = Math.sin(2 * Math.PI * 880 * t) * Math.exp(-5 * t);
        }
        
        downloadAudio(buffer, 'notification.wav');
      }
      
      // Create message sound
      function createMessageSound() {
        const duration = 0.3;
        const buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
          // Create a simple message sound
          const t = i / audioContext.sampleRate;
          data[i] = Math.sin(2 * Math.PI * 440 * t) * Math.exp(-10 * t);
        }
        
        downloadAudio(buffer, 'message.wav');
      }
      
      // AudioBuffer to WAV conversion
      function audioBufferToWav(buffer) {
        const numChannels = buffer.numberOfChannels;
        const length = buffer.length * numChannels * 2;
        const sampleRate = buffer.sampleRate;
        const wav = new ArrayBuffer(44 + length);
        const view = new DataView(wav);
        
        // Write WAV header
        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + length, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * numChannels * 2, true);
        view.setUint16(32, numChannels * 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, length, true);
        
        // Write audio data
        const data = new Float32Array(buffer.length * numChannels);
        let offset = 0;
        
        for (let i = 0; i < buffer.numberOfChannels; i++) {
          data.set(buffer.getChannelData(i), offset);
          offset += buffer.length;
        }
        
        floatTo16BitPCM(view, 44, data);
        
        return wav;
      }
      
      function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      }
      
      function floatTo16BitPCM(output, offset, input) {
        for (let i = 0; i < input.length; i++, offset += 2) {
          const s = Math.max(-1, Math.min(1, input[i]));
          output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
      }
      
      // Generate sounds
      createNotificationSound();
      createMessageSound();
    </script>
  </body>
  </html>
  `;
  
  fs.writeFileSync('generate-audio.html', html);
  console.log('Created generate-audio.html. Please open this file in a browser to generate the audio files.');
}

// Create placeholder files
function createPlaceholderFiles() {
  console.log('Creating placeholder audio files...');
  
  // Create empty files
  fs.writeFileSync('sounds/beep.mp3', '');
  fs.writeFileSync('sounds/notification.mp3', '');
  fs.writeFileSync('sounds/message.mp3', '');
  
  console.log('Created placeholder files in the sounds directory.');
  console.log('Please replace these with real audio files for production use.');
}

// Run the functions
generateBeep();
createNotificationSound();
createPlaceholderFiles();

console.log('Done! Please check the sounds directory for the generated audio files.');
