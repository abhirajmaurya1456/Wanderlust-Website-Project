        mapboxgl.accessToken = mapToken;
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/standard',
            center: [longitude, latitude], // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 8 // starting zoom
        });

  const marker1 = new mapboxgl.Marker({ color: 'red', rotation: 0})
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4>${locationListed}</h4><p>Exact location will be provided after booking!</p>`))
        .addTo(map);