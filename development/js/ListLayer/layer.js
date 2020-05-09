define(
  [
    "dojo/dom-attr",
    "dojo/domReady!"
  ], function(domAttr) {
    /* Lista de capas */
    const listLayer = [{
      name: "Coronavirus COVID-19",
      source: "Johns Hopkins University",
      group: false,
      layers: [
        {
          active: true,
          name: "Coronavirus COVID-19 - Mundial",
          layer: {
            type: "FeatureServer",
            url: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1',
            args: 
              { 
                fields: ["*"]                
              }
            
          }
        }
      ]
    },{
      name: "Telemática SAC",
      source: "Telemática SAC - Perú",
      group: false,
      layers: [
        {
          active: true,
          name: "Confirmados Lima - Callao",
          layer: {
            type: "FeatureServer",
            url: 'https://services8.arcgis.com/2qDHoDLqu6VOlf1y/ArcGIS/rest/services/Distritos_Lima_Callao_Confirmados_COVID/FeatureServer/0',
            args: 
              {
                fields: ["*"]
              }
          }
        },{
          active: false,
          name: "Confirmados por región",
          layer: {
            type: "FeatureServer",
            url: 'https://services8.arcgis.com/2qDHoDLqu6VOlf1y/arcgis/rest/services/Departamentos_covid/FeatureServer/0',
            args: 
              {
                fields: ["DEPARTAMEN", "Casos_confirmados", "Casos_fallecidos"] 
              }
            
          }
        }
      ]
    },{
      name: "Aeroterra",
      source: "Aeroterra - Argentina",
      group: false,
      layers: [
        {
          active: true,
          name: "Confirmados por provincia",
          layer: {
            type: "FeatureServer",
            url: 'https://services.arcgis.com/K1N9k0GQ4uh0JzlT/arcgis/rest/services/Casos_Covid19/FeatureServer/0',
            args: 
              {
                fields: ["Casos", "Muertes", "Recuperados", "Provincia"] 
              }
            
          }
        }
      ]
    },{
      name: "Imagem",
      source: "Brasil",
      group: false,
      layers: [
        {
          active: false,
          name: "Confirmados por estados",
          layer: {
            type: "FeatureServer",
            url: 'https://services.arcgis.com/4CZwpdWHGNPLU7QQ/arcgis/rest/services/Estados_Corona_View/FeatureServer/0',
            args:
              {  
                fields: ["NM_ESTADO", "Caso_Confirmado"] 
              }
            
          }
        }
      ]
    },{
      name: "Región",
      source: "ESRI Chile",
      group: false,
      layers: [
        {
          active: false,
          name: "Confirmados por región",
          layer: {
            type: "FeatureServer",
            url:'https://services1.arcgis.com/KM0mcPc4ZbEiA1B1/arcgis/rest/services/Mapa_COVID_19/FeatureServer/0',
            args:
              {
                fields: ["*"]
              }
          }
        }
      ]
    },{
      name: "Departamentos",
      source: "Gobierno de Bolivia",
      group: false,
      layers: [
        {
          active: false,
          name: "Confirmados por departamentos",
          layer: {
            type: "FeatureServer",
            url: 'https://services7.arcgis.com/2Tnf1ndg2tSoKCCU/ArcGIS/rest/services/coronavirusBolivia/FeatureServer/0',
            args:
              {
                rerField: 'CONFIRMADOS',
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