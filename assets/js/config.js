/* FILE: assets/js/config.js */

/*
 * ============================================
 * 🎉 BIRTHDAY WEBSITE PERSONALIZATION 🎉
 * ============================================
 * 
 * THIS IS THE ONLY FILE YOU NEED TO EDIT!
 * 
 * Follow the instructions below to customize your romantic birthday website.
 * 
 * ============================================
 * 📸 HOW TO ADD PHOTOS
 * ============================================
 * 
 * 1. Upload your photos to a free image hosting service:
 *    - Imgur.com (upload, right-click image, "Copy image address")
 *    - Google Photos (create shareable link, get direct URL)
 *    - Dropbox (create shareable link)
 *    - Your own web server
 * 
 * 2. Copy the DIRECT IMAGE URL (must end in .jpg, .png, etc.)
 * 
 * 3. Paste the URLs in the "photos" array below, one per line:
 *    photos: [
 *      "https://example.com/photo1.jpg",
 *      "https://example.com/photo2.jpg",
 *      "https://example.com/photo3.jpg"
 *    ]
 * 
 * IMPORTANT: Use object/thing images (flowers, gifts, places, etc.) NOT person images
 * 
 * ============================================
 * 🎵 HOW TO ADD MUSIC
 * ============================================
 * 
 * 1. Host your MP3 files online:
 *    - SoundCloud (upload, get shareable link)
 *    - Google Drive (upload, get shareable link, convert to direct download)
 *    - Dropbox (upload, get shareable link)
 *    - Your own web server
 * 
 * 2. Make sure the URL is a DIRECT LINK to the MP3 file
 *    (should end in .mp3 or have ?download=1)
 * 
 * 3. Add tracks in the "audioTracks" array below:
 *    audioTracks: [
 *      {title: "Song Name", src: "https://example.com/song.mp3"},
 *      {title: "Another Song", src: "https://example.com/song2.mp3"}
 *    ]
 * 
 * ============================================
 */

