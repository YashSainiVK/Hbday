/* ========================
   SITE CONFIGURATION
   ======================== */

const CONFIG = {

    /* ------------------------
       Canvas / Stars Settings
    ------------------------ */
    canvas: {
        starCount: 120,               // Number of background stars
        starColor: 'white',           // Color of stars
        shootingStarChance: 0.005,    // Probability per interval (smaller = rarer)
        shootingStarMinSpeed: 2,      // Min shooting star speed
        shootingStarMaxSpeed: 6,      // Max shooting star speed
        shootingStarMinLength: 100,   // Min shooting star length in px
        shootingStarMaxLength: 300    // Max shooting star length in px
    },

    /* ------------------------
       Floating Hearts Settings
    ------------------------ */
    heart: {
        spawnInterval: 500,           // How often a heart spawns (ms)
        floatDurationMin: 4,          // Minimum float duration (seconds)
        floatDurationMax: 7           // Maximum float duration (seconds)
    },

    /* ------------------------
       Audio Settings
    ------------------------ */
    audio: {
        defaultVolume: 0.5,           // Default volume (0.0 to 1.0)
        loop: true                    // Should music loop? true/false
    },

    /* ------------------------
       Messages / Games Config
       (Existing original settings untouched)
    ------------------------ */
    messages: {
        defaultSpeed: 50,
        highlightColor: '#ff4081'
    },

    games: {
        catchHeartsSpeed: 2,
        quizTimeLimit: 30
    }

};
