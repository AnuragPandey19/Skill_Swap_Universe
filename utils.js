// Shared Utilities - SkillSwap Universe
// Include this file in ALL pages: <script src="utils.js"></script>

// ============================================
// USER DATA MANAGEMENT
// ============================================

// Get current user data
function getUserData() {
    const userData = localStorage.getItem('skillswapUser');
    if (!userData) return null;
    return JSON.parse(userData);
}

// Update user data
function updateUserData(updates) {
    const userData = getUserData();
    if (!userData) return null;
    
    const updatedData = { ...userData, ...updates };
    localStorage.setItem('skillswapUser', JSON.stringify(updatedData));
    
    // Broadcast change to other tabs/windows
    window.dispatchEvent(new CustomEvent('userDataUpdated', { detail: updatedData }));
    
    return updatedData;
}

// Check if user is logged in, redirect if not
function requireAuth() {
    const userData = getUserData();
    if (!userData || !userData.loggedIn) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Initialize user session
function initializeUser() {
    if (!requireAuth()) return null;
    
    const userData = getUserData();
    
    // Update coin displays across the page
    updateAllCoinDisplays();
    
    // Update user name displays
    const nameElements = document.querySelectorAll('[data-user-name]');
    nameElements.forEach(el => {
        el.textContent = userData.name.split(' ')[0];
    });
    
    // Update user avatar
    const avatarElements = document.querySelectorAll('[data-user-avatar]');
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=6366f1&color=fff&size=200`;
    avatarElements.forEach(el => {
        if (el.tagName === 'IMG') {
            el.src = avatarUrl;
        }
    });
    
    return userData;
}

// ============================================
// COIN SYSTEM
// ============================================

function updateAllCoinDisplays() {
    const userData = getUserData();
    if (!userData) return;
    
    const coinElements = document.querySelectorAll('.coin-amount, #sidebarCoins, #totalCoins, #totalCoinsProfile, [data-user-coins]');
    coinElements.forEach(el => {
        el.textContent = userData.coins;
    });
}

function earnCoins(amount, reason) {
    const userData = getUserData();
    if (!userData) return;
    
    userData.coins += amount;
    userData.xp += amount * 2;
    
    // Check for level up
    const requiredXP = userData.level * 100;
    if (userData.xp >= requiredXP) {
        userData.level++;
        userData.xp -= requiredXP;
        showToast(`🎉 Level Up! You're now level ${userData.level}!`);
    }
    
    updateUserData(userData);
    updateAllCoinDisplays();
    showToast(`🎉 +${amount} coins! ${reason}`);
    
    // Add to activity feed
    addActivity({
        type: 'earn',
        icon: '🎉',
        text: `Earned ${amount} coins from ${reason}`,
        time: new Date().toISOString()
    });
}

function spendCoins(amount, reason) {
    const userData = getUserData();
    if (!userData) return false;
    
    if (userData.coins < amount) {
        showToast('❌ Not enough coins! Teach skills to earn more.');
        return false;
    }
    
    userData.coins -= amount;
    updateUserData(userData);
    updateAllCoinDisplays();
    showToast(`✅ -${amount} coins! ${reason}`);
    
    // Add to activity feed
    addActivity({
        type: 'spend',
        icon: '💰',
        text: `Spent ${amount} coins on ${reason}`,
        time: new Date().toISOString()
    });
    
    return true;
}

// ============================================
// ACTIVITY FEED
// ============================================

function addActivity(activity) {
    const userData = getUserData();
    if (!userData) return;
    
    if (!userData.activities) {
        userData.activities = [];
    }
    
    userData.activities.unshift({
        ...activity,
        id: Date.now()
    });
    
    // Keep only last 50 activities
    userData.activities = userData.activities.slice(0, 50);
    
    updateUserData(userData);
}

function getActivities(limit = 10) {
    const userData = getUserData();
    if (!userData || !userData.activities) return [];
    
    return userData.activities.slice(0, limit);
}

// ============================================
// CLUBS MANAGEMENT
// ============================================

function joinClub(clubId, clubName) {
    const userData = getUserData();
    if (!userData) return false;
    
    if (!userData.clubs) {
        userData.clubs = [];
    }
    
    if (userData.clubs.includes(clubId)) {
        showToast('ℹ️ You are already a member of this club');
        return false;
    }
    
    userData.clubs.push(clubId);
    updateUserData(userData);
    
    showToast(`✅ Joined ${clubName}! Welcome to the community 🎉`);
    
    addActivity({
        type: 'club',
        icon: '👥',
        text: `Joined ${clubName}`,
        time: new Date().toISOString()
    });
    
    return true;
}

function leaveClub(clubId, clubName) {
    const userData = getUserData();
    if (!userData || !userData.clubs) return false;
    
    userData.clubs = userData.clubs.filter(id => id !== clubId);
    updateUserData(userData);
    
    showToast(`👋 Left ${clubName}`);
    return true;
}

function isClubMember(clubId) {
    const userData = getUserData();
    if (!userData || !userData.clubs) return false;
    
    return userData.clubs.includes(clubId);
}

// ============================================
// NOTIFICATIONS
// ============================================

function addNotification(notification) {
    const userData = getUserData();
    if (!userData) return;
    
    if (!userData.notifications) {
        userData.notifications = [];
    }
    
    userData.notifications.unshift({
        ...notification,
        id: Date.now(),
        read: false,
        time: new Date().toISOString()
    });
    
    // Keep only last 20 notifications
    userData.notifications = userData.notifications.slice(0, 20);
    
    updateUserData(userData);
    updateNotificationBadge();
}

function markNotificationRead(notificationId) {
    const userData = getUserData();
    if (!userData || !userData.notifications) return;
    
    const notification = userData.notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        updateUserData(userData);
        updateNotificationBadge();
    }
}

function getUnreadNotificationCount() {
    const userData = getUserData();
    if (!userData || !userData.notifications) return 0;
    
    return userData.notifications.filter(n => !n.read).length;
}

function updateNotificationBadge() {
    const count = getUnreadNotificationCount();
    const badges = document.querySelectorAll('.notification-badge');
    
    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    });
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, duration = 3000) {
    // Remove any existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    });
    
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '2rem';
    toast.style.right = '2rem';
    toast.style.zIndex = '3000';
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// ============================================
// LOGOUT
// ============================================

function logout() {
    const userData = getUserData();
    if (userData) {
        userData.loggedIn = false;
        localStorage.setItem('skillswapUser', JSON.stringify(userData));
    }
    
    showToast('👋 Logged out successfully!');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// ============================================
// MODAL HELPERS
// ============================================

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
}

// Click outside modal to close
document.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});

// ============================================
// CROSS-TAB SYNC
// ============================================

// Listen for user data changes from other tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'skillswapUser') {
        // User data changed in another tab
        updateAllCoinDisplays();
        updateNotificationBadge();
        
        // Check if user logged out
        const userData = getUserData();
        if (!userData || !userData.loggedIn) {
            window.location.href = 'login.html';
        }
    }
});

// Listen for custom events
window.addEventListener('userDataUpdated', (e) => {
    updateAllCoinDisplays();
    updateNotificationBadge();
});

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if this is a protected page (not login/landing)
    const publicPages = ['login.html', 'index.html', ''];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!publicPages.includes(currentPage)) {
        initializeUser();
        updateNotificationBadge();
    }
});

console.log('SkillSwap Universe - Utils Loaded 🔧');