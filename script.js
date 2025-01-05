class CardGenerator {
    constructor() {
        this.generateBtn = document.getElementById('generateBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.historyList = document.getElementById('historyList');
        this.card = document.querySelector('.card');
        this.cardValue = document.querySelector('.card-value');
        this.cardSuit = document.querySelector('.card-suit');
        this.loadingAnimation = document.querySelector('.loading-animation');
        this.squidGameSound = document.getElementById('squidGameSound');
        this.blingSound = document.getElementById('blingSound');
        
        this.isGenerating = false;
        this.cardHistory = [];
        this.suits = {
            'hearts': '♥',
            'diamonds': '♦',
            'clubs': '♣',
            'spades': '♠'
        };
        this.values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        this.init();
    }
    
    init() {
        this.generateBtn.addEventListener('click', () => this.generateCard());
        this.resetBtn.addEventListener('click', () => this.resetHistory());
    }
    
    async generateCard() {
        if (this.isGenerating) return;
        this.isGenerating = true;
        
        // Reset card state
        this.card.classList.remove('flipped');
        this.loadingAnimation.classList.add('active');
        this.generateBtn.disabled = true;
        
        // Play squid game sound
        this.squidGameSound.currentTime = 0;
        this.squidGameSound.play();
        
        // Wait for 2.7 seconds
        await new Promise(resolve => setTimeout(resolve, 2700));
        
        // Stop squid game sound and play bling
        this.squidGameSound.pause();
        this.squidGameSound.currentTime = 0;
        this.blingSound.currentTime = 0;
        this.blingSound.play();
        
        // Wait for the remaining 0.3 seconds
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Generate random card
        const suit = this.getRandomSuit();
        const value = this.getRandomValue();
        
        // Update card display
        this.cardValue.textContent = value;
        this.cardSuit.textContent = this.suits[suit];
        this.cardSuit.className = 'card-suit ' + (suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black');
        
        // Add card to history
        this.addToHistory(value, suit);
        
        // Show the card
        this.loadingAnimation.classList.remove('active');
        this.card.classList.add('flipped');
        this.generateBtn.disabled = false;
        
        // Reset state
        this.isGenerating = false;
    }
    
    resetHistory() {
        this.cardHistory = [];
        this.historyList.innerHTML = '';
    }
    
    addToHistory(value, suit) {
        const card = { value, suit };
        this.cardHistory.push(card);
        
        // Create new history card element
        const historyCard = document.createElement('div');
        historyCard.className = 'history-card';
        
        const number = document.createElement('span');
        number.className = 'history-number';
        number.textContent = this.cardHistory.length + '.';
        
        const cardText = document.createElement('span');
        cardText.className = 'history-card-text';
        cardText.textContent = `${value}${this.suits[suit]}`;
        cardText.style.color = (suit === 'hearts' || suit === 'diamonds') ? '#e63946' : 'white';
        
        historyCard.appendChild(number);
        historyCard.appendChild(cardText);
        this.historyList.appendChild(historyCard);
        
        // Scroll to bottom of history
        this.historyList.scrollTop = this.historyList.scrollHeight;
    }
    
    getRandomSuit() {
        const suits = Object.keys(this.suits);
        return suits[Math.floor(Math.random() * suits.length)];
    }
    
    getRandomValue() {
        return this.values[Math.floor(Math.random() * this.values.length)];
    }
}

// Initialize the card generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CardGenerator();
});
