// Define the bounds
let initBounds = [[5, 100], [25, 120]];

// Initialize the map and fit it to the specified bounds
export let map = L.map('map', {
    maxZoom: 9,
    minZoom: 5,
}).fitBounds(initBounds);



