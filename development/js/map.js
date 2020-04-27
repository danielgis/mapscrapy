require([
  "js/descargarServicios",
  "js/configMap",
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
  //"dojo/parser",
  //"dojo/dom-construct",
  // "esri/dijit/FeatureTable",
  //"dijit/form/Form", 
  //"dijit/layout/AccordionContainer", 
  //"dijit/layout/ContentPane",
  //"dojo/domReady!"
], function(
    servicios,
    map,
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
    //parser,
    //domConstruct,
    // FeatureTable
  ) {
  
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
      console.error(`${error.name} - ${error.message}.`);
    }
  });
});