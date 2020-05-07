define(
  [
    "dojo/dom-attr",
    "dojo/domReady!"
  ], function(domAttr) {
    /* Lista de capas */
    const listLayer = [{
      name: "Johns Hopkins University",
      group: true,
      layers: [
        {
          name: "Coronavirus COVID-19 - Mundial",
          source: "Johns Hopkins University",
          layer: {
            type: "FeatureServer",
            args: [
              {
                url: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1',
                config:
                {
                  turn: false,
                  renderer: false,
                  opacity: 0.5,
                  disabledOption: false,
                  fields: ["*"]
                }
              }
            ]
          }
        }
      ]
    },{
      name: "Telemática SAC",
      group: false,
      layers: [
        {
          name: "Confirmados Perú - Lima - Callao",
          source: "Telemática SAC",
          layer: {
            type: "FeatureServer",
            args: [
              {
                url: 'https://services8.arcgis.com/2qDHoDLqu6VOlf1y/ArcGIS/rest/services/Distritos_Lima_Callao_Confirmados_COVID/FeatureServer/0',
                config:
                {
                  turn: false,
                  renderer: false,
                  opacity: 0.75,
                  disabledOption: false,
                  fields: ["*"]
                }
              }
            ]
          }
        },{
          name: "Confirmados por región - Perú",
          source: "Telemática SAC",
          layer: {
            type: "FeatureServer",
            args: [
              {
                url: 'https://services8.arcgis.com/2qDHoDLqu6VOlf1y/arcgis/rest/services/Departamentos_covid/FeatureServer/0',
                config: 
                {
                  turn: true,
                  renderer: true,
                  rendererField: 'Casos_confirmados',
                  opacity: 0.60,
                  disabledOption: false,
                  fields: ["DEPARTAMEN", "Casos_confirmados", "Casos_fallecidos"]
                }
              }
            ]
          }
        }
      ]
    },{
      name: "Aeroterra - Argentina",
      group: true,
      layers: [
        {
          name: "Confirmados por provincia",
          source: "Aeroterra",
          layer: {
            type: "FeatureServer",
            args: [
              {
                url: 'https://services.arcgis.com/K1N9k0GQ4uh0JzlT/arcgis/rest/services/Casos_Covid19/FeatureServer/0',
                config: 
                {
                  turn: true,
                  renderer: true,
                  rendererField: 'Casos',
                  opacity: 0.60,
                  disabledOption: false,
                  fields: ["Casos", "Muertes", "Recuperados", "Provincia"]
                }
              }
            ]
          }
        }
      ]
    },{
      name: "Imagem - Brasil",
      group: true,
      layers: [
        {
          name: "Confirmados por estados",
          source: "Imagem",
          layer: {
            type: "FeatureServer",
            args: [
              {
                url: 'https://services.arcgis.com/4CZwpdWHGNPLU7QQ/arcgis/rest/services/Estados_Corona_View/FeatureServer/0',
                config: {
                  turn: true,
                  renderer: true,
                  rendererField: 'Caso_Confirmado',
                  opacity: 0.60,
                  disabledOption: false,
                  fields: ["NM_ESTADO", "Caso_Confirmado"]
                }
              }
            ]
          }
        }
      ]
    },{
      name: "ESRI Chile",
      group: true,
      layers: [
        {
          name: "Confirmados por región",
          source: "ESRI Chile",
          layer: {
            type: "FeatureServer",
            args: [
              {
                url:'https://services1.arcgis.com/KM0mcPc4ZbEiA1B1/arcgis/rest/services/Mapa_COVID_19/FeatureServer/0',
                config:
                {
                  turn: true,
                  renderer: true,
                  rendererField: 'CONTAGIADO',
                  opacity: 0.60,
                  disabledOption: false,
                  fields: ["*"]
                }
              }
            ]
          }
        }
      ]
    },{
      name: "Gobierno de Bolivia",
      group: false,
      layers: [
        {
          name: "Confirmados por departamentos",
          source: "Gobierno de Bolivia",
          layer: {
            type: "FeatureServer",
            args: [
              {
                url: 'https://services7.arcgis.com/2Tnf1ndg2tSoKCCU/ArcGIS/rest/services/coronavirusBolivia/FeatureServer/0',
                config:  {
                  turn: true,
                  renderer: true,
                  rendererField: 'CONFIRMADOS',
                  opacity: 0.60,
                  disabledOption: false,
                  fields: ["*"]                
                }
              }
            ]
          }
        }
      ]
    }];
    
    let listLayerHTML = [];
    /* Se construye la lista de capas */
    let _listContentHTML = function() {
      console.log("POR GRUPO");
      /* Nivel de GROUP */
      for (const group in listLayer) {
        /*** GROUP - Abre si se AGRUPA */
        if(listLayer[group].group) {
          listLayerHTML.push('<li>');
          listLayerHTML.push(`<input type="checkbox" class="mostrar-menu" id="group${group}">`);
          listLayerHTML.push(`<label for="group${group}" class="ampliar"></label>`);
          listLayerHTML.push(`<input type="checkbox" id="groupName${group}">`);
          listLayerHTML.push(`<label for="groupName${group}">${listLayer[group].name}</label>`);
          listLayerHTML.push(`<ul class="nivel-02">`);
        }
        let layers = listLayer[group].layers;
        /* Nivel de LAYER */
        for (const layer in layers) {
          listLayerHTML.push(`<li>`);
          listLayerHTML.push(`<input type="checkbox" class="mostrar-menu" id="layer${group}${layer}">`);
          listLayerHTML.push(`<label for="layer${group}${layer}" class="ampliar"></label>`);
          listLayerHTML.push(`<input type="checkbox" id="layerName${group}${layer}">`);
          listLayerHTML.push(`<label for="layerName${group}${layer}">${layers[layer].name}</label>`);
          listLayerHTML.push(`<ul class="nivel-03">`);
          listLayerHTML.push(`  <li><p>Leyenda</p></li>`);
          listLayerHTML.push(`</ul>`);
          /* Caracteristicas del LAYER */
          /*let items = layers[layer].layer.args;
          for (const item in items) {
            listLayerHTML.push(`  <li><p>Leyenda</p></li>`);
            console.log(items[item].url);
            console.log(items[item].config.disabledOption);
            console.log(items[item].config.fields);
            console.log(items[item].config.opacity);
            console.log(items[item].config.renderer);
            console.log(items[item].config.rendererField);
            console.log(items[item].config.turn);
          }*/ 
          listLayerHTML.push(`</li>`);
        }
        /*** GROUP - Cierra si se AGRUPA */
        if(listLayer[group].group) {
          listLayerHTML.push(`</ul>`);
          listLayerHTML.push(`</li>`);
        }
      }
      domAttr.set("listLayerContent", "innerHTML", listLayerHTML.join(""));
    };
    
    _listContentHTML();

    return listLayer;
});