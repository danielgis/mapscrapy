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

  var graphicAsJsonString;

  var popup = new Popup({
    titleInBody: false
  }, domConstruct.create("div"));

  var mapviewer = new Map("mapcontainer", {
    center: [-20, -0],
    zoom: 2,
    basemap: "streets-night-vector",
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

  var geoLocate = new LocateButton({
    map: mapviewer
  }, "LocateButton");
  geoLocate.startup();

  _loadLayerStartup = function (){
    var layer;

    loadLayer.forEach((layer) => {
      // layer = loadLayer[i];
        document.getElementById('urlwms').value = layer.url;
        _cargarwms(zoom=false, namelayer=layer.name, removeLayer=false, turnLayer=layer.turn)
        // setTimeout(() => {  console.log("Esperando a respuesta del servidor"); }, 10000);
    })

    // for (var i in loadLayer){
    //   layer = loadLayer[i];
    //   document.getElementById('urlwms').value = layer.url;
    //   _cargarwms(zoom=false);
    // }
  };

  _addServicesUrls = function(array){
    var innerhtml = ''
    for(var i in array){
      var r = array[i]
      var template = `<div><strong>${r.name_ins}<strong> » <a href='${r.url}' target=blank>${r.name_serv} - ${r.name_mser}</a></div><hr>`
      innerhtml = innerhtml + template
    }
    var elm = document.getElementById('agscontainer');
    elm.innerHTML = `<br>` + innerhtml;
  };

  _addServicesUrls(services);

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

  _cargarwms = async function(zoom=true, namelayer=null, removeLayer=true, turnLayer=true) {
    _showLoader(true);
    uuid = Math.random().toString(36).substring(2) + Date.now().toString(36);
    var url = document.getElementById('urlwms').value;

    // Verifica que la url ingresada sea correcta
    try {new URL(url)}
    catch(err){alert(`${urlfailed}`); _showLoader(false); return false;}

    // Verifica si el proceso de obtener datos del servidor se ejecutan correctamente
    try{var response = _getMetadata(url)}
    catch (err){alert(err); _showLoader(false); return false;}

    // Se agrega la capa al mapa
    var featureLayer = new FeatureLayer(url, {
      mode: FeatureLayer.MODE_ONDEMAND,
      outFields: ["*"],
      // inSR:102100,
      // outSR:102100,
      infoTemplate: infoTemplate,
      id: uuid
    });
    mapviewer.addLayer(featureLayer);

    if (zoom){
      _zoomToExtent(uuid);    
    }

    // Verifica que los datos retornados son correctos
    if(response.status){
      var namelyr = namelayer ? namelayer : response.value.name
      _listarwms(uuid, namelyr, url, remove=removeLayer, turn=turnLayer)
      _loadMetadata(url, response.value, uuid);
    }else{
      alert(response.message)
      _showLoader(false);
      return false
    }
    _showLoader(false);
  }

  _getMetadata = (url) => {
    var response;
    esriRequest({
      "url": url,
      "sync": true,
      "content": {
        "f": "json",
      },
      "callbackParamName": "callback"
    }).then (function(result){
      response = {
        status: true,
        value: result
      }
    }, function(error){
      response = {
        status: false,
        message: error,
      }
    });
    return response;
  };

  _loadMetadata = function(urlservice, response, uuid){
    var queryTask = new QueryTask(urlservice);
    var query = new Query();
    query.where = "1=1";
    queryTask.executeForCount(query, function(count){
      _templateMetadata(response, count, uuid);
    })

  };


  _templateMetadata = function(response, count, uuid){
      var idcontent = uuid + '_content'
      var comment = ''
      var wkid;
      switch (true){
        case 'extent' in response:
          wkid = response.extent.spatialReference.wkid;
          var ext = new Extent(response.extent)
          mapviewer.setExtent(ext, true);
          break;
        case 'sourceSpatialReference' in response:
          wkid = response.sourceSpatialReference.wkid;
          break;
      }

      template = `
                  <div id='${idcontent}'>
                  <div><strong>${nls.version}</strong></div><div>${response.currentVersion}</div><br>
                  <div><strong>${nls.name}</strong></div><div>${response.name}</div><br>
                  <div><strong>${nls.type}</strong></div><div>${response.type}</div><br>
                  <div><strong>${nls.description}</strong></div><div>${response.description}</div><br>
                  <div><strong>${nls.geometryType}</strong></div><div>${response.geometryType}</div><br>
                  <div><strong>${nls.wkid}</strong></div><div>${wkid}</div><br>
                  <div><strong>${nls.count}</strong></div><div>${count}</div><br>
                  <div><strong>${nls.maxRecordCount}</strong></div><div>${response.maxRecordCount}</div><br>
                  </div>`
      if (count < response.maxRecordCount){
        var comment = `<div  style="color: #50bda1;">${nls.commentSuccess}</div>`
      }else{
        var comment = `<div style="color: #ed6663;">${nls.commentWarning1} (${count}) ${nls.commentWarning2}(${response.maxRecordCount}) ${nls.rows}. ${nls.severalRows}<a href="${nls.docOficinalurl}" about=blank>${nls.docOficial}</a></div>`
      }

      var res = `<div id='${idcontent}'><hr>${comment}<hr>${template}</div>`

      elm = document.getElementById('metacontainer');
      elm.innerHTML = res;
      window.location.href='#formcontainer'
  }

  _zoomToExtent = function(id){
    var featureLayer = mapviewer.getLayer(id);
    var query = new Query();
    query.where = "1=1";
    query.outSpatialReference = new SpatialReference(mapviewer.extent.spatialReference.wkid);
    featureLayer.queryExtent(query, _setMapExtent);
  };

  _setMapExtent = function(response){
      var extent = response.extent;
      if (extent){
        mapviewer.setExtent(extent, true);
      }
      else{
        console.log("Zoom de capas soportado para versiones de ArcGIS Server 10.3.1 y posterior.")
      }
      _showLoader(false);
  };

  _removelayer = function(id){
    var lyr = mapviewer.getLayer(id);
    mapviewer.removeLayer(lyr);
    document.getElementById(id).remove();
    document.getElementById(id+'_content').remove();
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

  _listarwms = function(uuid, name, url, remove, turn){
    // name = response.name;
    container = document.getElementById("layerscontainer");
    select = document.getElementById("optioncontainer");
    var row = document.createElement("div");
    var opt = document.createElement("option")

    var check = turn ? 'checked' : '';
    var rmlayer = remove ? 'visible' : 'hidden';

    var str = `<div class="namelyr" onclick="_zoomToExtent('${uuid}')">${name}</div>
               <div class="turnlyr"><input type="checkbox" onclick="_toglelyr('${uuid}')" ${check}></div>
               <div class="iconlyr" onclick="_removelayer('${uuid}')" style="visibility: ${rmlayer};">
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
    // var linkcontainer = document.getElementById("linkdownloadcontainer");
    // linkcontainer.innerHTML = '';
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
  };

  document.getElementById('cargarwms').onclick = _cargarwms;
  _loadLayerStartup();
});
