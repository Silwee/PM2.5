import {getColor} from "./utils/color.js";


export const legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    const div = L.DomUtil.create('div', 'info legend');
    const grades = [0, 25, 45, 65, 85, 105, 125, 145];
    const labels = [];
    labels.push(`<b>Nồng độ PM2.5 (µg/m³)</b>`);
    let from, to;

    for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
    }
    div.innerHTML = labels.join('<br>');
    return div;
};