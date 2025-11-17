// Profile Page JavaScript

// Initialize profile
document.addEventListener('DOMContentLoaded', () => {
    const userData = initializeUser();
    if (!userData) return;
    
    loadProfileData(userData);
    loadActivityFeed();
});

// Load profile data
function loadProfileData(userData) {
    // Set basic info
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('userLevel').textContent = userData.level || 15;
    document.getElementById('currentXP').textContent = userData.xp || 3450;
    
    // Calculate level progress
    const requiredXP = (userData.level || 15) * 100;
    const currentXP = userData.xp || 3450;
    const progress = (currentXP / requiredXP) * 100;
    const progressBar = document.querySelector('.level-progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    // Set profile stats
    document.getElementById('totalCoinsProfile').textContent = userData.coins;
    
    // Update bio
    const bioEl = document.getElementById('profileBio');
    if (bioEl) {
        bioEl.textContent = userData.bio || 'Passionate musician and developer. Love teaching and learning new skills!';
    }
    
    // Update avatar
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=6366f1&color=fff&size=200`;
    document.getElementById('profileAvatar').src = avatarUrl;
}

// Load activity feed
function loadActivityFeed() {
    const activities = getActivities(10);
    const activityFeed = document.querySelector('.activity-feed');
    
    if (!activityFeed) return;
    
    if (activities.length === 0) {
        activityFeed.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--gray);">
                <p>No activities yet. Start swapping skills to see your activity here!</p>
            </div>
        `;
        return;
    }
    
    activityFeed.innerHTML = activities.map(activity => {
        const iconClass = getActivityIconClass(activity.type);
        return `
            <div class="activity-item">
                <div class="activity-icon ${iconClass}">${activity.icon}</div>
                <div class="activity-content">
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-time">${getTimeAgo(activity.time)}</div>
                </div>
            </div>
        `;
    }).join('');
}

// Get activity icon class
function getActivityIconClass(type) {
    const classes = {
        'earn': 'earn',
        'spend': 'earn',
        'match': 'match',
        'club': 'club',
        'achievement': 'achievement',
        'welcome': 'earn'
    };
    return classes[type] || 'earn';
}

// Get time ago helper
function getTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

// Toggle edit mode
function toggleEditMode() {
    const userData = getUserData();
    const modal = document.getElementById('editProfileModal');
    modal.classList.add('show');
    
    // Populate form with current data
    document.getElementById('editName').value = userData.name;
    document.getElementById('editBio').value = userData.bio || 'Passionate musician and developer. Love teaching and learning new skills!';
    document.getElementById('editLocation').value = userData.location || 'Dehradun, India';
}

// Close edit modal
function closeEditModal() {
    closeAllModals();
}

// Save profile
function saveProfile() {
    const newName = document.getElementById('editName').value;
    const newBio = document.getElementById('editBio').value;
    const newLocation = document.getElementById('editLocation').value;
    
    // Update userData
    const updates = {
        name: newName,
        bio: newBio,
        location: newLocation
    };
    
    updateUserData(updates);
    
    // Update UI
    document.getElementById('profileName').textContent = newName;
    document.getElementById('profileBio').textContent = newBio;
    
    // Update avatar
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(newName)}&background=6366f1&color=fff&size=200`;
    document.getElementById('profileAvatar').src = avatarUrl;
    
    closeEditModal();
    showToast('✅ Profile updated successfully!');
    
    addActivity({
        type: 'profile',
        icon: '✏️',
        text: 'Updated profile information',
        time: new Date().toISOString()
    });
}

// Change avatar
function changeAvatar() {
    showToast('📷 Avatar upload feature coming soon!');
}

// Edit skills
function editSkills() {
    showToast('✏️ Opening skill editor...');
}

// Upload work
function uploadWork() {
    showToast('📤 Upload portfolio feature coming soon!');
}

// Achievement click animation
document.querySelectorAll('.achievement-card.unlocked').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
        
        const achievementName = this.querySelector('.achievement-name').textContent;
        showToast(`🏆 ${achievementName} unlocked!`);
    });
});

// Portfolio item click
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('.portfolio-title').textContent;
        showToast(`📂 Opening ${title}...`);
    });
});

// Animate profile sections on load
document.querySelectorAll('.profile-section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    setTimeout(() => {
        section.style.transition = 'all 0.5s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, index * 100);
});

// Animate stat cards
document.querySelectorAll('.profile-stat-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    }, index * 100);
});

console.log('SkillSwap Universe - Profile Page Loaded 👤');