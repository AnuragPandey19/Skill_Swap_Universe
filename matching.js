// AI Matching JavaScript

// Sample match data
const matchProfiles = [
    {
        name: 'Sarah Kim',
        age: 22,
        location: 'New Delhi',
        teaches: ['Spanish 🇪🇸', 'Salsa Dancing 💃'],
        learns: ['Guitar 🎸', 'Photography 📸'],
        matchScore: 95,
        rating: 5.0,
        swaps: 15,
        bio: "Language enthusiast and dance lover! Looking to learn guitar and improve my photography skills. Let's swap and grow together! 🌟",
        badges: ['⚡ Quick Responder', '🏆 5.0 Rating', '🔥 15 Swaps'],
        available: 'online',
        image: 'https://ui-avatars.com/api/?name=Sarah+Kim&background=ec4899&color=fff&size=400'
    },
    {
        name: 'Mike Chen',
        age: 24,
        location: 'Mumbai',
        teaches: ['UI Design 🎨', 'Figma'],
        learns: ['Photography 📸', 'Video Editing 🎬'],
        matchScore: 88,
        rating: 4.8,
        swaps: 22,
        bio: "Product designer passionate about creating beautiful experiences. Want to learn photography to enhance my design portfolio!",
        badges: ['🎨 Design Pro', '⚡ Fast Learner', '🏆 4.8 Rating'],
        available: 'online',
        image: 'https://ui-avatars.com/api/?name=Mike+Chen&background=10b981&color=fff&size=400'
    },
    {
        name: 'Emma Wilson',
        age: 21,
        location: 'Bangalore',
        teaches: ['Piano 🎹', 'Music Theory 🎵'],
        learns: ['JavaScript 💻', 'React ⚛️'],
        matchScore: 92,
        rating: 5.0,
        swaps: 18,
        bio: "Classical pianist transitioning into web development. Would love to teach music in exchange for coding skills!",
        badges: ['🎹 Music Master', '⚡ Dedicated', '🏆 5.0 Rating'],
        available: 'online',
        image: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=f59e0b&color=fff&size=400'
    },
    {
        name: 'Raj Patel',
        age: 23,
        location: 'Dehradun',
        teaches: ['Python 🐍', 'Machine Learning 🤖'],
        learns: ['Guitar 🎸', 'Spanish 🇪🇸'],
        matchScore: 85,
        rating: 4.9,
        swaps: 12,
        bio: "AI enthusiast who wants to balance tech with creative skills. Guitar and languages are my next goals!",
        badges: ['🤖 ML Expert', '⚡ Tech Wizard', '🏆 4.9 Rating'],
        available: 'hybrid',
        image: 'https://ui-avatars.com/api/?name=Raj+Patel&background=8b5cf6&color=fff&size=400'
    }
];

let currentMatchIndex = 0;
let currentView = 'swipe';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeUser();
    loadCurrentMatch();
});

// Load current match
function loadCurrentMatch() {
    if (currentMatchIndex >= matchProfiles.length) {
        showNoMoreMatches();
        return;
    }
    
    const match = matchProfiles[currentMatchIndex];
    const card = document.getElementById('currentCard');
    
    if (!card) return;
    
    card.innerHTML = `
        <div class="match-image">
            <img src="${match.image}" alt="${match.name}">
            <div class="match-score">${match.matchScore}% Match</div>
        </div>
        <div class="match-content">
            <h2>${match.name}, ${match.age}</h2>
            <div class="match-location">📍 ${match.location} • ${match.available === 'online' ? 'Online Available' : 'Hybrid'}</div>
            <div class="match-skills-section">
                <div class="skill-swap-row">
                    <div class="skill-swap-item teach-skill">
                        <div class="skill-label">Can Teach</div>
                        <div class="skill-list">
                            ${match.teaches.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
                        </div>
                    </div>
                    <div class="swap-arrow">⇄</div>
                    <div class="skill-swap-item learn-skill">
                        <div class="skill-label">Wants to Learn</div>
                        <div class="skill-list">
                            ${match.learns.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="match-badges">
                ${match.badges.map(badge => `<span class="badge">${badge}</span>`).join('')}
            </div>
            <div class="match-bio">"${match.bio}"</div>
        </div>
        <div class="swipe-actions">
            <button class="swipe-btn skip" onclick="skipMatch()">
                <span>✕</span>
            </button>
            <button class="swipe-btn super" onclick="superLike()">
                <span>⭐</span>
            </button>
            <button class="swipe-btn like" onclick="likeMatch()">
                <span>❤️</span>
            </button>
        </div>
    `;
    
    // Animate card entrance
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    setTimeout(() => {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    }, 100);
}

