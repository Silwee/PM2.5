// get color depending on population density value
export function getColor(d) {
    return d > 145 ? '#d53e4f' :
        d > 125  ? '#f46d43' :
            d > 105  ? '#fdae61' :
                d > 85  ? '#fee08b' :
                    d > 65  ? '#e6f598' :
                        d > 45  ? '#abdda4' :
                            d > 25   ? '#66c2a5' : '#3288bd';
}