import {map} from "./initMap.js";
import constant from "./utils/const.js";
import {updatePopupValue} from "./updateMap.js";


// Marker show value on click
export let popup;

export async function onPopupClick(e) {
    if (popup) {
        map.removeLayer(popup);
    }

    const response = await fetch("http://localhost:8000/" + constant.currentDay + "/" + e.latlng.lng + "/" + e.latlng.lat);
    const json = await response.json();
    const pointValue = parseFloat(json.pointValue).toFixed(2);

    const currentLat = e.latlng.lat.toFixed(2);
    const currentLng = e.latlng.lng.toFixed(2);

    let content = [];

    await updatePopupValue(content, currentLat, currentLng, pointValue);

    popup = new L.popup()
        .setLatLng(e.latlng)
        .setContent(content.join(`<br>`))
        .openOn(map);
}



