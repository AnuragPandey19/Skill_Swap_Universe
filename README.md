# 🌍 SkillSwap Universe - Prototype Setup Guide

## 📁 Project Structure

```
skillswap-universe/
│
├── index.html              # Landing page
├── login.html              # Login/Signup page
├── dashboard.html          # Main dashboard
├── matching.html           # AI Matching page
├── clubs.html              # Clubs & Communities page
├── stage.html              # Live Stage page (to be created)
├── profile.html            # User Profile page (to be created)
│
├── styles.css              # Main stylesheet (all pages)
│
├── landing.js              # Landing page scripts
├── auth.js                 # Authentication scripts
├── dashboard.js            # Dashboard scripts
├── matching.js             # AI Matching scripts
└── clubs.js                # Clubs & Communities scripts
```

## 🚀 Quick Start

### Step 1: Create Project Folder
Create a new folder on your computer called `skillswap-universe`

### Step 2: Create All Files
Create these files in your project folder:
- HTML files: `index.html`, `login.html`, `dashboard.html`, `matching.html`, `clubs.html`
- CSS file: `styles.css`
- JS files: `landing.js`, `auth.js`, `dashboard.js`, `matching.js`, `clubs.js`

### Step 3: Copy Code
Copy the code I provided for each file into the corresponding file.

### Step 4: Open in Browser
1. Open `index.html` in your web browser
2. Click "Get Started" to go to login page
3. Create an account (any email/password works - it's stored locally)
4. Explore the dashboard, matching, and clubs features!

## ✨ Working Features

### 🔐 Authentication
- ✅ Login / Signup with form validation
- ✅ User data stored in localStorage
- ✅ Welcome bonus: 100 coins for new users

### 📊 Dashboard
- ✅ Skill Wallet with teach/learn skills
- ✅ Coin balance display
- ✅ Recent matches preview
- ✅ Your clubs display
- ✅ Upcoming events
- ✅ Achievement badges
- ✅ Real-time notifications

### 🤖 AI Matching
- ✅ Swipe interface (like dating apps)
- ✅ Skip, Like, Super Like actions
- ✅ Grid view for browsing all matches
- ✅ Match percentage calculation
- ✅ Connect with users (costs 30 coins)
- ✅ Match celebration modal
- ✅ Filter by skills, location, availability

### 👥 Clubs & Communities
- ✅ Browse clubs by category
- ✅ Live performance indicators
- ✅ Join clubs (online/offline)
- ✅ Video call interface for live sessions
- ✅ Performance invitations (auto-popup)
- ✅ Join as performer or audience
- ✅ Real-time live banners

### 🪙 Coin System
- ✅ Earn coins by teaching (+50 per session)
- ✅ Spend coins to learn (-30 per session)
- ✅ Coin balance updates in real-time
- ✅ Transaction notifications

## 🎮 Demo Features

### Test Account
Use any email/password to create an account. Example:
- Email: `test@skillswap.com`
- Password: `password123`

### Coin Earning Simulation
The dashboard automatically simulates earning coins (disabled by default - uncomment `startDemo()` in `dashboard.js` to enable)

### Live Performance Invitations
Clubs page shows random performance invitations every 30 seconds

### AI Matching
4 pre-loaded profiles to swipe through:
1. Sarah Kim - Spanish teacher
2. Mike Chen - UI Designer
3. Emma Wilson - Pianist
4. Raj Patel - ML Expert

## 🎨 Design Features

- **Modern gradient backgrounds**
- **Glassmorphism effects**
- **Smooth animations**
- **Responsive design**
- **Dark mode ready**
- **Youth-friendly colors** (purple, pink, blue gradients)

## 💡 Customization

### Change Colors
Edit these variables in `styles.css`:
```css
:root {
    --primary: #6366f1;
    --secondary: #ec4899;
    --success: #10b981;
}
```

### Add More Matches
Edit the `matchProfiles` array in `matching.js`

### Add More Clubs
Edit the `clubsData` object in `clubs.js`

## 📱 Pages Overview

### 1. Landing Page (`index.html`)
- Hero section with animated floating cards
- Features showcase
- How it works section
- Community stats
- CTA buttons

### 2. Login Page (`login.html`)
- Tab-based login/signup
- Social login buttons (UI only)
- Form validation
- Smooth transitions

### 3. Dashboard (`dashboard.html`)
- Sidebar navigation
- Stats cards (coins, XP, skills, collabs)
- Skill wallet
- Recent matches
- Active clubs
- Upcoming events
- Achievement badges
- Notifications dropdown

### 4. AI Matching (`matching.html`)
- Filter sidebar
- Swipe view (Tinder-style)
- Grid view (browse all)
- Match modal
- Skill compatibility display
- Connect functionality

### 5. Clubs Page (`clubs.html`)
- Live performance banners
- Club grid with categories
- Join club functionality
- Video call interface
- Performance invitations
- Online/Offline indicators

## 🔧 Technical Details

### LocalStorage Structure
```javascript
{
  name: "User Name",
  email: "user@email.com",
  coins: 250,
  level: 15,
  xp: 3450,
  skills: {
    teach: ["Guitar", "JavaScript"],
    learn: ["Spanish", "Piano"]
  },
  clubs: ["music-corner", "web-dev"],
  loggedIn: true
}
```

### No Backend Required
- All data stored in browser localStorage
- No server/database needed
- Perfect for prototype/demo
- Can easily connect to real backend later

## 🎯 For OOAD Presentation

### Key Points to Highlight:
1. **Use Case Implementation**: Login, Matching, Clubs, Coin System
2. **User Interface Design**: Modern, intuitive, youth-focused
3. **Real-time Features**: Live sessions, notifications, invitations
4. **Gamification**: Coins, levels, badges, achievements
5. **Social Features**: Matching, clubs, video calls

### Demo Flow:
1. Show landing page → explain vision
2. Signup → show onboarding
3. Dashboard → explain Skill Wallet
4. AI Matching → demonstrate swipe feature
5. Clubs → show live performance joining
6. Highlight coin earning/spending

## 🐛 Known Limitations

- Data resets when clearing browser cache
- Video calls are UI only (no real WebRTC)
- Limited match profiles (only 4 demo profiles)
- No real AI matching algorithm (pre-configured matches)
- No actual file upload for skills

## 🚀 Future Enhancements

- Real backend API integration
- Actual WebRTC video calls
- Real AI matching algorithm
- Payment gateway for premium features
- Mobile app version
- Skill verification system
- Advanced gamification

## 📞 Support

For any issues or questions:
- Check browser console for errors (F12)
- Ensure all files are in same folder
- Try different browser if issues persist
- Clear localStorage: `localStorage.clear()` in console

## 🎉 Enjoy Your Presentation!

This prototype demonstrates all core concepts of SkillSwap Universe. Good luck with your OOAD class presentation! 🌟

---

Built with ❤️ for creators, learners, and performers worldwide.