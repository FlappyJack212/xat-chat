export function createAudioPlayer(url) {
  const audio = document.createElement('audio');
  audio.src = url;
  audio.controls = true;
  audio.autoplay = true;
  audio.className = 'w-full';
  return audio;
}

export function createVideoPlayer(url) {
  const video = document.createElement('video');
  video.src = url;
  video.controls = true;
  video.autoplay = true;
  video.className = 'w-full max-h-64';
  return video;
}