const CONFIG = {
  // Birthday person's name (displayed on homepage)
  herName: "Srishti💖",
  
  // Subtitle/description for the homepage
  subtitle: "Celebrating another year of amazing memories together",
  
  // Birthday date in ISO format (YYYY-MM-DDTHH:MM:SS)
  // Example: "2024-12-25T00:00:00" for December 25, 2024
  birthdayISO: "2025-12-21T00:00:00",
  
  // Personal messages to display on homepage (array of strings)
  messages: [
    "You light up my whole world",
    "Your smile makes my day brighter",
    "Thank you for being you",
    "Here's to another amazing year together"
  ],
  
  // ============================================
  // 📸 PHOTO GALLERY
  // ============================================
  // PASTE YOUR IMAGE URLs HERE (replace placeholders)
  // Use object images (flowers, gifts, places, etc.) NOT person images
  photos: [
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800", // Nature
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", // Forest
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800", // Flowers
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", // Sunset
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800", // Mountains
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800", // Beach
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800", // Nature
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800"  // Landscape
  ],
  
  // ============================================
  // 🎵 MUSIC PLAYLIST
  // ============================================
  // PASTE YOUR MP3 URLs HERE (replace placeholders)
  // Format: {title: "Song Title", src: "https://example.com/song.mp3"}
  // Make sure URLs are publicly accessible and direct links to MP3 files
  // Default volume is set to 30% - adjust in music player if needed
  audioTracks: [
    {title: "1", src: "https://www.bensound.com/bensound-music/bensound-dreams.mp3"},
    {title: "2", src: "https://www.bensound.com/bensound-music/bensound-tenderness.mp3"},
    {title: "3", src: "https://www.ashamaluevmusic.com/wp-content/uploads/2023/07/AShamaluevMusic-Romantic.mp3"}
  ],
  
  // ============================================
  // 💌 HANDWRITTEN LETTER CONTENT
  // ============================================
  // Write your heartfelt letter here
  // This will be displayed in a beautiful handwritten-style format
  letterContent: `Dear Beautiful Soul,

I wanted to take a moment to tell you just how special you are to me. 
Every day with you feels like a gift, and I'm so grateful to have you in my life.

Your smile lights up my world, your laughter is my favorite sound, 
and your presence makes everything better. You bring so much joy, 
love, and happiness into my life, and I can't imagine my days without you.

On this special day, I want you to know that you are loved beyond measure. 
You deserve all the happiness, love, and wonderful things that life has to offer.

Thank you for being exactly who you are - perfect, beautiful, and amazing in every way.

With all my love,
Forever yours 💜`,
  
  // ============================================
  // 🎁 GIFT PAGE CONTENT
  // ============================================
  // HTML content to reveal on the gift page
  giftHtml: `
    <h2 style="text-align: center; margin-bottom: 2rem;">Your Special Gift 💜</h2>
    <div style="text-align: center; line-height: 2; font-size: 1.2rem;">
      <p>I've planned something amazing for you!</p>
      <p style="margin-top: 1.5rem;">Check the messages and videos below for your surprise! 🎉</p>
    </div>
  `,
  
  // ============================================
  // 💌 GIFT MESSAGES
  // ============================================
  // Special messages to show after opening the gift
  giftMessages: [
    {
      title: "A Special Message",
      content: "I've planned a romantic dinner for us at your favorite restaurant! Check your email for the reservation details. Can't wait to celebrate with you! 💖"
    },
    {
      title: "Another Surprise",
      content: "I've also arranged for us to go on that trip you've been wanting to take. Pack your bags, beautiful! ✈️"
    }
  ],
  
  // ============================================
  // 🎬 GIFT VIDEOS
  // ============================================
  // Videos to show after opening the gift
  // For YouTube: {title: "Video Title", url: "https://www.youtube.com/embed/VIDEO_ID", type: "youtube"}
  // For direct video: {title: "Video Title", url: "https://example.com/video.mp4", type: "mp4"}
  giftVideos: [
    {
      title: "A Special Video Message",
      url: "https://youtube.com/shorts/3s2bd6-BhK8?si=DyH9nKUlZ3PF39o9", // Replace with your video
      type: "youtube"
    }
  ],
  
  // ============================================
  // 🎮 MATCH GAME IMAGES
  // ============================================
  // Images to use in the memory match game
  // If not provided, will use photos array
  // Using sample object images - replace with your own!
  matchGameImages: [
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400", // Nature
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400", // Forest
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400", // Flowers
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", // Sunset
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400", // Mountains
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400"  // Beach
  ],
  
  // ============================================
  // 🎲 DICE GAME OUTCOMES
  // ============================================
  // Six outcomes for the dice game (one for each number 1-6)
  diceOutcomes: [
    "Movie Night 🎬",      // Roll 1
    "Picnic Date 🧺",      // Roll 2
    "Candlelight Dinner 🕯️", // Roll 3
    "Spa Day 💆",          // Roll 4
    "Adventure Day 🗺️",    // Roll 5
    "Dance Party 💃"       // Roll 6
  ],
  
  // ============================================
  // 💕 PICK A HEART MESSAGES
  // ============================================
  // Messages for the Pick a Heart game (9 messages for 9 hearts)
  heartMessages: [
    "You are amazing! 💖",
    "You light up my world! 💕",
    "I love you! 💗",
    "You are perfect! 💓",
    "You make me happy! 💝",
    "You are beautiful! 💖",
    "You are special! 💕",
    "You are loved! 💗",
    "You are wonderful! 💓"
  ],
  
  // ============================================
  // ❓ QUIZ QUESTIONS (Written Answers)
  // ============================================
  // These are special questions that require written answers
  // Answers will be saved in browser localStorage
  quiz: [
    {
      q: "What makes you smile the most when you think about us?"
    },
    {
      q: "What is one thing you love most about us?"
    },
    {
      q: "What is something you've always wanted to tell me but haven't had the chance to say yet?"
    }
  ]
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
