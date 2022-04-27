// per funzionare al meglio, questa MIN_DISTANCE dovrebbe essere la stessa specificata
// nel file HTML in gps-camera: minDistance.
// inoltre dovrebbe essere sempre uguale o maggiore della minima distanza fra due diversi posti
//il javascript non si aggiorna, questa riga serve solo per farsì che si aggiorni aiuto
const MIN_DISTANCE = 50;

var closestEntity = null;
var entitiesAdded = null;

const MAX_NUMBER_MARKERS = 10;   // not limiting, for now
const TIME_TO_UPDATE = 30;    // in seconds

// Calculate distance between two positions (with latitude and longitude fields)
function computeDistance(position1, position2) {
    var dlongitude = THREE.Math.degToRad(parseFloat(position1.longitude) - parseFloat(position2.longitude));
    var dlatitude = THREE.Math.degToRad(parseFloat(position1.latitude) - parseFloat(position2.latitude));

    var a = (Math.sin(dlatitude / 2) * Math.sin(dlatitude / 2)) + Math.cos(THREE.Math.degToRad(position2.latitude)) * Math.cos(THREE.Math.degToRad(position1.latitude)) * (Math.sin(dlongitude / 2) * Math.sin(dlongitude / 2));
    var angle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = angle * 6378160;

    if (distance < 0) {
        distance = distance * -1;
    }
    return distance.toFixed(0);
}

// Return true if two positions are different of at least 'range' meters
function isPositionDifferentOfRange(position1, position2, range) {
    const distance = computeDistance(position1, position2);
    return distance > range;
}

// find N closest places from origin, given places, origin and N
function findClosestPlaces(origin, places, N) {
    places = places.map((place) => {
        const distance = computeDistance(origin, place);
        place.distance = distance;
        return place;
    })

    const orderedPlaces = places.sort((a, b) => {
        return a.distance - b.distance;
    });

    const arrayToReturn = orderedPlaces.slice(0, N);

    arrayToReturn.forEach((place, index) => {
        console.debug(`Rendered place #${index + 1} is ${place.fullname}, with distance=${place.distance} meters`)
    });

    return arrayToReturn;
}

window.onload = () => {
    window.panel = document.querySelector('.detail-panel');
    window.img = document.querySelector('.footer-button img');

    window.titleElem = document.querySelector('.footer-place-title');
    window.distanceElem = document.querySelector('.footer-place-distance');
    window.descriptionElem = document.querySelector('.detail-description');
    window.detailTitle = document.querySelector('.detail-title');
    window.detailDistanceElem = document.querySelector('.detail-distance');
    window.detailAddressElem = document.querySelector('.detail-address');

    // every TIME_TO_UPDATE seconds, fetch other markers
    setInterval(() => {
        if (window.currentPosition && window.places) {
            const places = findClosestPlaces(window.currentPosition, window.places, MAX_NUMBER_MARKERS);
            renderPlaces(places);
            setClosestPlaceOnFooter();
            updatePanelData();
        }
    }, TIME_TO_UPDATE * 1000);

    fetch('./data/places.json')
        .then(response => response.json())
        .then((res) => {
            console.log(res)
            const parsedPlaces = res.map((place) => {
                const luogo = {
                    ...place.properties,
                    latitude: place.properties.LAT,
                    longitude: place.properties.LON,
                };
                return luogo;
            });

            console.debug('Total places found: ', parsedPlaces.length);
            return elaboratePlaces(parsedPlaces);
        });
    // open pdf when button open-pdf is clicked
    document.querySelector('.pdf_opener').addEventListener('click', function() {
        var pidieffe = `./data/${window.closestPlace.link}`;
        window.open(pidieffe);
    });

    // open detail panel on footer click
    document.querySelector('.footer-button').addEventListener('click', function() {
        if (!window.closestPlace) {
            return;
        }

        // show panel if not already opened
        if (!window.openPanel) {
            document.querySelector(".footer-button").style.transform = "rotate(180deg)";
            window.openPanel = true;
            window.panel.classList.add('opened');
            updatePanelData();
        } else {
            closePanel()
        }
    });
};


