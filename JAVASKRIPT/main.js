var map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://basemap.biip.lt/styles/positron/style.json', // style URL
    center: [25.25, 54.70], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(new maplibregl.NavigationControl({
    visualizePitch: true,
    visualizeRoll: true,
    showZoom: true,
    showCompass: true
}));

map.on('load', async () => {
    // Add an image to use as a custom marker
    const image = await map.loadImage('https://maplibre.org/maplibre-gl-js/docs/assets/osgeo-logo.png');
    map.addImage('custom-marker', image.data);
    // Add a GeoJSON source with 15 points
    map.addSource('conferences', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [25.25, 54.70]
                    },
                    'properties': {'year': '2004'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [6.6523, 46.5535]
                    },
                    'properties': {'year': '2006'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-123.3596, 48.4268]
                    },
                    'properties': {'year': '2007'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [18.4264, -33.9224]
                    },
                    'properties': {'year': '2008'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [151.195, -33.8552]
                    },
                    'properties': {'year': '2009'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [2.1404, 41.3925]
                    },
                    'properties': {'year': '2010'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-104.8548, 39.7644]
                    },
                    'properties': {'year': '2011'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-1.1665, 52.9539]
                    },
                    'properties': {'year': '2013'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-122.6544, 45.5428]
                    },
                    'properties': {'year': '2014'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [126.974, 37.5651]
                    },
                    'properties': {'year': '2015'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [7.1112, 50.7255]
                    },
                    'properties': {'year': '2016'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-71.0314, 42.3539]
                    },
                    'properties': {'year': '2017'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [39.2794, -6.8173]
                    },
                    'properties': {'year': '2018'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [26.0961, 44.4379]
                    },
                    'properties': {'year': '2019'}
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-114.0879, 51.0279]
                    },
                    'properties': {'year': '2020'}
                }
            ]
        }
    });

    // Add a symbol layer
    map.addLayer({
        'id': 'conferences',
        'type': 'symbol',
        'source': 'conferences',
        'layout': {
            'icon-image': 'custom-marker',
            
            'text-offset': [0, 1.25],
            'text-anchor': 'top'
        }
    });
});