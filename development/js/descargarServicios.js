define(
  [
    "js/configMap",
    "esri/request",
    "esri/layers/FeatureLayer",
    "dojo/on",
    "dojo/dom",
    "dojo/domReady!"
  ], function(
    map,
    esriRequest,
    FeatureLayer,
    on,
    dom,
  ){
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
      }
      catch(error) {
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
          let uuid = Math.random().toString(36).substring(2) + Date.now().toString(36);
          let layerUrl = txtServicio.value;
          /* Valida URL */
          new URL(layerUrl);
          /* Layer REQUEST */
          let layersRequest = esriRequest({
            "url"               : layerUrl,
            "sync"              : true,
            "content"           : { "f": "json" },
            "callbackParamName" : "callback"
          });

          layersRequest.then(
            function(response) {
              /* return { status: true, value: result } */
              // Se agrega la capa al mapa
              let featureLayer = new FeatureLayer(layerUrl, {
                mode      : FeatureLayer.MODE_ONDEMAND,
                outFields : ["*"],
                inSR      : 102100,
                outSR     : 102100,
                id        : `lyr${uuid}`
              });
              /* FALTA AGREGAR EL JS */
              map.addLayer(featureLayer);
              /* Lista de capas */
              console.log(map._layers);

              console.log("Success: ", response.name);


            },
            function(error) {
              console.log("Error: ", error.message);
              /* return { status:false, value:result } */
            }
          );

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
      }
      catch(error) {
        console.error(`${error.name} - ${error.message}.`);
      }
    });

    on(btnDescargar,"click",function(evt) {
      try {
        console.log("Le dio click en DESCARGAR");
      }
      catch(error) {
        console.error(`${error.name} - ${error.message}.`);
      }
    });
   
});
