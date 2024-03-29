// add map to the page api arcgis for javascript 4
// Load the Map and MapView modules
// import global variables

var _SERVICEURL = ''
var _NAME_SERVICE = ''
var _FEATURE_LAYER = ''

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/geometry/Extent",
    "esri/geometry/SpatialReference",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Home",
    "esri/widgets/Expand",
    "esri/widgets/LayerList",
    "esri/layers/FeatureLayer",
    "esri/request",
    "esri/widgets/Sketch",
    "esri/layers/GraphicsLayer",
    "esri/rest/support/Query",
    "esri/rest/query",
    "esri/geometry/Polygon",
    "./config.js"
], function (
    esriConfig,
    Map,
    MapView,
    Extent,
    SpatialReference,
    BasemapGallery,
    Home,
    Expand,
    LayerList,
    FeatureLayer,
    esriRequest,
    Sketch,
    GraphicsLayer,
    Query,
    query,
    Polygon,
    config
) {

    let basemaptitle = 'Topographic';
    function _() {
        const r = new XMLHttpRequest();
        r.open('GET', `${config.__}/getApiKey`, false);
        r.send();

        if (r.status === 200) {
            return r.responseText;
        }
        throw new Error(r.status);
    }


    esriConfig.apiKey = _();

    const graphicsLayer = new GraphicsLayer();

    const map = new Map({
        basemap: "arcgis-topographic", // Basemap layer service
        layers: [graphicsLayer]
    });

    const view = new MapView({
        map: map,
        container: "mapContainer", // Div element
        // spatialReference: {
        //     wkid: config._WKID_CRS
        // },
    });

    // Add a basemap toggle widget to toggle between basemaps
    const basemapGallery = new BasemapGallery({
        view: view
    });
    const expandForBasemaps = new Expand({
        view: view,
        content: basemapGallery,
        expanded: false
    });

    view.ui.add([expandForBasemaps], "top-right");

    // add list layers widget to toggle between layers
    const layerList = new LayerList({
        view: view
    });
    const expandForLayers = new Expand({
        view: view,
        content: layerList,
        expanded: false
    });

    view.ui.add([expandForLayers], "top-right");

    navigator.geolocation.getCurrentPosition(function (position) {
        // Extrae las coordenadas de la ubicación
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        console.log(latitude, longitude)

        // Crea un objeto de extensión
        var extent = new Extent(
            longitude - 1,
            latitude - 1,
            longitude + 1,
            latitude + 1,
            new SpatialReference({ wkid: 4326 }));

        // Aplica el zoom al mapa
        view.extent = extent;
        // Add a home button to return the view to the intial extent
        const homeBtn = new Home({
            view: view
        });
        view.ui.add(homeBtn, "top-left");
    });

    // Crear el widget de dibujo
    const sketch = new Sketch({
        view: view,
        container: document.createElement("div"),
        layer: graphicsLayer,
        creationMode: "single"
    });

    // Agregar el widget de dibujo al view
    // view.ui.add(sketch, "top-right");

    const rectangleBtn = document.getElementById("drawRectangle");
    const freehandBtn = document.getElementById("drawFreehand");
    const circleBtn = document.getElementById("drawCircle");
    const clearBtn = document.getElementById("drawClear");

    sketch.on("create", function (event) {
        // Si el usuario está creando o actualizando el gráfico, realiza la consulta
        if (event.state === "active") {
            queryFeatureWithingPolygon(event.graphic.geometry);
        }
    });

    // Manejar los eventos de click en los botones
    rectangleBtn.addEventListener("click", function () {
        removeAllGraphics();
        sketch.create("rectangle");
    });

    freehandBtn.addEventListener("click", function () {
        removeAllGraphics();
        sketch.create("polygon");
    });

    circleBtn.addEventListener("click", function () {
        removeAllGraphics();
        sketch.create("circle");
    });

    clearBtn.addEventListener("click", removeAllGraphics);

    function removeAllGraphics() {
        graphicsLayer.removeAll();
        document.getElementById("countFeatures").innerHTML = `<p id="countFeaturesId">0</p><p>reg</p>`;
    }

    function queryFeatureWithingPolygon(polygon) {
        // Configurar la consulta
        var query = _FEATURE_LAYER.createQuery();
        query.geometry = polygon;  // Buscar solo entidades dentro del polígono
        query.spatialRelationship = "intersects";  // Buscar entidades que se intersecten con el polígono

        // Ejecutar la consulta
        _FEATURE_LAYER.queryFeatures(query)
            .then(function (results) {
                // Mostrar la cantidad de entidades en algún lugar en la aplicación
                // console.log(results.features.length);
                document.getElementById("countFeatures").innerHTML = `<p id="countFeaturesId">${results.features.length}</p><p>reg</p>`;
            })
            .catch(function (error) {
                console.error("Error al realizar la consulta: ", error);
            });
    }

    // create function
    function addLayer(evt) {
        _SERVICEURL = ''
        var inputText = document.getElementById("search").value;
        // check if the value is empty
        if (inputText === "") {
            alert("Please enter a value");
            return
        }

        try {
            var url = new URL(inputText);
        } catch (_) {
            alert("Please enter a valid URL");
            return
        }

        // get description of the layer by esrirequest
        esriRequest(url, {
            query: {
                f: "json"
            }
        }).then(function (response) {
            // if property response.data.layer exist
            if (response.data.hasOwnProperty("layers")) {
                // add active class to div by class
                document.querySelector(".containerLayers").classList.add("active");

                // add lista layers to select
                var select = document.getElementById("selectLayer");
                // remove all options
                select.innerHTML = "";
                // add option to select
                response.data.layers.forEach(function (layer) {
                    var option = document.createElement("option");
                    option.text = layer.name;
                    option.value = layer.id;
                    select.add(option);
                })
            } else {
                _SERVICEURL = inputText;
                addFeature(inputText);
            }
        }, function (error) {
            console.log(error)
        })
    }

    function addFeature(url) {
        // clear all layers
        // map.removeAll();
        _FEATURE_LAYER = new FeatureLayer({
            url: url,
        });
        map.add(_FEATURE_LAYER);

        // hacer zoom al layer
        _FEATURE_LAYER.when(function () {
            view.goTo(_FEATURE_LAYER.fullExtent);
        });


        map.reorder(_FEATURE_LAYER, graphicsLayer);

        // get description of the layer by esrirequest
        esriRequest(url, {
            query: {
                f: "json"
            }
        }).then(function (response) {
            _NAME_SERVICE = response.data.name
            config._WKID_CRS = response.data.extent.spatialReference.wkid
            // add data to metadata container
            template = `<div id="metadataLayer">
                        <div><strong>Versión:</strong> ${response.data.currentVersion}</div>
                        <div><strong>Nombre:</strong> ${response.data.name}</div>
                        <div><strong>Tipo:</strong> ${response.data.type}</div>
                        <div><strong>Descripción:</strong> ${response.data.description}</div>
                        <div><strong>Tipo de geometria:</strong> ${response.data.geometryType}</div>
                        <div><strong>Sistema de Referencia:</strong> ${response.data.extent.spatialReference.wkid}</div>
                        <div><strong>Cantidad de registros habilitados para descarga:</strong> ${response.data.maxRecordCount}</div>
                        </div>`
            document.getElementById("metadata").innerHTML = template;
        }, function (error) {
            console.log(error)
        })
    }

    function addLayerBySelectLayer(evt) {
        // gget option selected onchange
        var option = evt.target.value;
        // get value of the input text
        var inputText = document.getElementById("search").value;
        // build url
        _SERVICEURL = inputText + "/" + option;

        // add feature
        addFeature(_SERVICEURL);
    }

    function ToggleBaseMap(evt) {
        if (basemaptitle == "Topographic") {
            map.basemap = "arcgis-streets-night";
            basemaptitle = "StreetsNight";
        }
        else if (basemaptitle == "StreetsNight") {
            map.basemap = "arcgis-topographic";
            basemaptitle = "Topographic";
        }
    }

    function toggleEsriBaseMapbyTime() {
        var date = new Date();
        var hour = date.getHours();
        var body = document.body;

        if (hour >= 19 || hour < 6) {
            if (basemaptitle == "Topographic") {
                ToggleBaseMap();

            } else {
                if (basemaptitle == "StreetsNight") {
                    ToggleBaseMap();
                }
            }
        }
    }

    function showLoader() {
        var overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
    }

    function hideLoader() {
        var overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
    }

    // add event listener to button
    function downloadShapefile(evt) {
        // show loader
        showLoader();

        let urlDownload = _SERVICEURL

        let queryObject = new Query();
        queryObject.where = '1=1';
        queryObject.outFields = '*';
        queryObject.returnGeometry = true;
        queryObject.geometryType = "esriGeometryPolygon";
        queryObject.outSpatialReference = new SpatialReference({ wkid: config._WKID_CRS });
        if (graphicsLayer.graphics.items.length > 0) {
            let geojson = graphicsLayer.graphics.items[0].geometry.toJSON()
            queryObject.geometry = new Polygon(geojson)
            queryObject.spatialRelationship = "esriSpatialRelIntersects";
        }

        query.executeQueryJSON(urlDownload, queryObject)
            .then(response => {
                return ArcgisToGeojsonUtils.arcgisToGeoJSON(response);
            })
            .then(function (geojson) {
                console.log(geojson)
                _NAME_SERVICE = _NAME_SERVICE.replace(/\s+/g, '_').trim().replace(/[^a-zA-Z]/g, '')
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        geojson: geojson,
                        filename: _NAME_SERVICE,
                        crs: config._WKID_CRS
                    })
                };
                // console.log(requestOptions.body)
                return fetch(`${config.__}/convert`, requestOptions)
            })
            .then(function (response) {
                return response.blob();
            }).then(function (blob) {
                hideLoader();
                // Crear un enlace de descarga
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = `${_NAME_SERVICE}.zip`;
                downloadLink.click();
            }).catch(error => {
                hideLoader();
                alert('Error:', error)
            })
    }

    document.getElementById("searchButton").addEventListener("click", addLayer);
    document.getElementById("selectLayer").addEventListener("change", addLayerBySelectLayer);
    document.getElementById("downloadButton").addEventListener("click", downloadShapefile);
    document.getElementById("checkbox").addEventListener("change", ToggleBaseMap)
    window.addEventListener("load", toggleEsriBaseMapbyTime);
});
