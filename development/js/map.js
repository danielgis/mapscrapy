require([
  "esri/map",
  "esri/config",
  "esri/dijit/BasemapGallery", 
  "esri/dijit/HomeButton",
  "esri/dijit/LocateButton",
  "esri/layers/FeatureLayer",
  "esri/dijit/Popup", 
  "esri/dijit/PopupTemplate",
  "esri/request",
  "esri/tasks/query",
  "esri/tasks/QueryTask",
  "esri/SpatialReference",
  "esri/toolbars/draw",
  "esri/graphic",
  "esri/symbols/SimpleFillSymbol",
  "esri/geometry/Extent",
  "dojo/parser",
  "dojo/dom-construct",
  // "esri/dijit/FeatureTable",
  "dijit/form/Form", 
  "dijit/layout/AccordionContainer", 
  "dijit/layout/ContentPane",
  "dojo/domReady!"
], 
  function(
    Map,
    esriConfig,
    BasemapGallery, 
    HomeButton,
    LocateButton,
    FeatureLayer,
    Popup, 
    PopupTemplate,
    esriRequest,
    Query,
    QueryTask,
    SpatialReference,
    Draw,
    Graphic,
    SimpleFillSymbol,
    Extent,
    parser,
    domConstruct,
    // FeatureTable
  ) {
  parser.parse();

  /* Map */
  let map = new Map("map", {
    center: [-75.015152,-9.1899672],
    zoom: 5,
    basemap: "osm"
  });

  /* Botón Home */
  let home = new HomeButton({
    map: map
  }, "HomeButton");
  home.startup();

  /* Geolocalización */
  let geoLocate = new LocateButton({
    map: map
  }, "LocateButton");
  geoLocate.startup();

  /* Mapa base */
  let basemapGallery = new BasemapGallery({
    showArcGISBasemaps: true,
    map: map
  }, "BasemapGallery");
  basemapGallery.startup();
  basemapGallery.on("error", function(msg) {
    console.log("basemap gallery error:  ", msg);
  });

});