function closePanel() {
    // if already opened, hide panel
    document.querySelector(".footer-button").style.transform = "rotate(0deg)";
    window.openPanel = false;
    window.panel.classList.remove('opened');

    // update footer data
    setTimeout(() => {
        window.titleElem.innerText = window.closestPlace && (window.closestPlace.indirizzo || '');
        window.distanceElem.innerText = window.closestPlace && (window.closestPlace.distanceMsg || '');
    }, 100);
}

function updatePanelData() {
    const places = [...document.querySelectorAll('[gps-entity-place]')];
    const rows = [...document.querySelectorAll('.detail-panel .detail-more')];

    for (let i = 0; i < places.length; i++) {
        if (places[i].getAttribute('indirizzo')) {
            rows[i].querySelector('.detail-address').innerText = places[i].getAttribute('indirizzo');
        }
        if (places[i].getAttribute('distanceMsg')) {
            rows[i].querySelector('.detail-distance').innerText = places[i].getAttribute('distanceMsg');
        }
        
    }
}

function elaboratePlaces(places) {
    window.places = places;

    var entitiesAdded = 0;
    window.addEventListener('gps-entity-place-added', () => {
        entitiesAdded++;
        console.log(entitiesAdded, places.length)
        if (entitiesAdded === places.length) {
            // all entities are added to the DOM, app is ready
            window.closeLoader = true;  // to close loader after first gps-camera-update-position event
        }
    });

    const firstTimeRenderListener = function(ev) {
        // get the closest place
        window.closestPlace = findClosestPlaces(ev.detail.position, places, 1)[0];

        const closestDistance = window.closestPlace.distance;
        let closestDistanceMsg;

        if (closestDistance >= 1000) {
            closestDistanceMsg = (closestDistance / 1000) + ' km';
        } else {
            closestDistanceMsg = closestDistance + ' m';
        }

        window.closestPlace.distanceMsg = closestDistanceMsg;
        // now we have set the first closestPlace, and we add to the footer and panelData info
        setClosestPlaceOnFooter();
        updatePanelData();

        places = findClosestPlaces(ev.detail.position, window.places, MAX_NUMBER_MARKERS);

        console.debug('Places to be rendered: ', places.length);

        renderPlaces(places);

        window.removeEventListener('gps-camera-update-position', firstTimeRenderListener);
    };

    window.addEventListener('gps-camera-update-position', firstTimeRenderListener);

    window.addEventListener('gps-camera-update-position', (ev) => {
        window.currentPosition = ev.detail.position;
    });
}

function handleNearObject(entity, distance) {
    // se non c'è già una entity sotto MIN_DISTANCE...
    var button=document.querySelector('.pdf_opener');
    if (!closestEntity) {
        if (distance < MIN_DISTANCE) {
            // TODO mostrare qualcosa
            console.log('ce un luogo molto vicino, < N');
            button.style.display = "block";
            // settiamo l'entity più vicina, che verrà rimossa quando la stessa entity sarà
            // ad una distanza >  MIN_DISTANCE
            closestEntity = entity;
            closestEntity.distance = distance;
        }
    } else {
        // c'è già ed è un nuovo luogo
        if (closestEntity !== entity && distance < closestEntity.distance && distance < MIN_DISTANCE) {
            // TODO rimuovo quello attuale

            // TODO creo quello nuovo
            closestEntity = entity;
            closestEntity.distance = distance;
            return;
        }

        // c'è già, è quella corrente ma ora si trova più distante di MIN_DISTANCE
        if (closestEntity === entity && distance >= MIN_DISTANCE) {
            // TODO rimuovo quello attuale
            button.style.display = "none";
            console.log("ti prego funziona");
            closestEntity = null;
        }
    }
}