// Skip match
function skipMatch() {
    animateSwipeOut('left');
    setTimeout(() => {
        currentMatchIndex++;
        loadCurrentMatch();
    }, 300);
}

// Like match
function likeMatch() {
    animateSwipeOut('right');
    setTimeout(() => {
        const match = matchProfiles[currentMatchIndex];
        showMatchModal(match.name);
        currentMatchIndex++;
        loadCurrentMatch();
    }, 300);
}

// Super like
function superLike() {
    const card = document.getElementById('currentCard');
    card.style.transform = 'scale(1.1) translateY(-30px)';
    setTimeout(() => {
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
            const match = matchProfiles[currentMatchIndex];
            showMatchModal(match.name);
            currentMatchIndex++;
            loadCurrentMatch();
        }, 300);
    }, 300);
}

// Animate swipe
function animateSwipeOut(direction) {
    const card = document.getElementById('currentCard');
    const translateX = direction === 'left' ? '-120%' : '120%';
    card.style.transform = `translateX(${translateX}) rotate(${direction === 'left' ? '-' : ''}20deg)`;
    card.style.opacity = '0';
}

// Show match modal
function showMatchModal(userName) {
    const modal = document.getElementById('matchModal');
    document.getElementById('matchedUser').textContent = userName;
    modal.classList.add('show');
    
    // Deduct coins for connection
    if (spendCoins(30, `Match with ${userName}`)) {
        addActivity({
            type: 'match',
            icon: '🤝',
            text: `Matched with ${userName} for skill swap`,
            time: new Date().toISOString()
        });
        
        addNotification({
            type: 'match',
            icon: '🎉',
            text: `It's a match! You and ${userName} can now swap skills.`
        });
    }
}

// Close modal
function closeModal() {
    closeAllModals();
}

// Send message
function sendMessage() {
    closeModal();
    showToast('Message sent! 💬 Check your inbox');
}

// Show no more matches
function showNoMoreMatches() {
    const card = document.getElementById('currentCard');
    card.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem;">
            <div style="font-size: 5rem; margin-bottom: 1rem;">🎉</div>
            <h2>You've seen all matches!</h2>
            <p style="color: var(--gray); margin: 1rem 0;">Check back later for more amazing skill swappers</p>
            <button class="btn-primary" onclick="resetMatches()">Start Over</button>
        </div>
    `;
}

// Reset matches (for demo)
function resetMatches() {
    currentMatchIndex = 0;
    loadCurrentMatch();
}

// Switch view
function switchView(view) {
    currentView = view;
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.view-btn').classList.add('active');
    
    if (view === 'swipe') {
        document.getElementById('swipeView').style.display = 'flex';
        document.getElementById('gridView').style.display = 'none';
    } else {
        document.getElementById('swipeView').style.display = 'none';
        document.getElementById('gridView').style.display = 'block';
    }
}

// Connect user from grid view
function connectUser(userName) {
    if (spendCoins(30, `Match with ${userName}`)) {
        showMatchModal(userName);
    }
}

// Apply filters
function applyFilters() {
    showToast('🔍 Filters applied! Refreshing matches...');
    setTimeout(() => {
        resetMatches();
    }, 500);
}

// Find matches
function findMatches() {
    showToast('🤖 AI is finding perfect matches for you...');
    setTimeout(() => {
        resetMatches();
    }, 1000);
}

console.log('SkillSwap Universe - AI Matching Loaded 🤖');