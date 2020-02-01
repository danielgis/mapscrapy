require([
  "esri/map", 
  "esri/dijit/BasemapGallery", 
  "esri/dijit/HomeButton",
  "esri/layers/FeatureLayer",
  "esri/dijit/Popup", 
  "esri/dijit/PopupTemplate",
  "esri/request",
  "dojo/parser",
  "dojo/dom-construct",
  "dijit/form/Form", 
  "dijit/layout/AccordionContainer", 
  "dijit/layout/ContentPane", 
  "dojo/domReady!"
], 
  function(
    Map, 
    BasemapGallery, 
    HomeButton,
    FeatureLayer,
    Popup, 
    PopupTemplate,
    esriRequest,
    parser,
    domConstruct
  ) {
    parser.parse();

  var popup = new Popup({
    titleInBody: false
  }, domConstruct.create("div"));

  var mapviewer = new Map("mapcontainer", {
    center: [-75, -9],
    zoom: 6,
    basemap: "satellite",
    infoWindow: popup
  });

  var basemapGallery = new BasemapGallery({
          showArcGISBasemaps: true,
          map: mapviewer
        }, "bascontainer");
        basemapGallery.startup();

  var home = new HomeButton({
    map: mapviewer
  }, "HomeButton");
  home.startup();
        
        // basemapGallery.on("error", function(msg) {
        //   console.log("basemap gallery error:  ", msg);
        // });

  var infoTemplate = new PopupTemplate({
      description: "{*}",
      title: 'Info',
    });

  _cargarwms = function() {
    uuid = Math.random().toString(36).substring(2) + Date.now().toString(36);
    var url = document.getElementById('urlwms').value;

    var requestHandle = esriRequest({
      "url": url,
      "content": {
        "f": "json"
      },
      "callbackParamName": "callback"
    });
    requestHandle.then(
      function(response){
        var featureLayer = new FeatureLayer(url, {
          mode: FeatureLayer.MODE_ONDEMAND,
          outFields: ["*"],
          infoTemplate: infoTemplate,
          id: uuid
        });
        mapviewer.addLayer(featureLayer);
        _listarwms(uuid, response);
        // console.log(response);
      }, 
      function(error){
        alert(error)
      }
    );

  };

  _removelayer = function(){
    var id = event.target.parentElement.attributes.value.value
    var lyr = mapviewer.getLayer(id)
    mapviewer.removeLayer(lyr);
    document.getElementById(id).remove();
  }

  _listarwms = function(uuid, response){
    name = response.name;
    container = document.getElementById("layerscontainer");
    var row = document.createElement("div");
    var str = `<div class="namelyr">${name}</div>
               <div value=${uuid} class="icono" onclick="_removelayer()"><i class="fa fa-minus-circle" style="color: red;"></i></div>`;
    row.innerHTML = str;
    row.setAttribute("id", uuid);
    row.setAttribute("class", 'rowlayer');
    container.appendChild(row);
  }

  document.getElementById('cargarwms').onclick = _cargarwms;

});