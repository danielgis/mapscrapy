define(
  [
    "js/Map/Widget",
    "esri/request",
    "esri/tasks/query",
    "esri/SpatialReference",
    "esri/layers/FeatureLayer",
    "esri/dijit/PopupTemplate",
    "esri/geometry/Extent",
    "dojo/dom-attr",
    "dojo/on",
    "dojo/dom",
    "dojo/domReady!"
  ], function(
    map,
    esriRequest,
    Query,
    SpatialReference,
    FeatureLayer,
    PopupTemplate,
    Extent,
    domAttr,
    on,
    dom
  ){
    let _showLoader = function(toggle){
      try {
        if (toggle == true){
          console.log("ADD ACTIVE");
          /*document.getElementById("idloadercontainer").classList.add("active")*/
        } else {
          console.log("REMOVE ACTIVE");
          /*document.getElementById("idloadercontainer").classList.remove("active")*/
        }
      } catch(error) {
        console.error(`_showLoader: ${error.name} - ${error.message}.`);
      }
    };

    let _setMapExtent = function(response){
      try {
        let queryExtent = new Extent(response);
        if (queryExtent){
          map.setExtent(queryExtent,true);
        }
        else{
          /* MEJORAR VENTANA DE ERROR / ADVERTENCIA / MENSAJE */
          console.log(`
            Zoom de capas soportado para versiones 
            de ArcGIS Server 10.3.1 y posterior.
          `);
        }
        //_showLoader(false);
      } catch(error) {
        console.error(`_setMapExtent: ${error.name} - ${error.message}.`);
      }
    };
    let abc = function(){
      console.log("SE ESTA CARGANDO");
    }
    let listLayerHTML=[];
    let _loadServices = function(layerUrl,zoom=true){
      try{
        
        let [url,name] = layerUrl;
        /* GIT CARGA - LOAD */
        let uuid = Math.random()
                    .toString(36)
                    .substring(2) + Date.now().toString(36);
        /* Valida URL */
        new URL(url);
        /* Layer REQUEST */
        let layersRequest = esriRequest({
          "url"               : url,
          "sync"              : false,
          "content"           : {"f":"json"},
          "callbackParamName" : "callback"
        });
        layersRequest.then(
          function(response){
            /* Valida el nombre si tiene contenido */
            name = name=='' ? response.name:name;
            /* Se agrega la capa al mapa */
            let featureLayer = new FeatureLayer(url, {
              mode         : FeatureLayer.MODE_ONDEMAND,
              outFields    : ["*"],
              id           : uuid,
              inSR         : 102100,
              outSR        : 102100,              
              opacity      : 1,
              infoTemplate : new PopupTemplate({
                title       : `<center>${name}</center>`,
                description : "{*}"
              })
            });
            /* FALTA AGREGAR EL JS */
            map.addLayer(featureLayer);
            if(zoom) {
              /* Acercamiento de layers capa por EXTENT */
              _setMapExtent(response.extent);
              /* METADATA - Falta contruir el HTML */
              let metadata = map._layers[uuid];
              metadata.on("load",function(){
                console.log(`version: ${metadata.version}`);
                console.log(`name: ${metadata.name}`);
                console.log(`type: ${metadata.type}`);
                console.log(`description: ${metadata.description}`);
                console.log(`geometryType: ${metadata.geometryType}`);
                console.log(`wkid: ${metadata.spatialReference.wkid}`);
                console.log(`latestWkid: ${metadata.spatialReference.latestWkid}`);
                setTimeout (function() {
                  /* Preguntar a DANIEL si conoce otra forma del evento LOAD */
                  console.log(`count: ${metadata.graphics.length}`);
                }, 3000);
                console.log(`maxRecordCount: ${metadata.maxRecordCount}`);
              });


              /*Se agrega LAYER */
              listLayerHTML.push(`
                  <li>  
                    <input type="checkbox" class="mostrar-menu" id="layer${uuid}">
                    <label for="layer${uuid}" class="ampliar"></label>
                    <input type="checkbox" id="layerName${uuid}" data-item='layer' data-uuid="${uuid}" data-url="${url}" data-name="${name}" onclick="window._activeLayer('listLayerDynamic')" checked>
                    <label for="layerName${uuid}">${name}</label>
                    <p>Fuente: ${name}</p>
                    <ul class="nivel-03">
                      <li><p>** Legenda en proceso ...</p></li>
                    </ul>
                  </li>
              `);

              domAttr.set("listLayerDynamic", "innerHTML", listLayerHTML.join(""));

            }
            /* GIT CARGA - REMOVE */
          },
          function(error) {
            /* GIT CARGA - REMOVE */
            console.log("Error: ", error.message);
          }
        );
        return uuid;
      } catch(error) {
        if (error instanceof TypeError) {
          console.error(`${error.name} - ${error.message}.`);
        } else {
          throw error;
          console.error(`${error.name} - ${error.message}.`);
        }
      }
    };

    /* Acciones de SERVICIOS */
    const cboTipo     = dom.byId("ID_Tipo"),
          txtServicio = dom.byId("ID_Servicio"),
          btnLimpiar  = dom.byId("ID_Limpiar"),
          btnCargar   = dom.byId("ID_Cargar");

    /* Limpiar formulario */
    on(btnLimpiar,"click",function(evt) {
      try {
        cboTipo.value = "";
        txtServicio.value = "";
      } catch(error) {
        console.error(`${error.name} - ${error.message}.`);
      }
    });

    /* Cargar servicio al mapa */
    on(btnCargar,"click",function(evt) {
      try {
        if(cboTipo.value.length > 0 && cboTipo.value != "") {
          console.log(cboTipo.value);
        } else {
          /* Evento que PINTE DE COLOR EL SELECT y letras rojas */
          console.log("INGRESE TIPO");
        }

        if(txtServicio.value.length > 0 && txtServicio.value != "") {
          /* Cargar datos */
          _loadServices([txtServicio.value,'']);
        } else {
          /* Evento que PINTE DE COLOR EL INPUT y letras rojas */
          console.log("INGRESE SERVICIO"); 
        }
      } catch(error) {
        if (error instanceof TypeError) {
          console.error(`${error.name} - ${error.message}.`);
        } else {
          throw error;
          console.error(`${error.name} - ${error.message}.`);
        }
      }
    });

    //
    const btnBorrar     = dom.byId("ID_Borrar"),
          btnDescargar  = dom.byId("ID_Descargar");

    on(btnBorrar,"click",function(evt) {
      try {
        console.log("Le dio click en BORRAR");
      } catch(error) {
        console.error(`${error.name} - ${error.message}.`);
      }
    });

    on(btnDescargar,"click",function(evt) {
      try {
        console.log("Le dio click en DESCARGAR");
      } catch(error) {
        console.error(`${error.name} - ${error.message}.`);
      }
    });

    return {
      _loadServices: function(paramURL, booleanZOOM){
        /*
          paramURL: Es la URL del servicios.
          booleanZOOM: Por defecto es TRUE en caso de quieras hacer ZOOM.
          Llamado de func. 
            * _listContentHTML('https:....'). Carga la capa y hace ZOOM(por defecto booleanZOOM = true) a la capa cargada.
            * _listContentHTML('https:....'), false). Carga la capa pero no realiza un ZOOM por el usar 'false'.
        */
        return _loadServices(paramURL, booleanZOOM);
      }
    };

   
});
