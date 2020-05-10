define(
  	[
      "js/Map/Widget",
  		"js/ListLayer/layer",
      "js/descargarServicios",
  		"dojo/dom-attr",
      "dojo/query",
    	"dojo/domReady!"
  	], function(
      map,
  		WidgetListLayer,
      WidgetServices,
  		domAttr,
      query
  	) {
    	let listLayerHTML=[],listLayer=WidgetListLayer;
      let fuente,checkboxActive,uuid,url;
      /* Se construye la lista de capas */
      let _listContentHTML = function() {
        try {
          /* Nivel de GROUP */
          for (const group in listLayer) {
            let layers = listLayer[group].layers;
            /*** GROUP - Abre si se AGRUPA */
            if(listLayer[group].group) {
              listLayerHTML.push(`
              <li>
                <input type="checkbox" class="mostrar-menu" id="group${group}">
                <label for="group${group}" class="ampliar"></label>
                <input type="checkbox" id="groupName${group}">
                <label for="groupName${group}">${listLayer[group].name}</label>
                <p>Fuente: ${listLayer[group].source}</p>
                <ul class="nivel-02">
              `);
            }
            /* Valida si existe la propiedad GROUP */
            if(listLayer[group].hasOwnProperty('group')){
              fuente = listLayer[group].group ? `` : `<p>Fuente: ${listLayer[group].source}</p>`;
            }
            /* Nivel de LAYER */
            for (const layer in layers) {
              url = layers[layer].layer.url;
              name = layers[layer].name;
              /* Valida si existe la propiedad ACTIVE */
              if(layers[layer].hasOwnProperty('active')){
                /* Agrega la capa */
                uuid= layers[layer].active ? WidgetServices._loadServices([url,name],false):'';
                /* Se agrega el atributo 'checked' */
                checkboxActive = layers[layer].active ? `checked`: ``; 
              }
              /*let start = url.toLowerCase().indexOf('/rest/services/');
              let end = url.toLowerCase().indexOf('/mapserver', start);
              layerWMS = url.substring(start + 15, end);*/
              /* http://geoservicios.sernanp.gob.pe/arcgis/rest/services/representatividad/peru_sernanp_010201/MapServer */
              sUrl = 'http://geoservicios.sernanp.gob.pe/arcgis/services/representatividad/peru_sernanp_010201/MapServer/WMSServer?';
              sTipoServ = 'WMS',sLayer = '0',imgLegend = '<img src="' + sUrl + 'SERVICE=' + sTipoServ + '&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=' + sLayer + '&Format=image/png&SLD_Version=1.1.0&WIDTH=20&HEIGHT=20">'
              /* Estructura por LAYER */
              listLayerHTML.push(`
                  <li>  
                    <input type="checkbox" class="mostrar-menu" id="layer${group}${layer}">
                    <label for="layer${group}${layer}" class="ampliar"></label>
                    <input type="checkbox" id="layerName${group}${layer}" data-item='layer' data-uuid="${uuid}" data-url="${url}" data-name="${layers[layer].name}" ${checkboxActive}>
                    <label for="layerName${group}${layer}">${layers[layer].name}</label>
                    ${fuente}
                    <ul class="nivel-03">
                      <li><p>** Legenda en proceso ...</p></li>
                    </ul>
                  </li>
              `);
            }
            /*** GROUP - Cierra si se AGRUPA */
            if(listLayer[group].group) {
              listLayerHTML.push(`
                </ul>
              </li>
              `);
            }
          }
          domAttr.set("listLayerContent", "innerHTML", listLayerHTML.join(""));
        } catch(error) {
          console.error(`query: ${error.name} - ${error.message}.`);
        }
      }

      _listContentHTML();

      /* Activa u desactiva el LISTLAYER */
      let _activeLayer = function(id) {
        query(`.list-layer #${id} input[data-item='layer']`).on("change",function(){
          try {
            /* Verifica si CHECBOX está activo */
            if(this.checked){
              /* Verifica si UUID se tiene registrado */
              if(this.dataset.uuid == ''){
                /* En el caso de que no tenga UUID se carga el servicio */
                uuid= WidgetServices._loadServices([this.dataset.url,this.dataset.name],false);
                this.dataset.uuid = uuid;
              } else {
                /* Si tiene una UUID se muestra la capa */
                map.getLayer(this.dataset.uuid).show();
              }
            } else {
              /* Verifica si UUID se tiene registrado */
              if(this.dataset.uuid != ''){
                /* Si tiene una UUID se oculta la capa */
                map.getLayer(this.dataset.uuid).hide();
              }
            }
          } catch(error) {
            console.error(`query: ${error.name} - ${error.message}.`);
          }
        });
      }

      _activeLayer('listLayerContent');
      
      window._activeLayer = _activeLayer;

      
});