function renderPlaces(places) {
    const scene = document.querySelector('a-scene');

    // first remove all entities
    [...document.querySelectorAll('[gps-entity-place]')].forEach((el) => el.parentNode.removeChild(el));

    places.forEach((place) => {
        const latitude = place.latitude;
        const longitude = place.longitude;

        const entity = renderModel(place, latitude, longitude, scene);

        // listen for every place changing of position
        entity.addEventListener('gps-entity-place-update-positon', () => {
            if (window.closeLoader) {
                document.querySelector('.loader').remove();
                window.closeLoader = false;
            }

            // update distance on markers
            const text = entity.querySelector('[text]');
            const distance = parseFloat(entity.getAttribute('distance'));
            const distanceMsg = cleanDistanceMsg(entity.getAttribute('distanceMsg'));
            text.setAttribute('text', 'value', distanceMsg);

            // if needed, update window.closestPlace
            if ((distance < window.closestPlace.distance) && place.id !== window.closestPlace.id) {
                window.closestPlace.distance = distance;
                window.closestPlace = place;
                window.closestPlace.distanceMsg = distanceMsg;
            }

            // update window.closestPlace distance, anyway
            if (place.id === window.closestPlace.id) {
                window.closestPlace.distance = distance;
                window.closestPlace.distanceMsg = distanceMsg;
            }

            // set updated distances (and in case, place name) on UI
            setClosestPlaceOnFooter();
            updatePanelData();

            handleNearObject(entity, distance);
        });
    });
}

function cleanDistanceMsg(distanceMsg) {
    distanceMsg = distanceMsg.replace(' meters', ' m');
    distanceMsg = distanceMsg.replace('kilometers', 'km');
    return distanceMsg;
}

function setClosestPlaceOnFooter() {
    if (!window.openPanel) {
        window.titleElem.innerText = window.closestPlace.indirizzo;
        window.distanceElem.innerText = window.closestPlace.distanceMsg;
    }
}

function chooseColoredMarker(markerEl) {
    // TODO Change

    // switch (place.category) {
    //     case 'canali':
    //         markerEl.setAttribute('src', './assets/marker-blu.svg');
    //         break;
    //     case 'giardini':
    //         markerEl.setAttribute('src', './assets/marker-verde.svg');
    //         break;
    //     default:
    //         markerEl.setAttribute('src', './assets/marker-rosso.svg');
    //         break;
    // }
}

function renderModel(place, latitude, longitude, scene) {
    const entity = document.createElement('a-entity');
    entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    entity.setAttribute('look-at', '[gps-camera]');
    entity.setAttribute('scale', '20 20 20');
    entity.setAttribute('id', place.id);
    entity.setAttribute('indirizzo', place.indirizzo);

    const markerEl = document.createElement('a-image');

    // if needed
    // chooseColoredMarker(markerEl);

    markerEl.setAttribute('src', 'marker.png');

    entity.appendChild(markerEl);

    // add text for distance in meters
    const textEl = document.createElement('a-entity');
    textEl.setAttribute('text', {
        color: '#FCAE1E',
        align: 'center',
        width: 4,
    });

    textEl.setAttribute('position', '0 -0.75 0');
    entity.appendChild(textEl);
    scene.appendChild(entity);

    return entity;
}

window.addEventListener('load', () => {
    const simulate = (latitude, longitude) => {
        const camera = document.querySelector('[gps-camera]');
        camera.setAttribute('gps-camera', 'simulateLatitude', latitude);
        camera.setAttribute('gps-camera', 'simulateLongitude', longitude);
        window.currentPosition = { latitude, longitude };
        camera.components['gps-camera'].update();
        const places = findClosestPlaces(window.currentPosition, window.places, MAX_NUMBER_MARKERS);
        renderPlaces(places);
        setClosestPlaceOnFooter();
        updatePanelData();
    };

    document.querySelector('#simulate-near').addEventListener('click', () => {
        simulate(45.19455851225413, 11.305583781066739);
    });

    document.querySelector('#simulate').addEventListener('click', () => {
        simulate(45.182938, 11.305825);
    });
});

