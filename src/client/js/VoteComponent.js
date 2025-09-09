// VoteComponent for iXat Chat Interface
// Handles voting functionality

class VoteComponent {
    constructor() {
        this.votes = new Map();
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('🗳️ [VOTE] Initializing Vote Component...');
        
        try {
            this.setupEventListeners();
            this.isInitialized = true;
            console.log('✅ [VOTE] Vote Component initialized successfully');
        } catch (error) {
            console.error('❌ [VOTE] Failed to initialize:', error);
        }
    }

    setupEventListeners() {
        // Add vote event listeners here
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('vote-btn')) {
                this.handleVote(e.target);
            }
        });
    }

    handleVote(button) {
        const voteId = button.dataset.voteId;
        const voteType = button.dataset.voteType;
        
        if (!voteId || !voteType) return;
        
        console.log(`🗳️ [VOTE] User voted ${voteType} on ${voteId}`);
        
        // Update vote count
        this.updateVoteCount(voteId, voteType);
        
        // Visual feedback
        button.classList.add('voted');
        setTimeout(() => {
            button.classList.remove('voted');
        }, 1000);
    }

    updateVoteCount(voteId, voteType) {
        if (!this.votes.has(voteId)) {
            this.votes.set(voteId, { up: 0, down: 0 });
        }
        
        const vote = this.votes.get(voteId);
        vote[voteType]++;
        
        // Update UI
        const upButton = document.querySelector(`[data-vote-id="${voteId}"][data-vote-type="up"]`);
        const downButton = document.querySelector(`[data-vote-id="${voteId}"][data-vote-type="down"]`);
        
        if (upButton) {
            upButton.textContent = `👍 ${vote.up}`;
        }
        if (downButton) {
            downButton.textContent = `👎 ${vote.down}`;
        }
    }

    getVoteCount(voteId) {
        return this.votes.get(voteId) || { up: 0, down: 0 };
    }

    resetVotes(voteId) {
        if (voteId) {
            this.votes.delete(voteId);
        } else {
            this.votes.clear();
        }
    }

    loadVoteData() {
        console.log('🗳️ [VOTE] Loading vote data...');
        // This method is called by quickbar.js
        // For now, just return a promise that resolves
        return Promise.resolve();
    }
}

// Create global instance
window.VoteComponent = VoteComponent;
