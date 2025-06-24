// ==UserScript==
// @name         AnkiWeb Sequential Audio Autoplay
// @namespace    http://tampermonkey.net/
// @version      1.3.4
// @description  Autoplay audio files in sequence on AnkiWeb
// @match        https://ankiuser.net/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let currentPlayback = {
        audioSetHash: "",
        abort: () => {}
    };

    function serializeAudioElements(audioElements) {
        return Array.from(audioElements).map(a => a.src).join("|") || "NO_AUDIO";
    }

    function playAudioSequentially() {
        const audioElements = document.querySelectorAll("audio");
        const currentAudioSet = serializeAudioElements(audioElements);

        // Always abort previous playback if audio set changes
        if (currentAudioSet !== currentPlayback.audioSetHash) {
            currentPlayback.abort(); // cancel old
            currentPlayback.audioSetHash = currentAudioSet; // update hash
        }

        if (audioElements.length === 0) return; // nothing to play

        let currentIndex = 0;
        let aborted = false;

        currentPlayback.abort = () => {
            aborted = true;
        };

        function playNext() {
            if (aborted || currentIndex >= audioElements.length) return;

            const audio = audioElements[currentIndex];
            audio.removeAttribute("controls");

            audio.play().then(() => {
                console.log(`Playing audio ${currentIndex + 1} of ${audioElements.length}`);
            }).catch(error => {
                console.warn("Playback error:", error);
            });

            audio.onended = () => {
                if (!aborted) {
                    currentIndex++;
                    playNext();
                }
            };
        }

        playNext();
    }

    const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if ([...mutation.addedNodes].some(node => node.querySelector?.("audio") || node.nodeName === "DIV")) {
                // always try playback on any mutation (even if audio belum muncul langsung)
                setTimeout(playAudioSequentially, 100); // delay to let DOM update
                break;
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('load', () => {
        setTimeout(playAudioSequentially, 500);
    });
})();
