import constant from "./utils/const.js";
import {addWMSLayer} from "./renderWMSLayer.js";
import {onChangeDay} from "./updateMap.js";

let intervalId;

// Initialize the progress bar to control day
export let ProgressControl = L.Control.extend({
    options: {
        position: 'bottomleft'
    },
    onAdd: function (map) {
        let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.border = '0px solid #000';
        container.style.display = 'flex';
        container.style.alignItems = 'center';

        let runButton = L.DomUtil.create('button', 'run-button', container);
        runButton.innerHTML = '&#9658;';
        runButton.onclick = function () {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
                runButton.innerHTML = '&#9658;';
            } else
            {
                intervalId = setInterval(function () {
                    if (progressBar.value >= 309) {
                        clearInterval(intervalId);
                        intervalId = null;
                        runButton.innerHTML = '&#9658;';
                    } else {
                        if (progressBar.value / 10 === constant.currentDay) {
                            constant.currentDay++;
                            addWMSLayer(constant.currentDay);
                            onChangeDay();
                        }
                        progressBar.value++;
                        updateDayPopup(progressBar.value);
                    }
                }, 200);
                runButton.innerHTML = '&#10074;&#10074;';
            }
        }

        let progressBar = L.DomUtil.create('progress', 'progress-bar', container);
        progressBar.id = 'dayProgress';
        progressBar.max = '309';
        progressBar.value = '0';

        // Add click event listener to progress bar
        progressBar.addEventListener('click', function (e) {
            let rect = progressBar.getBoundingClientRect();
            let offsetX = e.clientX - rect.left;
            let newValue = Math.round((offsetX / progressBar.clientWidth) * progressBar.max);
            if (constant.currentDay !== Math.floor(newValue / 10) + 1) {
                constant.currentDay = Math.floor(newValue / 10) + 1;
                onChangeDay();
                addWMSLayer(constant.currentDay);
            }
            progressBar.value = newValue;
            updateDayPopup(newValue);
        });

        // Create the popup dialog for displaying the day
        let dayPopup = L.DomUtil.create('div', 'day-popup', container);
        dayPopup.id = 'dayPopup';

        for (let i = 1; i < 32; i++) {
            let mark = L.DomUtil.create('div', 'mark', container);
            mark.innerHTML = '|';
            if (i % 5 === 1) {
                mark.innerHTML += i;
            }
            mark.style.left = `${i * 900/31.0 + 50-900/31.0}px`;
        }


        // Prevent map interactions when using the control
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);

        return container;
    }
});

// Function to update the day popup (on progress bar) position and content
export function updateDayPopup(value) {
    let progressBar = document.getElementById('dayProgress');
    let popup = document.getElementById('dayPopup');

    if (constant.currentDay < 10) popup.innerHTML = '0';
    else popup.innerHTML = '';

    popup.innerHTML += `${constant.currentDay}/01/2021`;

    let progressWidth = progressBar.clientWidth;
    let progressLeft = 10;

    let newPos = progressLeft + (progressWidth * value / progressBar.max) + (popup.clientWidth / 2);
    popup.style.left = `${newPos}px`;
}