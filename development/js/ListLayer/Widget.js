define(
  	[
  		"js/ListLayer/layer",
      "js/descargarServicios",
  		"dojo/dom-attr",
    	"dojo/domReady!"
  	], function(
  		WidgetListLayer,
      WidgetServices,
  		domAttr
  	) {
      console.log(WidgetServices);
    	let listLayerHTML = [], listLayer = WidgetListLayer, fuente, checkboxActive, uuid;
      /* Se construye la lista de capas */
      let _listContentHTML = function() {
        /* Nivel de GROUP */
        for (const group in listLayer) {
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

          let layers = listLayer[group].layers;
          /* Nivel de LAYER */
          for (const layer in layers) {
            /* Valida si existe la propiedad ACTIVE */
            if(layers[layer].hasOwnProperty('active')){
              /* Agrega la capa */
              layers[layer].active ? WidgetServices._loadServices(layers[layer].layer.url,false):'';
              /* Se agrega el atributo 'checked' */
              checkboxActive = layers[layer].active ? `checked`: ``;
            }
            /* Estructura por LAYER */
            listLayerHTML.push(`
                <li>  
                  <input type="checkbox" class="mostrar-menu" id="layer${group}${layer}">
                  <label for="layer${group}${layer}" class="ampliar"></label>
                  <input type="checkbox" id="layerName${group}${layer}" ${checkboxActive}>
                  <label for="layerName${group}${layer}">${layers[layer].name}</label>
                  ${fuente}
                  <ul class="nivel-03">
                    <li><p>Leyenda</p></li>
                  </ul>
            `);
            
            /* Caracteristicas del LAYER */
            //let items = layers[layer].layer.args;
            /*
            for (const item in items) {
              listLayerHTML.push(`  <li><p>Leyenda</p></li>`);
              
              if(layers[layer].hasOwnProperty('active')){
                WidgetServices._loadServices(items[item].url,false);
              }
              
              console.log(items[item].url);
              console.log(items[item].config.disabledOption);
              console.log(items[item].config.fields);
              console.log(items[item].config.opacity);
              console.log(items[item].config.renderer);
              console.log(items[item].config.rendererField);
              console.log(items[item].config.turn);
            }*/
            /*listLayerHTML.push(`</li>`);*/
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
});