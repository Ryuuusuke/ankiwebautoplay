// ==UserScript==
// @name         AnkiWeb Sequential Audio Autoplay
// @namespace    http://tampermonkey.net/
// @version      1.3.1
// @description  Autoplay audio files in sequence on AnkiWeb
// @match        https://ankiuser.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let isPlaying = false; // flag to prevent multiple triggers

    function playAudioSequentially() {
        const audioElements = document.querySelectorAll("audio");
        if (audioElements.length === 0 || isPlaying) return;

        let currentIndex = 0;
        isPlaying = true;

        function playNext() {
            if (currentIndex >= audioElements.length) {
                isPlaying = false;
                return;
            }

            const audio = audioElements[currentIndex];
            audio.removeAttribute("controls");

            audio.play().then(() => {
                console.log(`Playing audio ${currentIndex + 1} of ${audioElements.length}`);
            }).catch(error => {
                console.warn("Playback error:", error);
                isPlaying = false;
            });

            audio.onended = () => {
                currentIndex++;
                playNext();
            };
        }

        playNext();
    }

    // MutationObserver to detect new cards/audio loaded
    const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if ([...mutation.addedNodes].some(node => node.querySelector?.("audio"))) {
                playAudioSequentially();
                break;
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Optional: initial check if audio already loaded
    window.addEventListener('load', () => {
        setTimeout(playAudioSequentially, 500); // slight delay to wait for DOM
    });
})();
