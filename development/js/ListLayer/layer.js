define(
  [
    "dojo/domReady!"
  ], function(Map) {
    /* Lista de capas */
    const listLayer = [{
      group: "Johns Hopkins University",
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
      group: "Telemática SAC",
      layers: [
        {
          name: "Confirmados Lima-Callao - Perú",
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
      group: "Aeroterra",
      layers: [
        {
          name: "Confirmados por provincia - Argentina",
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
      group: "Imagem",
      layers: [
        {
          name: "Confirmados por estados - Brasil",
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
      group: "ESRI Chile",
      layers: [
        {
          name: "Confirmados por región - Chile",
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
      group: "Gobierno de Bolivia",
      layers: [
        {
          name: "Confirmados por departamentos - Bolivia",
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
    
    /* Se construye la lista de capas */
    let _listContentHTML = function(group = true) {
      if(group){
        console.log("POR GRUPO");
        /* Nivel de GROUP */
        for (const group in listLayer) {
          /* Nivel de LAYER */
          let layers = listLayer[group].layers;
          for (const layer in layers) {
            console.log(layers[layer]);
            console.log(layers[layer].name);
            console.log(layers[layer].source);
            console.log(layers[layer].layer.type);
            let items = layers[layer].layer.args;
            /* Caracteristicas del LAYER */
            for (const item in items) {
              console.log(" - - - - - - - ");
              console.log(items[item].url);
              console.log(items[item].config.disabledOption);
              console.log(items[item].config.fields);
              console.log(items[item].config.opacity);
              console.log(items[item].config.renderer);
              console.log(items[item].config.rendererField);
              console.log(items[item].config.turn);
              console.log(" - - - - - - - ");
            }
          }
        }
      } else {
        console.log("POR ITEM");
        /* Nivel de GROUP */
        for (const group in listLayer) {
          console.log(listLayer[group].group);
          /* Nivel de LAYER */
          let layers = listLayer[group].layers;
          for (const layer in layers) {
            console.log(layers[layer]);
            console.log(layers[layer].name);
            console.log(layers[layer].source);
            console.log(layers[layer].layer.type);
            let items = layers[layer].layer.args;
            /* Caracteristicas del LAYER */
            for (const item in items) {
              console.log(" - - - - - - - ");
              console.log(items[item].url);
              console.log(items[item].config.disabledOption);
              console.log(items[item].config.fields);
              console.log(items[item].config.opacity);
              console.log(items[item].config.renderer);
              console.log(items[item].config.rendererField);
              console.log(items[item].config.turn);
              console.log(" - - - - - - - ");
            }
          }
        }
      }
    };
    //_listContentHTML(false);  

    return listLayer;
});