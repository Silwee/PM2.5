import constant from "./utils/const.js";
import {popup} from "./popup.js";
import {getColor} from "./utils/color.js";

//When the day change from progress bar, update the popup content
export async function onChangeDay() {
    if(popup.isOpen()) {
        if(popup.getContent().includes('br')) {
            let currentLat = popup.getLatLng().lat;
            let currentLng = popup.getLatLng().lng;

            const response = await fetch("http://localhost:8000/" + constant.currentDay + "/" + currentLng + "/" + currentLat);
            const json = await response.json();
            const pointValue = parseFloat(json.pointValue).toFixed(2);

            currentLat = currentLat.toFixed(2);
            currentLng = currentLng.toFixed(2);

            let content = [];

            await updatePopupValue(content, currentLat, currentLng, pointValue);

            popup.setContent(content.join(`<br>`));

        }
    }
}

export async function updatePopupValue(content, currentLat, currentLng, pointValue) {

    if (!isNaN(pointValue) && pointValue !== '0.000') {
        //Address from geoapify (may need another apikey)
        const res = await fetch("https://api.geoapify.com/v1/geocode/reverse?lat=" + currentLat + "&lon=" + currentLng + "&apiKey=a9031e75720a412b977f1eba3e6b1e33");
        const data = await res.json();
        const address = data.features[0].properties.formatted;
        content.push(`<b>${address.substring(0, address.length - 9)}</b>`);

        //Color of the PM2.5 value
        content.push(`<i style="background:${getColor(pointValue + 1)}"> ${pointValue}</i>`);

        //Current day
        let day = '';
        if (constant.currentDay < 10) day = '0';
        day += `${constant.currentDay}/01/2021`;
        content.push(day);

        content.push(currentLat + "°N, " + currentLng + "°E");
    }
}