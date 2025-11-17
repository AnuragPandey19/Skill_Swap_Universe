// Auth Page JavaScript

// Tab Switching
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Remove active class from all tabs and forms
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding form
        tab.classList.add('active');
        document.getElementById(targetTab + 'Form').classList.add('active');
    });
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt:', { email, password });
    
    // Check if user exists
    let userData = JSON.parse(localStorage.getItem('skillswapUser'));
    
    if (!userData) {
        // Create demo account for first-time users
        userData = {
            name: 'Priya',
            email: email,
            coins: 250,
            level: 15,
            xp: 3450,
            skills: {
                teach: ['Guitar', 'JavaScript', 'Photography'],
                learn: ['Spanish', 'Piano', 'UI Design']
            },
            clubs: ['music-corner', 'web-dev'],
            activities: [],
            notifications: [],
            loggedIn: true,
            createdAt: new Date().toISOString()
        };
    } else {
        // Update existing user
        userData.email = email;
        userData.loggedIn = true;
    }
    
    localStorage.setItem('skillswapUser', JSON.stringify(userData));
    
    // Show success message
    showToast('Login successful! Welcome back 🎉');
    
    // Redirect to dashboard after short delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
});

// Signup Form Handler
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;
    
    console.log('Signup attempt:', { name, email, password, role });
    
    // Store user data
    const userData = {
        name: name,
        email: email,
        coins: 100, // Welcome bonus
        level: 1,
        xp: 0,
        skills: {
            teach: [],
            learn: []
        },
        clubs: [],
        activities: [],
        notifications: [{
            type: 'welcome',
            icon: '🎉',
            text: 'Welcome to SkillSwap Universe! Start by adding your skills.',
            read: false,
            time: new Date().toISOString()
        }],
        role: role,
        loggedIn: true,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('skillswapUser', JSON.stringify(userData));
    
    // Show success message
    showToast('Account created! Welcome to SkillSwap 🎉');
    
    // Redirect to dashboard after short delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
});

// Toast notification function
function showToast(message) {
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
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Social login handlers
document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Social login coming soon! 🚀');
    });
});

// Password visibility toggle
document.querySelectorAll('input[type="password"]').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary)';
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = 'var(--gray-light)';
    });
});

console.log('SkillSwap Universe - Auth Page Loaded 🔐');