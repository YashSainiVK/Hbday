// --- CONFIG.JS ---
// Centralized settings for birthday website

const CONFIG = {
    // Canvas Settings
    canvas: {
        starCount: 80,
        starColor: 'white',
        shootingStarChance: 0.01,
        shootingStarMinLength: 50,
        shootingStarMaxLength: 200,
        shootingStarMinSpeed: 5,
        shootingStarMaxSpeed: 10
    },

    // Floating Hearts
    heart: {
        minSize: 15,
        maxSize: 25,
        floatDurationMin: 3, // seconds
        floatDurationMax: 6, // seconds
        spawnInterval: 500 // milliseconds
    },

    // Audio Settings
    audio: {
        defaultVolume: 0.5,
        loop: true,
        autoplayOnClick: true
    },

    // Colors & Theme
    theme: {
        primaryColor: '#ff4d6d',
        secondaryColor: '#ffe0a3',
        backgroundGradient: 'linear-gradient(135deg, #ffd6e0, #ffe0a3)',
        doodleBackground: true
    },

    // Games
    games: {
        catchHearts: {
            enabled: true,
            heartSpeed: 2,
            maxHearts: 20
        },
        birthdayQuiz: {
            enabled: true,
            questions: [
                { q: "What's your favorite birthday memory?", options: ["Cake 🎂", "Gifts 🎁", "Party 🎉"], answer: 0 },
                { q: "Pick a birthday color theme:", options: ["Pink 💖", "Blue 💙", "Yellow 🌟"], answer: 0 },
                { q: "Choose your birthday activity:", options: ["Dance 💃", "Games 🎲", "Sleep 😴"], answer: 1 }
            ]
        }
    },

    // Messages
    messages: [
        "Hope your day is filled with love and laughter! 💖",
        "May all your wishes come true! ✨",
        "Have a fantastic year ahead! 🎂",
        "You deserve all the happiness today and always! 🌸",
        "Keep shining bright like the stars! ✨"
    ],

    // Cursor
    cursor: {
        iconPath: 'images/cursor.png',
        sparkles: true
    }
};
