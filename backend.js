// Backend Simulation - SkillSwap Universe
// This file simulates backend operations for demonstration purposes

class SkillSwapBackend {
    constructor() {
        this.users = [];
        this.matches = [];
        this.clubs = [];
        this.transactions = [];
        this.sessions = [];
    }

    // User Management
    registerUser(userData) {
        const user = {
            id: this.generateId(),
            name: userData.name,
            email: userData.email,
            password: this.hashPassword(userData.password),
            coins: 100, // Welcome bonus
            level: 1,
            xp: 0,
            skills: {
                teach: [],
                learn: []
            },
            clubs: [],
            matches: [],
            achievements: [],
            verified: false,
            createdAt: new Date().toISOString()
        };
        
        this.users.push(user);
        return this.createSession(user.id);
    }

    loginUser(email, password) {
        const user = this.users.find(u => u.email === email);
        if (!user) {
            throw new Error('User not found');
        }
        
        if (this.verifyPassword(password, user.password)) {
            return this.createSession(user.id);
        }
        
        throw new Error('Invalid password');
    }

    // AI Matching Algorithm
    findMatches(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return [];

        const potentialMatches = this.users
            .filter(u => u.id !== userId)
            .map(match => ({
                user: match,
                score: this.calculateMatchScore(user, match)
            }))
            .filter(m => m.score > 50)
            .sort((a, b) => b.score - a.score)
            .slice(0, 20); // Top 20 matches

        return potentialMatches;
    }

    calculateMatchScore(user1, user2) {
        let score = 0;

        // Check if user1's learning skills match user2's teaching skills
        const learningMatch = user1.skills.learn.filter(skill => 
            user2.skills.teach.includes(skill)
        ).length;

        // Check if user1's teaching skills match user2's learning skills
        const teachingMatch = user1.skills.teach.filter(skill => 
            user2.skills.learn.includes(skill)
        ).length;

        // Calculate base score
        score = (learningMatch * 30) + (teachingMatch * 30);

        // Perfect swap bonus
        if (learningMatch > 0 && teachingMatch > 0) {
            score += 40;
        }

        // Location bonus (would check actual location in real system)
        score += 10;

        return Math.min(score, 100);
    }

    // Coin System
    earnCoins(userId, amount, reason) {
        const user = this.users.find(u => u.id === userId);
        if (!user) throw new Error('User not found');

        user.coins += amount;
        user.xp += amount * 2;

        // Check for level up
        this.checkLevelUp(user);

        // Record transaction
        this.transactions.push({
            id: this.generateId(),
            userId: userId,
            type: 'earn',
            amount: amount,
            reason: reason,
            timestamp: new Date().toISOString()
        });

        return user.coins;
    }

    spendCoins(userId, amount, reason) {
        const user = this.users.find(u => u.id === userId);
        if (!user) throw new Error('User not found');
        if (user.coins < amount) throw new Error('Insufficient coins');

        user.coins -= amount;

        this.transactions.push({
            id: this.generateId(),
            userId: userId,
            type: 'spend',
            amount: amount,
            reason: reason,
            timestamp: new Date().toISOString()
        });

        return user.coins;
    }

    // Level System
    checkLevelUp(user) {
        const requiredXP = user.level * 100;
        if (user.xp >= requiredXP) {
            user.level++;
            user.xp -= requiredXP;
            this.unlockAchievement(user.id, `Level ${user.level} Achieved`);
            return true;
        }
        return false;
    }

    // Club Management
    createClub(clubData) {
        const club = {
            id: this.generateId(),
            name: clubData.name,
            category: clubData.category,
            description: clubData.description,
            creatorId: clubData.creatorId,
            members: [clubData.creatorId],
            type: clubData.type, // 'online' or 'hybrid'
            isLive: false,
            liveSession: null,
            createdAt: new Date().toISOString()
        };

        this.clubs.push(club);
        return club;
    }

    joinClub(userId, clubId) {
        const club = this.clubs.find(c => c.id === clubId);
        const user = this.users.find(u => u.id === userId);
        
        if (!club || !user) throw new Error('Club or user not found');
        if (club.members.includes(userId)) throw new Error('Already a member');

        club.members.push(userId);
        user.clubs.push(clubId);

        return true;
    }

