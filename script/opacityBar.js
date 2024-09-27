import constant from "./utils/const.js";

// Initialize the opacity control
export let OpacityControl = L.Control.extend({
    options: {
        position: 'topright'
    },
    onAdd: function (map) {
        let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'white';
        container.style.padding = '10px';
        container.style.borderRadius = '5px';
        container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';

        let label = L.DomUtil.create('label', '', container);
        label.innerHTML = 'Opacity:';
        label.style.marginBottom = '5px';

        let opacitySlider = L.DomUtil.create('input', '', container);
        opacitySlider.type = 'range';
        opacitySlider.min = '0.4';
        opacitySlider.max = '0.8';
        opacitySlider.step = '0.01';
        opacitySlider.value = '1';
        opacitySlider.oninput = function () {
            if (constant.currentLayer) {
                constant.currentOpacity = this.value;
                constant.currentLayer.setOpacity(this.value);
            }
        };

        // Prevent map interactions when using the control
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);

        return container;
    }
});