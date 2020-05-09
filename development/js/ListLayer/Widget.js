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
    	let listLayerHTML = [], listLayer = WidgetListLayer, fuente, checkboxActive, uuid, url;
      /* Se construye la lista de capas */
      let _listContentHTML = function() {
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
            /* Valida si existe la propiedad ACTIVE */
            if(layers[layer].hasOwnProperty('active')){
              /* Agrega la capa */
              uuid = layers[layer].active ? WidgetServices._loadServices(url,false):'';
              /* Se agrega el atributo 'checked' */
              checkboxActive = layers[layer].active ? `checked`: ``; 
            }
            /* Estructura por LAYER */
            listLayerHTML.push(`
                <li>  
                  <input type="checkbox" class="mostrar-menu" id="layer${group}${layer}">
                  <label for="layer${group}${layer}" class="ampliar"></label>
                  <input type="checkbox" id="layerName${group}${layer}" data-uuid="${uuid}" data-url="${url}" ${checkboxActive}>
                  <label for="layerName${group}${layer}">${layers[layer].name}</label>
                  ${fuente}
                  <ul class="nivel-03">
                    <li><p>Leyenda</p></li>
                  </ul>
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
      }

      _listContentHTML();

      /* Activa u desactiva el LISTLAYER */
      query(".list-layer input[type='checkbox']").on("click", function(){
        /* Verifica si CHECBOX está activo */
        if(this.checked){
          /* Verifica si UUID se tiene registrado */
          if(this.dataset.uuid == ''){
            /* En el caso de que no tenga UUID se carga el servicio */
            this.dataset.uuid = WidgetServices._loadServices(this.dataset.url,false);
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
      });
});