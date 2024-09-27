import constant from "./utils/const.js";
import { map } from "./initMap.js";

// Function to add WMS layer from GeoServer based on the selected day
export function addWMSLayer(day) {

    //Set layer name the same as the layer name on geoserver
    let layerName = 'test:Jan' + (day < 10 ? '0' + day : day);

    if (constant.currentLayer) {
        map.removeLayer(constant.currentLayer);
    }

    //Fetch the layer on geoserver
    constant.currentLayer = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
        layers: layerName,
        format: 'image/png',
        transparent: true,
        styles: 'custom_style',
        tileSize: 128,
        // tiled: false,
        // attribution: '© GeoServer'
    }).addTo(map);

    constant.currentLayer.setOpacity(constant.currentOpacity);
}