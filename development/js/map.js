require([
  "js/descargarServicios",
  "esri/map",
  //"esri/config",
  "esri/dijit/BasemapGallery", 
  "esri/dijit/HomeButton",
  "esri/dijit/LocateButton",
  //"esri/layers/FeatureLayer",
  //"esri/dijit/Popup", 
  //"esri/dijit/PopupTemplate",
  //"esri/request",
  //"esri/tasks/query",
  //"esri/tasks/QueryTask",
  //"esri/SpatialReference",
  //"esri/toolbars/draw",
  //"esri/graphic",
  //"esri/symbols/SimpleFillSymbol",
  //"esri/geometry/Extent",
  "dojo/on",/*HDRamosMendoza*/
  "dojo/dom",/*HDRamosMendoza*/
  //"dojo/parser",
  //"dojo/dom-construct",
  // "esri/dijit/FeatureTable",
  //"dijit/form/Form", 
  //"dijit/layout/AccordionContainer", 
  //"dijit/layout/ContentPane",
  //"dojo/domReady!"
], 
  function(
    servicios,
    Map,
    //esriConfig,
    BasemapGallery, 
    HomeButton,
    LocateButton,
    //FeatureLayer,
    //Popup, 
    //PopupTemplate,
    //esriRequest,
    //Query,
    //QueryTask,
    //SpatialReference,
    //Draw,
    //Graphic,
    //SimpleFillSymbol,
    //Extent,
    on,/*HDRamosMendoza*/
    dom,/*HDRamosMendoza*/
    //parser,
    //domConstruct,
    // FeatureTable
  ) {
  
  /* Map */
  let map = new Map("map", {
    center: [-75.015152,-9.1899672],
    zoom: 5,
    basemap: "osm"
  });
  
  /* BUTTON - Botón Home */
  let home = new HomeButton({
    map: map
  }, "HomeButton");
  home.startup();

  /* BUTTON - Geolocalización */
  let geoLocate = new LocateButton({
    map: map
  }, "LocateButton");
  geoLocate.startup();
  
  /* WIDGET - Basemap */
  let basemapGallery = new BasemapGallery({
    showArcGISBasemaps: true, map: map
  }, "BasemapGallery");
  basemapGallery.startup();
  basemapGallery.on("error", function(msg) {
    try {
      console.log("basemap gallery error:  ", msg);
    }
    catch(error) {
      console.error(`${error.name} : ${error.message}.`);
    }
  });

});