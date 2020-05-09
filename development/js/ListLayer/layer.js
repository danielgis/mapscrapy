define(
  [
    "dojo/dom-attr",
    "dojo/domReady!"
  ], function(domAttr) {
    /* Lista de capas */
    const listLayer = [{
      name: "Johns Hopkins University",
      source: "Johns Hopkins University",
      group: true,
      layers: [
        {
          active: true,
          name: "Coronavirus COVID-19 - Mundial",
          layer: {
            type: "FeatureServer",
            url: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1',
            args: 
              { turn: false,
                renderer: false,
                opacity: 0.5,
                disabledOption: false,
                fields: ["*"]                
              }
            
          }
        }
      ]
    },{
      name: "Telemática SAC",
      source: "Telemática SAC",
      group: false,
      layers: [
        {
          active: true,
          name: "Confirmados Perú - Lima - Callao",
          layer: {
            type: "FeatureServer",
            url: 'https://services8.arcgis.com/2qDHoDLqu6VOlf1y/ArcGIS/rest/services/Distritos_Lima_Callao_Confirmados_COVID/FeatureServer/0',
            args: 
              {
                turn: false,
                renderer: false,
                opacity: 0.75,
                disabledOption: false,
                fields: ["*"]
              }
            
          }
        },{
          name: "Confirmados por región - Perú",
          layer: {
            type: "FeatureServer",
            url: 'https://services8.arcgis.com/2qDHoDLqu6VOlf1y/arcgis/rest/services/Departamentos_covid/FeatureServer/0',
            args: 
              {
                turn: true,
                renderer: true,
                rendererField: 'Casos_confirmados',
                opacity: 0.60,
                disabledOption: false,
                fields: ["DEPARTAMEN", "Casos_confirmados", "Casos_fallecidos"] 
              }
            
          }
        }
      ]
    },{
      name: "Aeroterra - Argentina",
      source: "Aeroterra",
      group: true,
      layers: [
        {
          active: true,
          name: "Confirmados por provincia",
          layer: {
            type: "FeatureServer",
            url: 'https://services.arcgis.com/K1N9k0GQ4uh0JzlT/arcgis/rest/services/Casos_Covid19/FeatureServer/0',
            args: 
              {
                turn: true,
                renderer: true,
                rendererField: 'Casos',
                opacity: 0.60,
                disabledOption: false,
                fields: ["Casos", "Muertes", "Recuperados", "Provincia"] 
              }
            
          }
        }
      ]
    },{
      name: "Imagem - Brasil",
      source: "Imagem",
      group: true,
      layers: [
        {
          name: "Confirmados por estados",
          layer: {
            type: "FeatureServer",
            url: 'https://services.arcgis.com/4CZwpdWHGNPLU7QQ/arcgis/rest/services/Estados_Corona_View/FeatureServer/0',
            args:
              {                
                turn: true,
                renderer: true,
                rendererField: 'Caso_Confirmado',
                opacity: 0.60,
                disabledOption: false,
                fields: ["NM_ESTADO", "Caso_Confirmado"] 
              }
            
          }
        }
      ]
    },{
      name: "ESRI Chile",
      source: "ESRI Chile",
      group: true,
      layers: [
        {
          active: true,
          name: "Confirmados por región",
          layer: {
            type: "FeatureServer",
            url:'https://services1.arcgis.com/KM0mcPc4ZbEiA1B1/arcgis/rest/services/Mapa_COVID_19/FeatureServer/0',
            args:
              {                
                turn: true,
                renderer: true,
                rendererField: 'CONTAGIADO',
                opacity: 0.60,
                disabledOption: false,
                fields: ["*"]
              }
          }
        }
      ]
    },{
      name: "Gobierno de Bolivia",
      source: "Gobierno de Bolivia",
      group: false,
      layers: [
        {
          name: "Confirmados por departamentos",
          layer: {
            type: "FeatureServer",
            url: 'https://services7.arcgis.com/2Tnf1ndg2tSoKCCU/ArcGIS/rest/services/coronavirusBolivia/FeatureServer/0',
            args:
              {
                turn: true,
                renderer: true,
                rendererField: 'CONFIRMADOS',
                opacity: 0.60,
                disabledOption: false,
                fields: ["*"]                
              }
          }
        }
      ]
    }];
    
    return listLayer;
});