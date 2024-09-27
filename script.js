import { legend } from "./script/legend.js";
import { OpacityControl } from "./script/opacityBar.js";
import { ProgressControl, updateDayPopup } from "./script/progressBar.js";
import { map } from "./script/initMap.js";
import { addWMSLayer } from "./script/renderWMSLayer.js";
import { onPopupClick } from "./script/popup.js";


// Restrict the map's maximum bounds
map.setMaxBounds([[-10, 70], [40, 150]]);

// Add a tile layer to the map (using OpenStreetMap tiles) //xix10322@nowni.com
L.tileLayer('https://maps.geoapify.com/v1/tile/osm-bright-grey/{z}/{x}/{y}.png?apiKey=a9031e75720a412b977f1eba3e6b1e33', {
    attribution: '<a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://www.openstreetmap.org/copyright" target="_blank">© OSM</a>',
    maxZoom: 10,
    minZoom: 4
}).addTo(map);

// Add the day control to the map
map.addControl(new ProgressControl());

// Add the opacity control to the map
map.addControl(new OpacityControl());

//Add the legend in the bottom right corner
legend.addTo(map);

//Add the function to render a popup when click on map
map.on('click', onPopupClick);


// Load the initial layer
addWMSLayer(1);
updateDayPopup(1);


