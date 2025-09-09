// Audio Management Module
class AudioManager {
    constructor() {
        this.audioPanelOpen = false;
        this.radioPlaying = false;
        this.youtubePlayer = null;
        this.audioSettings = {
            chatVolume: 50,
            radioVolume: 0,
            kissVolume: 0,
            youtubeVolume: 0,
            chatEnabled: true,
            radioEnabled: false,
            kissEnabled: false,
            youtubeEnabled: false
        };
        this.init();
    }

    init() {
        this.loadAudioSettings();
        this.initializeAudioControls();
    }

    toggleAudioPanel() {
        const audioPanel = document.getElementById('audioPanel');
        this.audioPanelOpen = !this.audioPanelOpen;
        audioPanel.classList.toggle('show', this.audioPanelOpen);
        
        if (this.audioPanelOpen) {
            this.initializeAudioControls();
            this.loadAudioSettings();
        }
    }

    loadAudioSettings() {
        const saved = localStorage.getItem('audioSettings');
        if (saved) {
            this.audioSettings = { ...this.audioSettings, ...JSON.parse(saved) };
        }
        
        // Apply settings to UI
        const chatVolume = document.getElementById('chatVolume');
        const radioVolume = document.getElementById('radioVolume');
        const youtubeVolume = document.getElementById('youtubeVolume');
        
        if (chatVolume) chatVolume.value = this.audioSettings.chatVolume;
        if (radioVolume) radioVolume.value = this.audioSettings.radioVolume;
        if (youtubeVolume) youtubeVolume.value = this.audioSettings.youtubeVolume;
        
        this.updateAudioDisplay();
    }

    saveAudioSettings() {
        localStorage.setItem('audioSettings', JSON.stringify(this.audioSettings));
    }

    updateAudioDisplay() {
        const chatVolumeValue = document.getElementById('chatVolumeValue');
        const radioVolumeValue = document.getElementById('radioVolumeValue');
        const youtubeVolumeValue = document.getElementById('youtubeVolumeValue');
        
        if (chatVolumeValue) chatVolumeValue.textContent = this.audioSettings.chatVolume + '%';
        if (radioVolumeValue) radioVolumeValue.textContent = this.audioSettings.radioVolume + '%';
        if (youtubeVolumeValue) youtubeVolumeValue.textContent = this.audioSettings.youtubeVolume + '%';
    }

    initializeAudioControls() {
        // Chat volume control
        const chatVolume = document.getElementById('chatVolume');
        const chatVolumeValue = document.getElementById('chatVolumeValue');
        
        if (chatVolume && chatVolumeValue) {
            chatVolume.addEventListener('input', (e) => {
                this.audioSettings.chatVolume = parseInt(e.target.value);
                chatVolumeValue.textContent = e.target.value + '%';
                this.saveAudioSettings();
            });
        }

        // Radio volume control
        const radioVolume = document.getElementById('radioVolume');
        const radioVolumeValue = document.getElementById('radioVolumeValue');
        
        if (radioVolume && radioVolumeValue) {
            radioVolume.addEventListener('input', (e) => {
                this.audioSettings.radioVolume = parseInt(e.target.value);
                radioVolumeValue.textContent = e.target.value + '%';
                this.saveAudioSettings();
            });
        }

        // YouTube volume control
        const youtubeVolume = document.getElementById('youtubeVolume');
        const youtubeVolumeValue = document.getElementById('youtubeVolumeValue');
        
        if (youtubeVolume && youtubeVolumeValue) {
            youtubeVolume.addEventListener('input', (e) => {
                this.audioSettings.youtubeVolume = parseInt(e.target.value);
                youtubeVolumeValue.textContent = e.target.value + '%';
                this.saveAudioSettings();
            });
        }
    }

    toggleRadio() {
        const radioToggle = document.getElementById('radioToggle');
        this.radioPlaying = !this.radioPlaying;
        
        if (this.radioPlaying) {
            radioToggle.textContent = '⏸️ Stop Radio';
            // Start radio logic here
            console.log('Radio started');
        } else {
            radioToggle.textContent = '▶️ Start Radio';
            // Stop radio logic here
            console.log('Radio stopped');
        }
    }

    playYouTube() {
        const youtubeUrl = document.getElementById('youtubeUrl');
        if (!youtubeUrl) return;
        
        const url = youtubeUrl.value;
        if (url) {
            const videoId = this.extractYouTubeVideoId(url);
            if (videoId) {
                // YouTube player logic here
                console.log('Playing YouTube video:', videoId);
            } else {
                alert('Invalid YouTube URL');
            }
        }
    }

    extractYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }
}

// Initialize audio manager
const audioManager = new AudioManager();
