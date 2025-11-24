🎉 ROMANTIC BIRTHDAY WEBSITE - COMPLETE GUIDE 🎉
================================================

✨ WELCOME! ✨
This is a beautiful, Instagram-style romantic birthday website with a purplish love theme, 
hearts, stars, and lots of interactive features!


📋 QUICK START
==============

1. Edit ONLY this file: assets/js/config.js
   - This is the ONLY file you need to customize!
   - All instructions are inside that file

2. Test locally:
   - Open index.html in your web browser
   - OR use Python: python -m http.server 8000
   - Then visit: http://localhost:8000

3. Deploy:
   - GitHub Pages: Push to repo, enable Pages in Settings
   - Netlify: Drag and drop the folder to netlify.com/drop
   - Vercel: Install Vercel CLI, run "vercel" in project folder


📸 HOW TO ADD PHOTOS
====================

Method 1: Imgur (Easiest)
--------------------------
1. Go to imgur.com
2. Click "New post" and upload your photos
3. Right-click on the uploaded image
4. Select "Copy image address"
5. Paste the URL in config.js → photos array

Method 2: Google Photos
------------------------
1. Upload photos to Google Photos
2. Right-click photo → "Get link"
3. Open the link in a new tab
4. Right-click the image → "Copy image address"
5. Paste URL in config.js

Method 3: Dropbox
-----------------
1. Upload to Dropbox
2. Right-click file → Share → Create link
3. Change "?dl=0" to "?raw=1" at the end of URL
4. Paste in config.js

IMPORTANT: URLs must be DIRECT links to image files (ending in .jpg, .png, etc.)


🎵 HOW TO ADD MUSIC
===================

Method 1: SoundCloud
---------------------
1. Upload your MP3 to SoundCloud
2. Get the shareable link
3. Convert to direct download link (use online converters)
4. Paste in config.js → audioTracks array

Method 2: Google Drive
----------------------
1. Upload MP3 to Google Drive
2. Right-click → Share → Anyone with link
3. Get the file ID from URL
4. Use format: https://drive.google.com/uc?export=download&id=FILE_ID
5. Paste in config.js

Method 3: Dropbox
-----------------
1. Upload MP3 to Dropbox
2. Get shareable link
3. Change "?dl=0" to "?dl=1" at the end
4. Paste in config.js

Format in config.js:
  audioTracks: [
    {title: "Song Name", src: "https://example.com/song.mp3"},
    {title: "Another Song", src: "https://example.com/song2.mp3"}
  ]


💌 HOW TO CUSTOMIZE MESSAGES
=============================

Edit in config.js:
- herName: The birthday person's name
- subtitle: Text shown on homepage
- messages: Array of personal messages (appear on homepage)
- birthdayISO: Birthday date (format: "2024-12-25T00:00:00")


🎁 HOW TO CUSTOMIZE GIFT
=========================

Edit "giftHtml" in config.js. You can include:
- Text messages
- HTML links: <a href="url">Link text</a>
- Images: <img src="url" alt="description">
- Lists, paragraphs, etc.

Example:
  giftHtml: `
    <h2>Your Special Gift</h2>
    <p>I've booked us a romantic dinner at [Restaurant Name]!</p>
    <p>Check your email for details. Can't wait! 💖</p>
    <a href="https://example.com/reservation">View Reservation</a>
  `


❓ HOW TO CUSTOMIZE QUIZ
========================

Edit "quiz" array in config.js. Each question needs:
- q: Question text
- a: Array of answer options
- correct: Index of correct answer (0 = first, 1 = second, etc.)

Example:
  quiz: [
    {
      q: "What's our favorite place?",
      a: ["Beach", "Mountains", "Home", "Anywhere together"],
      correct: 3  // "Anywhere together" is correct (4th option, index 3)
    }
  ]


🎮 WEBSITE FEATURES
===================

✨ Single-Page Design
- Automatic navigation: Click "Continue" buttons to move through sections
- Smooth transitions between sections
- Progress bar at top shows your journey

💖 Sections:
1. Home - Hero image, countdown, welcome message
2. Gallery - Beautiful masonry layout with your photos
3. Playlist - Music player with mini-player in corner
4. Letter - Write and save a custom letter
5. Games - Memory Match, Love Quiz, Drawing Canvas, Spin the Wheel
6. Gift - Reveal your special surprise!

🎨 Design Features:
- Purplish Instagram love theme
- Floating hearts and stars
- Frosted glass effects
- Custom popups (no browser alerts!)
- Responsive design (works on mobile)


🔧 TECHNICAL DETAILS
====================

- All content stored client-side (localStorage)
- No server required - pure static HTML/CSS/JS
- Works offline after initial load
- No tracking, no analytics, completely private


📱 MOBILE FRIENDLY
==================

The website is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones


🚀 DEPLOYMENT OPTIONS
=====================

GitHub Pages (Free):
1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch
5. Your site will be at: username.github.io/repo-name

Netlify (Free):
1. Go to netlify.com
2. Drag and drop your folder
3. Get instant URL

Vercel (Free):
1. Install: npm i -g vercel
2. Run: vercel
3. Follow prompts


💡 TIPS
=======

- Test locally before deploying
- Use high-quality images (they'll look better)
- Keep MP3 files under 10MB for faster loading
- Add at least 6-8 photos for best gallery effect
- Personalize the quiz questions for more fun!


❓ TROUBLESHOOTING
=================

Photos not showing?
- Make sure URLs are direct links to images
- Check that URLs don't require login
- Try opening URL in browser to verify

Music not playing?
- Verify MP3 URLs are direct download links
- Check browser console for errors
- Some browsers block autoplay (user must click play)

Games not working?
- Make sure you have photos in config.js (for memory game)
- Check browser console for errors
- Try refreshing the page


📞 NEED HELP?
=============

All customization is done in: assets/js/config.js
Read the comments in that file for detailed instructions!


💜 Made with love for someone special 💜
