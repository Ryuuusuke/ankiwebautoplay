// ==UserScript==
// @name         AnkiWeb Sequential Audio Autoplay
// @namespace    http://tampermonkey.net/
// @version      1.3.2
// @description  Autoplay audio files in sequence on AnkiWeb
// @match        https://ankiuser.net/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let isPlaying = false;
    let lastAudioSet = "";

    function serializeAudioElements(audioElements) {
        // Serialize audio srcs into a string for comparison
        return Array.from(audioElements).map(a => a.src).join("|");
    }

    function playAudioSequentially() {
        const audioElements = document.querySelectorAll("audio");
        const currentAudioSet = serializeAudioElements(audioElements);

        // Skip if no audio or still playing the same set
        if (audioElements.length === 0) return;
        if (isPlaying && currentAudioSet === lastAudioSet) return;

        lastAudioSet = currentAudioSet;
        isPlaying = true;

        let currentIndex = 0;

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

    const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if ([...mutation.addedNodes].some(node => node.querySelector?.("audio"))) {
                playAudioSequentially();
                break;
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('load', () => {
        setTimeout(playAudioSequentially, 500);
    });
})();
