// add map to the page api arcgis for javascript 4
// Load the Map and MapView modules
require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    // import extent
    "esri/geometry/Extent",
    "esri/geometry/SpatialReference",
    // import basemap toggle
    "esri/widgets/BasemapGallery",
    // import home button
    "esri/widgets/Home",
    "esri/widgets/Expand",
    // import list layers
    "esri/widgets/LayerList",
    // import map image layer
    "esri/layers/FeatureLayer",
    // import esri request
    "esri/request"
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
    esriRequest
) {

    esriConfig.apiKey = "AAPK02cc79a406844fe490777fffb44d49a68rKns-SWWDmuWPm5YsGBAOtEgsUjWxGAU5uocOao6psinhpPaoFmelzH7lScYgrQ";

    const map = new Map({
        basemap: "arcgis-topographic" // Basemap layer service
    });

    const view = new MapView({
        map: map,
        container: "mapContainer" // Div element
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

    // create function
    function addLayer(evt) {
        // get the value of the button
        // var value = evt.target.value;
        // get value of the input text
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
                addFeature(inputText);
            }
        }, function (error) {
            console.log(error)
        })
    }

    function addFeature(url) {
        // clear all layers
        // map.removeAll();
        const flayer = new FeatureLayer({
            url: url
        });
        map.add(flayer);

        // get description of the layer by esrirequest
        esriRequest(url, {
            query: {
                f: "json"
            }
        }).then(function (response) {
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
            document.getElementsByClassName("metadataContainer")[0].innerHTML = template;
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
        var url = inputText + "/" + option;
        // add feature
        addFeature(url);
    }

    document.getElementById("searchButton").addEventListener("click", addLayer);
    document.getElementById("selectLayer").addEventListener("change", addLayerBySelectLayer);


});
