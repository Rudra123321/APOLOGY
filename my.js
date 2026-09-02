const CORRECT_BIRTHDAY = "2007-05-11"; // Must be YYYY-MM-DD
const CORRECT_NICKNAME = "PRINCESS";   // Uppercase check

const bgMusic = document.getElementById('bg-music');

// Step 1: Login Check & Start Background Music
document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userDob = document.getElementById('dob').value;
    const userNickname = document.getElementById('nickname').value.trim().toLowerCase();
    const secretNickname = CORRECT_NICKNAME.trim().toLowerCase();
    const errorMsg = document.getElementById('error-msg');

    if (userDob === CORRECT_BIRTHDAY && userNickname === secretNickname) {
        // Start playing background music on first user interaction
        bgMusic.play().catch(function(error) {
            console.log("Autoplay prevented:", error);
        });

        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('questions-screen').classList.remove('hidden');
    } else {
        errorMsg.classList.remove('hidden');
    }
});

// Step 2: Answer 3 Questions -> Show Letter or Reconsider
document.getElementById('feeling-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const q3Value = document.getElementById('q3').value;
    const reconsiderMsg = document.getElementById('reconsider-msg');

    if (q3Value === 'no') {
        reconsiderMsg.classList.remove('hidden');
    } else {
        reconsiderMsg.classList.add('hidden');
        document.getElementById('questions-screen').classList.add('hidden');
        document.getElementById('apology-screen').classList.remove('hidden');
    }
});

// Step 3: Finish Letter -> Show Reflection Screen
document.getElementById('finish-letter-btn').addEventListener('click', function() {
    document.getElementById('apology-screen').classList.add('hidden');
    document.getElementById('reflection-screen').classList.remove('hidden');
});

// Step 4: Submit Reflection & Route Activity
document.getElementById('reflection-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const selectedAction = document.getElementById('next-action').value;
    document.getElementById('reflection-screen').classList.add('hidden');

    if (selectedAction === 'song') {
        document.getElementById('song-screen').classList.remove('hidden');
    } else if (selectedAction === 'talk') {
        document.getElementById('talk-screen').classList.remove('hidden');
    } else if (selectedAction === 'relax') {
        document.getElementById('relax-screen').classList.remove('hidden');
    }
});

// Step 5: Redirect to YouTube for Guaranteed Song Playback
document.getElementById('song-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const songQuery = document.getElementById('song-name').value;
    const playerContainer = document.getElementById('player-container');
    const playingText = document.getElementById('playing-text');
    const youtubeLink = document.getElementById('youtube-link');
    
    // Stop background audio if playing
    if (bgMusic) {
        bgMusic.pause();
    }

    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(songQuery)}`;
    
    playingText.innerText = `Playing "${songQuery}" for you... 💕`;
    youtubeLink.href = searchUrl;
    playerContainer.classList.remove('hidden');

    // Automatically open the song on YouTube in a new tab
    window.open(searchUrl, '_blank');
});