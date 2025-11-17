// Clubs & Communities JavaScript

// Club data
const clubsData = {
    'music-corner': {
        name: 'Music Corner',
        emoji: '🎸',
        members: 248,
        onlineNow: 32,
        type: 'online',
        isLive: true,
        liveEvent: {
            title: 'Acoustic Jam Session',
            performers: 32
        }
    },
    'web-dev': {
        name: 'Web Dev Masters',
        emoji: '💻',
        members: 412,
        onlineNow: 156,
        type: 'online',
        isLive: false
    },
    'dance': {
        name: 'Dance Studio',
        emoji: '💃',
        members: 324,
        onlineNow: 89,
        type: 'hybrid',
        isLive: false
    },
    'art-design': {
        name: 'Art & Design Hub',
        emoji: '🎨',
        members: 567,
        onlineNow: 203,
        type: 'online',
        isLive: false
    },
    'polyglot': {
        name: 'Polyglot Club',
        emoji: '🌍',
        members: 892,
        onlineNow: 445,
        type: 'online',
        isLive: false
    },
    'fitness': {
        name: 'Fitness Squad',
        emoji: '🏋️',
        members: 234,
        onlineNow: 67,
        type: 'hybrid',
        isLive: false
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeUser();
    updateMembershipStatus();
    
    // Show invitation after 5 seconds (demo)
    setTimeout(() => {
        showPerformanceInvitation();
    }, 5000);
    
    // Animate club cards
    document.querySelectorAll('.club-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Update membership status for all clubs
function updateMembershipStatus() {
    Object.keys(clubsData).forEach(clubId => {
        const isMember = isClubMember(clubId);
        const clubButtons = document.querySelectorAll(`[onclick*="'${clubId}'"]`);
        
        clubButtons.forEach(btn => {
            if (isMember && btn.textContent.includes('Join')) {
                btn.textContent = '✓ Joined';
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-success');
                btn.style.background = 'var(--success)';
            }
        });
    });
}

// Filter chips
document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', function() {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        filterClubs(filter);
    });
});

function filterClubs(filter) {
    const clubCards = document.querySelectorAll('.club-card');
    
    clubCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
        } else if (filter === 'live') {
            card.style.display = card.classList.contains('live-club') ? 'block' : 'none';
        } else {
            card.style.display = 'block';
        }
    });
    
    showToast(`🔍 Showing ${filter === 'all' ? 'all' : filter} clubs`);
}

// Join club - FIXED VERSION
function joinClubHandler(clubId) {
    const club = clubsData[clubId];
    
    if (!club) {
        showToast('❌ Club not found');
        return;
    }
    
    if (club.isLive) {
        showJoinModal(club, clubId);
    } else {
        // Regular club join - use the utility function from utils.js
        if (joinClub(clubId, club.name)) {
            updateMembershipStatus();
        }
    }
}

// Make it available globally
window.joinClub = joinClubHandler;

// Show join modal
function showJoinModal(club, clubId) {
    const modal = document.getElementById('joinClubModal');
    document.getElementById('modalClubName').textContent = club.name;
    
    if (club.isLive) {
        document.getElementById('modalLiveIndicator').style.display = 'block';
    } else {
        document.getElementById('modalLiveIndicator').style.display = 'none';
    }
    
    modal.classList.add('show');
    modal.dataset.clubId = clubId; // Store club ID for later use
}

function closeJoinModal() {
    document.getElementById('joinClubModal').classList.remove('show');
}

// Join live event
function joinLiveEvent(clubId) {
    const club = clubsData[clubId];
    showToast(`🔴 Joining ${club.liveEvent.title}...`);
    
    // Join the club first - use utility function
    joinClub(clubId, club.name);
    
    setTimeout(() => {
        openVideoCall();
    }, 1000);
}

// Join as performer
function joinAsPerformer() {
    const modal = document.getElementById('joinClubModal');
    const clubId = modal.dataset.clubId;
    const club = clubsData[clubId];
    
    closeJoinModal();
    showToast('🎤 Joining as performer...');
    
    // Join the club - use utility function
    joinClub(clubId, club.name);
    
    setTimeout(() => {
        openVideoCall();
        
        // Earn coins for performing
        setTimeout(() => {
            earnCoins(20, 'Joined live performance!');
        }, 3000);
    }, 1000);
}

// Join as audience
function joinAsAudience() {
    const modal = document.getElementById('joinClubModal');
    const clubId = modal.dataset.clubId;
    const club = clubsData[clubId];
    
    closeJoinModal();
    showToast('👁️ Joining as audience...');
    
    // Join the club - use utility function
    joinClub(clubId, club.name);
    
    setTimeout(() => {
        openVideoCall();
    }, 1000);
}

// Video call functions
function openVideoCall() {
    const videoModal = document.getElementById('videoModal');
    videoModal.classList.add('show');
    showToast('📹 Video call started!');
}

function leaveVideoCall() {
    const videoModal = document.getElementById('videoModal');
    videoModal.classList.remove('show');
    showToast('👋 Left the session');
}

function toggleMic() {
    const btn = event.target;
    btn.style.background = btn.style.background === 'rgba(239, 68, 68, 0.8)' ? 
        'rgba(255,255,255,0.2)' : 'rgba(239, 68, 68, 0.8)';
    showToast(btn.style.background === 'rgba(239, 68, 68, 0.8)' ? '🎤 Muted' : '🎤 Unmuted');
}

function toggleCamera() {
    const btn = event.target;
    btn.style.background = btn.style.background === 'rgba(239, 68, 68, 0.8)' ? 
        'rgba(255,255,255,0.2)' : 'rgba(239, 68, 68, 0.8)';
    showToast(btn.style.background === 'rgba(239, 68, 68, 0.8)' ? '📹 Camera off' : '📹 Camera on');
}

function shareScreen() {
    showToast('🖥️ Screen sharing started');
}

function toggleChat() {
    showToast('💬 Chat opened');
}

// Create club
function createClub() {
    showToast('🎯 Create Club feature coming soon!');
}

// View local meetups
function viewLocalMeetups() {
    closeJoinModal();
    showToast('📍 Showing local meetups near you...');
}

// Open club chat
function openClubChat(clubId) {
    const club = clubsData[clubId];
    showToast(`💬 Opening ${club.name} chat...`);
}

// View club details
function viewClubDetails(clubId) {
    const club = clubsData[clubId];
    showToast(`👁️ Viewing ${club.name} details...`);
}

// Performance invitation
function showPerformanceInvitation() {
    const toast = document.getElementById('invitationToast');
    if (toast) {
        toast.classList.add('show');
        
        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 10000);
    }
}

function acceptInvitation() {
    document.getElementById('invitationToast').classList.remove('show');
    joinLiveEvent('music-corner');
}

function dismissInvitation() {
    document.getElementById('invitationToast').classList.remove('show');
    showToast('Maybe next time! 👍');
}

console.log('SkillSwap Universe - Clubs & Communities Loaded 👥');