    // Live Session Management
    startLiveSession(clubId, sessionData) {
        const club = this.clubs.find(c => c.id === clubId);
        if (!club) throw new Error('Club not found');

        const session = {
            id: this.generateId(),
            clubId: clubId,
            title: sessionData.title,
            hostId: sessionData.hostId,
            performers: [sessionData.hostId],
            audience: [],
            startTime: new Date().toISOString(),
            status: 'live'
        };

        club.isLive = true;
        club.liveSession = session.id;
        this.sessions.push(session);

        return session;
    }

    joinLiveSession(sessionId, userId, role) {
        const session = this.sessions.find(s => s.id === sessionId);
        if (!session) throw new Error('Session not found');

        if (role === 'performer') {
            if (!session.performers.includes(userId)) {
                session.performers.push(userId);
                // Earn coins for performing
                this.earnCoins(userId, 20, 'Joined live performance');
            }
        } else {
            if (!session.audience.includes(userId)) {
                session.audience.push(userId);
            }
        }

        return session;
    }

    endLiveSession(sessionId) {
        const session = this.sessions.find(s => s.id === sessionId);
        if (!session) throw new Error('Session not found');

        const club = this.clubs.find(c => c.id === session.clubId);
        if (club) {
            club.isLive = false;
            club.liveSession = null;
        }

        session.status = 'ended';
        session.endTime = new Date().toISOString();

        // Reward performers
        session.performers.forEach(performerId => {
            this.earnCoins(performerId, 50, 'Completed live performance');
        });

        return session;
    }

    // Achievement System
    unlockAchievement(userId, achievementName) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        if (!user.achievements.includes(achievementName)) {
            user.achievements.push(achievementName);
            this.earnCoins(userId, 10, `Achievement unlocked: ${achievementName}`);
        }
    }

    // Skill Verification
    verifySkill(userId, skill, portfolio) {
        const user = this.users.find(u => u.id === userId);
        if (!user) throw new Error('User not found');

        // Simple verification (would use AI/human review in real system)
        if (portfolio && portfolio.length > 0) {
            if (!user.verifiedSkills) user.verifiedSkills = [];
            user.verifiedSkills.push({
                skill: skill,
                verifiedAt: new Date().toISOString(),
                portfolio: portfolio
            });

            this.unlockAchievement(userId, 'Verified Skill');
            return true;
        }

        return false;
    }

    // Helper Functions
    generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now();
    }

    hashPassword(password) {
        // Simple hash (use bcrypt in production)
        return btoa(password);
    }

    verifyPassword(password, hash) {
        return btoa(password) === hash;
    }

    createSession(userId) {
        return {
            sessionId: this.generateId(),
            userId: userId,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
    }

    // Analytics
    getUserStats(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return null;

        const userTransactions = this.transactions.filter(t => t.userId === userId);
        const totalEarned = userTransactions
            .filter(t => t.type === 'earn')
            .reduce((sum, t) => sum + t.amount, 0);
        const totalSpent = userTransactions
            .filter(t => t.type === 'spend')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            userId: userId,
            name: user.name,
            level: user.level,
            xp: user.xp,
            coins: user.coins,
            totalEarned: totalEarned,
            totalSpent: totalSpent,
            matchesCount: user.matches.length,
            clubsCount: user.clubs.length,
            achievementsCount: user.achievements.length,
            memberSince: user.createdAt
        };
    }

    getLeaderboard(category = 'coins') {
        return this.users
            .sort((a, b) => b[category] - a[category])
            .slice(0, 10)
            .map((user, index) => ({
                rank: index + 1,
                name: user.name,
                value: user[category],
                level: user.level
            }));
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillSwapBackend;
}

// Example Usage
/*
const backend = new SkillSwapBackend();

// Register user
const session = backend.registerUser({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'password123'
});

// Add skills
const user = backend.users[0];
user.skills.teach = ['Guitar', 'JavaScript'];
user.skills.learn = ['Spanish', 'Piano'];

// Find matches
const matches = backend.findMatches(user.id);
console.log('Top matches:', matches);

// Earn coins
backend.earnCoins(user.id, 50, 'Taught guitar lesson');

// Create club
const club = backend.createClub({
    name: 'Music Lovers',
    category: 'music',
    description: 'For music enthusiasts',
    creatorId: user.id,
    type: 'online'
});

// Start live session
const session = backend.startLiveSession(club.id, {
    title: 'Jam Session',
    hostId: user.id
});

// Get user stats
const stats = backend.getUserStats(user.id);
console.log('User stats:', stats);
*/

console.log('SkillSwap Universe - Backend Simulation Loaded 🚀');