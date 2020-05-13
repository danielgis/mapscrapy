require(
  [
  "js/Map/Widget",
    "js/Basemap/Widget",
    "js/descargarServicios",
    "js/ListLayer/Widget",
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
    map,
    WidgetBasemap,
    WidgetServices,
    WidgetListLayer,
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
  
    /* Home */
    let home = new HomeButton({
      map: map
    }, "HomeButton");
    home.startup();

    /* Geolocalización */
    let geoLocate = new LocateButton({
      map: map
    }, "LocateButton");
    geoLocate.startup();

    /* Basemap */
    let basemapGallery = new BasemapGallery({
      showArcGISBasemaps:true,
      map:map
    },"WidgetBasemap");
    basemapGallery.startup();

    basemapGallery.on("error",function(msg){
      try {
        console.log("basemap gallery error: ",msg);
      } catch(error) {
        console.error(`${error.name} - ${error.message}.`);
      }
    });


    /*De forma temporal se deja en esta seccion*/
      let _elementById = function (paramId) {
        try {
          let id = document.getElementById(paramId);
          if(id !== null && id !== undefined){
            return id;
          } else {
            console.log(`
              Error: ID(${paramId}) => null || undefined
            `);
          }
        } catch(error) {
          console.error(`
            _elementById: ${error.name} - ${error.message}.
          `);
        }
      };

      let _tabDesactive = function(node) {
        try {
          for (let i = 0; i < node.length; i++) {
            _elementById(node[i].id + "_TAB").style.display = "none";
          }
        } catch(error) {
          console.error(`
            _tabDesactive: ${error.name} - ${error.message}.
          `);
        }
      };

      let _tabActive = function() {
        try {
          const nodeCheckboxTabs = document.querySelectorAll(`
            .scroll-menu input[name='tabs']
          `);
          for(let i = 0; i<nodeCheckboxTabs.length; i++){
            nodeCheckboxTabs[i].addEventListener('click', function(){
              _tabDesactive(nodeCheckboxTabs);
              let id = this.id;
              _elementById(id).click();
              _elementById(id + "_TAB").style.display = "block";
              }
            );
          }
        } catch(error) {
          console.error(`
            _tabActive: ${error.name} - ${error.message}.
          `);
        }
      };

      _tabActive();

      _elementById(`Tab-1`).click();
  }
);