/**
 * VoteComponent.js
 * A simple voting component for the chat application
 */

class VoteComponent {
    constructor(options) {
        this.options = Object.assign({
            container: null,
            onVote: null,
            maxVotes: 1,
            duration: 60000, // 1 minute in milliseconds
            theme: 'light'
        }, options);

        this.votes = {};
        this.voters = [];
        this.active = false;
        this.timeRemaining = this.options.duration;
        this.timer = null;

        this.init();
    }

    init() {
        if (!this.options.container) {
            console.error('VoteComponent: No container element provided');
            return;
        }

        this.render();
        this.attachEvents();
    }

    render() {
        const container = this.options.container;
        container.innerHTML = `
            <div class="vote-component ${this.options.theme}">
                <div class="vote-header">
                    <h3 class="vote-title">Vote</h3>
                    <div class="vote-timer">
                        <span class="vote-timer-value">00:00</span>
                    </div>
                </div>
                <div class="vote-options"></div>
                <div class="vote-footer">
                    <button class="vote-button vote-submit" disabled>Submit</button>
                    <button class="vote-button vote-cancel">Cancel</button>
                </div>
            </div>
        `;

        this.updateTimer();
    }

    attachEvents() {
        const container = this.options.container;
        const submitButton = container.querySelector('.vote-submit');
        const cancelButton = container.querySelector('.vote-cancel');

        submitButton.addEventListener('click', () => this.submitVote());
        cancelButton.addEventListener('click', () => this.cancel());
    }

    setOptions(options) {
        this.options = Object.assign({}, this.options, options);
        this.render();
    }

    start(options) {
        if (this.active) {
            this.stop();
        }

        if (options) {
            this.setOptions(options);
        }

        this.active = true;
        this.votes = {};
        this.voters = [];
        this.timeRemaining = this.options.duration;

        this.timer = setInterval(() => {
            this.timeRemaining -= 1000;
            this.updateTimer();

            if (this.timeRemaining <= 0) {
                this.stop();
                this.announceResults();
            }
        }, 1000);

        this.updateTimer();
        this.render();
    }

    stop() {
        this.active = false;
        clearInterval(this.timer);
        this.timer = null;
    }

    updateTimer() {
        if (!this.options.container) return;

        const timerElement = this.options.container.querySelector('.vote-timer-value');
        if (!timerElement) return;

        const minutes = Math.floor(this.timeRemaining / 60000);
        const seconds = Math.floor((this.timeRemaining % 60000) / 1000);

        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    addVoteOption(id, text) {
        if (!this.active) return;

        const optionsContainer = this.options.container.querySelector('.vote-options');
        const optionElement = document.createElement('div');
        optionElement.className = 'vote-option';
        optionElement.innerHTML = `
            <input type="checkbox" id="vote-option-${id}" value="${id}" class="vote-checkbox">
            <label for="vote-option-${id}">${text}</label>
            <span class="vote-count">0</span>
        `;

        optionsContainer.appendChild(optionElement);

        const checkbox = optionElement.querySelector('.vote-checkbox');
        checkbox.addEventListener('change', () => this.updateSelection());
    }

    updateSelection() {
        const checkboxes = this.options.container.querySelectorAll('.vote-checkbox');
        const submitButton = this.options.container.querySelector('.vote-submit');
        
        let selectedCount = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedCount++;
            }
        });

        submitButton.disabled = selectedCount === 0 || selectedCount > this.options.maxVotes;
    }

    submitVote() {
        if (!this.active) return;

        const checkboxes = this.options.container.querySelectorAll('.vote-checkbox');
        const selectedOptions = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedOptions.push(checkbox.value);
                
                // Update vote count
                if (!this.votes[checkbox.value]) {
                    this.votes[checkbox.value] = 0;
                }
                this.votes[checkbox.value]++;
                
                // Update UI
                const countElement = checkbox.parentElement.querySelector('.vote-count');
                countElement.textContent = this.votes[checkbox.value];
            }
        });

        if (this.options.onVote && typeof this.options.onVote === 'function') {
            this.options.onVote(selectedOptions);
        }

        // Reset selection
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        this.updateSelection();
    }

    cancel() {
        this.stop();
        if (this.options.container) {
            this.options.container.innerHTML = '';
        }
    }

    announceResults() {
        const results = Object.entries(this.votes).map(([option, count]) => {
            return { option, count };
        }).sort((a, b) => b.count - a.count);

        console.log('Vote results:', results);
        
        // You can implement custom result announcement here
    }
}

// Make it available globally
window.VoteComponent = VoteComponent;
