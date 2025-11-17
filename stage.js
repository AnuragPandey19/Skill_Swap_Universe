// Live Stage JavaScript

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeUser();
    
    // Animate performance cards
    animateCards();
    
    // Simulate live chat messages (for demo)
    startChatSimulation();
});

// Animate cards on load
function animateCards() {
    document.querySelectorAll('.live-performance-card, .past-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Show Go Live Modal
function showGoLiveModal() {
    const modal = document.getElementById('goLiveModal');
    modal.classList.add('show');
}

// Close Go Live Modal
function closeGoLiveModal() {
    const modal = document.getElementById('goLiveModal');
    modal.classList.remove('show');
}

// Start Live Performance
function startLivePerformance() {
    const title = document.getElementById('performanceTitle').value;
    const category = document.getElementById('performanceCategory').value;
    const description = document.getElementById('performanceDesc').value;
    const type = document.getElementById('performanceType').value;
    
    if (!title || !category) {
        showToast('❌ Please fill in title and category');
        return;
    }
    
    closeGoLiveModal();
    showToast('🔴 Starting your live performance...');
    
    // Add activity
    addActivity({
        type: 'live',
        icon: '🎤',
        text: `Started live performance: ${title}`,
        time: new Date().toISOString()
    });
    
    // Earn coins for going live
    setTimeout(() => {
        earnCoins(30, 'Started live performance!');
        
        // Show stage modal
        setTimeout(() => {
            openStageModal();
        }, 1000);
    }, 2000);
}

// Join Performance
function joinPerformance(performanceId) {
    showToast('🎤 Joining live performance...');
    
    setTimeout(() => {
        openStageModal();
    }, 1000);
}

// Open Stage Modal
function openStageModal() {
    const modal = document.getElementById('stageModal');
    modal.classList.add('show');
    showToast('🎤 You\'re now watching live!');
}

// Leave Stage
function leaveStage() {
    const modal = document.getElementById('stageModal');
    modal.classList.remove('show');
    showToast('👋 Left the performance');
}

// Stage Controls
function toggleStageMic() {
    const btn = event.target.closest('.stage-control-btn');
    btn.classList.toggle('active');
    
    if (btn.classList.contains('active')) {
        btn.style.background = 'rgba(239, 68, 68, 0.8)';
        showToast('🎤 Microphone muted');
    } else {
        btn.style.background = 'rgba(255,255,255,0.1)';
        showToast('🎤 Microphone unmuted');
    }
}

function toggleStageCamera() {
    const btn = event.target.closest('.stage-control-btn');
    btn.classList.toggle('active');
    
    if (btn.classList.contains('active')) {
        btn.style.background = 'rgba(239, 68, 68, 0.8)';
        showToast('📹 Camera off');
    } else {
        btn.style.background = 'rgba(255,255,255,0.1)';
        showToast('📹 Camera on');
    }
}

function toggleStageScreen() {
    showToast('🖥️ Screen sharing started');
}

function sendCheer() {
    // Spend 5 coins to send a cheer
    if (spendCoins(5, 'Sent a cheer')) {
        showToast('👏 Cheer sent!');
        
        // Add cheer message to chat
        const chatMessages = document.getElementById('stageChatMessages');
        const userData = getUserData();
        const cheerMsg = document.createElement('div');
        cheerMsg.className = 'chat-message cheer';
        cheerMsg.textContent = `👏 ${userData.name.split(' ')[0]} sent a cheer!`;
        chatMessages.appendChild(cheerMsg);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Send Stage Message
function sendStageMessage() {
    const input = document.getElementById('stageChatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const userData = getUserData();
    const chatMessages = document.getElementById('stageChatMessages');
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message';
    msgDiv.innerHTML = `<span class="chat-user">${userData.name.split(' ')[0]}:</span> ${message}`;
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    input.value = '';
}

// Set Reminder
function setReminder(performanceId) {
    showToast('⏰ Reminder set! We\'ll notify you 5 minutes before.');
    
    addNotification({
        type: 'reminder',
        icon: '⏰',
        text: 'Reminder set for upcoming performance'
    });
    
    // Change button text
    event.target.textContent = '✓ Reminder Set';
    event.target.style.background = 'var(--success)';
    event.target.disabled = true;
}

// Watch Recording
function watchRecording(recordingId) {
    showToast('▶️ Loading recording...');
    
    setTimeout(() => {
        openStageModal();
    }, 1000);
}

// Simulate live chat (for demo)
function startChatSimulation() {
    const sampleMessages = [
        { user: 'John', text: 'This is so helpful! 🙌' },
        { user: 'Lisa', text: 'Can you explain that again?' },
        { user: 'Tom', text: 'Amazing session! ⭐' },
        { user: 'Kate', text: 'Where can I learn more?' },
        { user: 'Sam', text: 'Thank you for this! 🎉' }
    ];
    
    let messageIndex = 0;
    
    setInterval(() => {
        const chatMessages = document.getElementById('stageChatMessages');
        if (!chatMessages || !document.getElementById('stageModal').classList.contains('show')) return;
        
        const msg = sampleMessages[messageIndex % sampleMessages.length];
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message';
        msgDiv.innerHTML = `<span class="chat-user">${msg.user}:</span> ${msg.text}`;
        
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        messageIndex++;
        
        // Keep only last 50 messages
        if (chatMessages.children.length > 50) {
            chatMessages.removeChild(chatMessages.firstChild);
        }
    }, 5000); // New message every 5 seconds
}

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('stageChatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendStageMessage();
            }
        });
    }
});

console.log('SkillSwap Universe - Live Stage Loaded 🎤');