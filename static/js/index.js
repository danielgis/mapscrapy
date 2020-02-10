require([
  "esri/map",
  "esri/config",
  "esri/dijit/BasemapGallery", 
  "esri/dijit/HomeButton",
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
  "dojo/parser",
  "dojo/dom-construct",
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
    parser,
    domConstruct
  ) {
  parser.parse();

  var graphicAsJsonString;

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

  _createToolbar = function(){
      var toolbar = new Draw(mapviewer);
      toolbar.on("draw-end", _addDrawToMap);
      return toolbar;
  };

  _addDrawToMap = function(evt){
    toolbar.deactivate();
    mapviewer.setInfoWindowOnClick(true);
    var symbol = new SimpleFillSymbol()
    var graphic = new Graphic(evt.geometry, symbol);
    mapviewer.graphics.add(graphic);
    mapviewer.setExtent(graphic._extent, true);
    graphicAsJsonString = graphic;
  };

  var toolbar = _createToolbar();

  var infoTemplate = new PopupTemplate({
      description: "{*}",
      title: 'Info',
    });

  _cargarwms = function() {
    _showLoader(true);
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
        // console.log(response);
        var featureLayer = new FeatureLayer(url, {
          mode: FeatureLayer.MODE_ONDEMAND,
          outFields: ["*"],
          infoTemplate: infoTemplate,
          id: uuid
        });
        mapviewer.addLayer(featureLayer);

        _zoomToExtent(uuid);
        _listarwms(uuid, response, url);
      }, 
      function(error){
        alert(error)
        _showLoader(false);
      }
    );
  };

  _zoomToExtent = function(id){
    var featureLayer = mapviewer.getLayer(id);
    var query = new Query();
    query.where = "1=1";
    query.outSpatialReference = new SpatialReference(mapviewer.extent.spatialReference.wkid);
    featureLayer.queryExtent(query, _setMapExtent);
  };

  _setMapExtent = function(response){
      var extent = response.extent;
      mapviewer.setExtent(extent, true);
      _showLoader(false);
  };

  _removelayer = function(id){
    var lyr = mapviewer.getLayer(id);
    mapviewer.removeLayer(lyr);
    document.getElementById(id).remove();
    document.getElementsByClassName(id)[0].remove();
  };

  _toglelyr = function(id){
    var checked = event.toElement.checked;
    var lyr = mapviewer.getLayer(id);
    if (checked == true){
      lyr.show();
    } else {
      lyr.hide();
    }
  };

  _listarwms = function(uuid, response, url){
    name = response.name;
    container = document.getElementById("layerscontainer");
    select = document.getElementById("optioncontainer");
    var row = document.createElement("div");
    var opt = document.createElement("option")
    var str = `<div class="namelyr" onclick="_zoomToExtent('${uuid}')">${name}</div>
               <div class="turnlyr"><input type="checkbox" onclick="_toglelyr('${uuid}')" checked></div>
               <div class="iconlyr" onclick="_removelayer('${uuid}')">
                  <i class="fa fa-minus-circle fa-lg" style="color: #eb4d55;"></i>
               </div>`;
    row.innerHTML = str;
    opt.innerHTML = name;
    row.setAttribute("id", uuid);
    row.setAttribute("class", 'rowlayer');
    opt.setAttribute("value", url);
    opt.setAttribute("class", uuid);
    container.appendChild(row);
    select.appendChild(opt);
  };

  _showLoader = function(toggle){

    if (toggle == true){
      document.getElementById("idloadercontainer").classList.add("active")
    } else {
      document.getElementById("idloadercontainer").classList.remove("active")
    }
  };

  _activateTool = function(evt){
    mapviewer.graphics.clear();
    var tool = event.target.id.toUpperCase();
    if (tool != "DELETE"){
      toolbar.activate(Draw[tool]);
      mapviewer.setInfoWindowOnClick(false);
    }else{
      toolbar.deactivate();
      mapviewer.setInfoWindowOnClick(true);
    }   
  };

  _dataDownload = function(){
    _showLoader(true);
    var linkcontainer = document.getElementById("linkdownloadcontainer");
    linkcontainer.innerHTML = '';
    var e = document.getElementById("optioncontainer");
    var urlservice = e.options[e.selectedIndex].value;

    var queryTask = new QueryTask(urlservice);

    var query = new Query();

    query.where = "1=1"
    query.geometry = graphicAsJsonString._extent;
    query.spatialRelationship = Query.SPATIAL_REL_CONTAINS;
    query.f = "geojson";
    query.outFields = ['*'];
    query.returnGeometry = true;
    query.outSpatialReference = new SpatialReference(mapviewer.extent.spatialReference.wkid)

    queryTask.execute(query, function(results){
    
    var features = results.features;
    var feature, attr, geom, src;

    switch (results.geometryType) {
      case "esriGeometryMultipoint":
        var newFeatures = []
        for (var i = 0; i < features.length; i++){
          feature = features[i]
          attr = feature.attributes
          geom = feature.geometry.points
          src = feature.geometry.spatialReference
          for(var r = 0; r < geom.length; r++){
              var row = {
                geometry: {
                  x: geom[0][0], 
                  y: geom[0][1], 
                  spatialReference: src
                }, 
                attributes: attr
              };
              newFeatures.push(row)
            }
          }
        features = newFeatures;
        results.geometryType = 'esriGeometryPoint';
        break;
      case "esriGeometryMultiLine":
        break;
      case "esriGeometryMultipolygon":
        break;
    };

    switch (results.geometryType) {
      case 'esriGeometryPoint':
        var validFeatures = [];
        for (var i = 0; i < features.length; i++) {
          feature = features[i];
          if(graphicAsJsonString.geometry.contains(feature.geometry)){
                validFeatures.push(feature);
              }
        }
        results.features = validFeatures;
        break;
    };



    // console.log(results.features);

    var url = 'https://ogre.adc4gis.com/convertJson'
    var data = new FormData();
    data.append('json', JSON.stringify(results));
    // data.append('outputName', `response.zip`);

    _serviceRequests(url=url, data=data)
    .then(response => response.blob())
    .then(function(myBlob) {
      const filename = 'response.zip';
      const link = document.createElement('a');
      var linkdownload = URL.createObjectURL(myBlob);
      // linkcontainer.innerHTML = `<a href="${linkdownload}" download="${filename}" target="_blank">Link de descarga</a>`;
      link.target = '_blank';
      link.setAttribute("type", "hidden");
      link.setAttribute("download", filename);
      link.setAttribute("href", linkdownload);
      document.body.appendChild(link);
      link.click();
      _showLoader(false);
    });
    // console.log(results.features);
  });
  };



  _serviceRequests = async function(url='', data={}){
    try {
      const response = await fetch(url, {
        // mode: 'no-cors',
        method: 'POST',
        body: data
      });
      return await response;
    } catch(e) {
      alert(e);
      _showLoader(false);
    }

  };

  _closeModal = function(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  document.getElementById('cargarwms').onclick = _cargarwms;
});