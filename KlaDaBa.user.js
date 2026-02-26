// ==UserScript==
// @name         KlaDaBa utils
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Enable middle-click to open submission rows in new tabs
// @author       Lutz Pfannenschmidt
// @match        https://db.fachschaft.tf/submission/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Lutz-Pfannenschmidt/BlaDaBa_util/refs/heads/main/KlaDaBa.user.js
// @downloadURL  https://raw.githubusercontent.com/Lutz-Pfannenschmidt/BlaDaBa_util/refs/heads/main/KlaDaBa.user.js
// @supportURL   https://github.com/Lutz-Pfannenschmidt/BlaDaBa_util/issues
// ==/UserScript==

(function () {
    'use strict';

    // Select all table rows that have the onclick attribute
    const rows = document.querySelectorAll('tr[onclick]');

    rows.forEach(row => {
        // Extract submission link from the onclick attribute
        const onclickValue = row.getAttribute('onclick');
        const submissionUrl = onclickValue.match(/'(\/submission\/\d+\/)'/)[1];

        row.removeAttribute("onclick")

        // Add event listener for clicks
        row.addEventListener('click', function(event) {
            // Detect left-click to follow the link
            if (event.button === 0) { // Left click
                window.location.href = submissionUrl;
            }
        });

        // Add listener for middle-click to open in a new tab
        row.addEventListener('auxclick', function(event) {
            if (event.button === 1) { // Middle click
                window.open(submissionUrl, '_blank');
                event.preventDefault(); // Prevent default middle-click behavior
            }
        });
    });
})();
