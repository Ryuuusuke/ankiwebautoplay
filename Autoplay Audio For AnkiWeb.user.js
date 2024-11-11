// ==UserScript==
// @name         AnkiWeb Sequential Audio Autoplay
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Autoplay audio files in sequence on AnkiWeb
// @match        https://ankiuser.net/study/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to play audio elements sequentially
    function playAudioSequentially() {
        const audioElements = document.querySelectorAll("audio");
        let currentAudioIndex = 0;

        function playNextAudio() {
            if (currentAudioIndex < audioElements.length) {
                const audio = audioElements[currentAudioIndex];
                
                // Remove controls for cleaner autoplay
                audio.removeAttribute("controls");
                
                // Play the current audio and wait for it to end
                audio.play().then(() => {
                    console.log(`Playing audio ${currentAudioIndex + 1} of ${audioElements.length}`);
                }).catch(error => {
                    console.log("Playback error:", error);
                });

                // Move to the next audio after the current one ends
                audio.onended = () => {
                    currentAudioIndex++;
                    playNextAudio();
                };
            }
        }

        // Start the sequence
        playNextAudio();
    }

    // Observe for new cards loading to start sequential playback
    const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                playAudioSequentially();
                break;
            }
        }
    });

    // Start observing the document body for new nodes
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial playback attempt
    playAudioSequentially();
})();
