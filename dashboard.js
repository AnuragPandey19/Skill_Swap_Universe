// Dashboard JavaScript

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    const userData = initializeUser();
    if (!userData) return;
    
    // Set user name
    const userNameEl = document.getElementById('userName');
    if (userNameEl) {
        userNameEl.textContent = userData.name.split(' ')[0];
    }
    
    // Update level and XP
    const levelEl = document.getElementById('userLevel');
    const xpEl = document.getElementById('currentXP');
    if (levelEl) levelEl.textContent = userData.level;
    if (xpEl) xpEl.textContent = userData.xp;
    
    // Show welcome message for new users
    if (userData.coins === 100 && (!userData.activities || userData.activities.length === 0)) {
        setTimeout(() => {
            showToast('🎉 Welcome bonus: +100 Skill Coins!');
            addActivity({
                type: 'welcome',
                icon: '🎉',
                text: 'Received welcome bonus of 100 coins',
                time: new Date().toISOString()
            });
        }, 1000);
    }
    
    // Load recent activities
    loadRecentActivities();
});

// Edit skills function
function editSkills() {
    showToast('Skill editing coming soon! 🎨');
}

// Connect with match
function connectMatch(name) {
    if (spendCoins(30, `Connected with ${name}`)) {
        // Animate the match card
        event.target.textContent = '✓ Connected';
        event.target.disabled = true;
        event.target.style.background = 'var(--success)';
        
        addActivity({
            type: 'match',
            icon: '🤝',
            text: `Connected with ${name}`,
            time: new Date().toISOString()
        });
    }
}

// Load recent activities
function loadRecentActivities() {
    const activities = getActivities(5);
    const activityContainer = document.querySelector('.events-list');
    
    if (!activityContainer) return;
    
    if (activities.length === 0) {
        activityContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--gray);">
                <p>No recent activities yet. Start swapping skills!</p>
            </div>
        `;
        return;
    }
    
    activityContainer.innerHTML = activities.map(activity => `
        <div class="event-item">
            <div class="event-icon">${activity.icon}</div>
            <div class="event-info">
                <div class="event-title">${activity.text}</div>
                <div class="event-time">${getTimeAgo(activity.time)}</div>
            </div>
        </div>
    `).join('');
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

// Notifications
function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('show');
    
    // Mark all as read when opened
    const userData = getUserData();
    if (userData && userData.notifications) {
        userData.notifications.forEach(n => n.read = true);
        updateUserData(userData);
        updateNotificationBadge();
    }
}

// Stat card animations
document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
});

// Dashboard card hover effects
document.querySelectorAll('.dashboard-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Achievement click effect
document.querySelectorAll('.achievement-badge:not(.locked)').forEach(badge => {
    badge.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        showToast('Achievement unlocked! 🏆');
    });
});

console.log('SkillSwap Universe - Dashboard Loaded 📊');