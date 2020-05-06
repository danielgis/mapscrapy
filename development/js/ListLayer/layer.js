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
          layer: {
            type: "FeatureServer",
            args: [
              'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1',
              {
                turn: false,
                renderer: false,
                opacity: 0.5,
                disabledOption: false,
                fields: ["*"]
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
          layer: {
            type: "FeatureServer",
            args: [
              'https://services8.arcgis.com/2qDHoDLqu6VOlf1y/ArcGIS/rest/services/Distritos_Lima_Callao_Confirmados_COVID/FeatureServer/0',
              {
                turn: false,
                renderer: false,
                opacity: 0.75,
                disabledOption: false,
                fields: ["*"]
              }
            ]
          }
        },{
          name: "Confirmados por región - Perú",
          layer: {
            type: "FeatureServer",
            args: [
              'https://services8.arcgis.com/2qDHoDLqu6VOlf1y/arcgis/rest/services/Departamentos_covid/FeatureServer/0',
              {
                turn: true,
                renderer: true,
                rendererField: 'Casos_confirmados',
                opacity: 0.60,
                disabledOption: false,
                fields: ["DEPARTAMEN", "Casos_confirmados", "Casos_fallecidos"]
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
          layer: {
            type: "FeatureServer",
            args: [
              'https://services.arcgis.com/K1N9k0GQ4uh0JzlT/arcgis/rest/services/Casos_Covid19/FeatureServer/0',
              {
                turn: true,
                renderer: true,
                rendererField: 'Casos',
                opacity: 0.60,
                disabledOption: false,
                fields: ["Casos", "Muertes", "Recuperados", "Provincia"]
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
          layer: {
            type: "FeatureServer",
            args: [
              'https://services.arcgis.com/4CZwpdWHGNPLU7QQ/arcgis/rest/services/Estados_Corona_View/FeatureServer/0',
              {
                turn: true,
                renderer: true,
                rendererField: 'Caso_Confirmado',
                opacity: 0.60,
                disabledOption: false,
                fields: ["NM_ESTADO", "Caso_Confirmado"]
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
          layer: {
            type: "FeatureServer",
            args: [
              'https://services1.arcgis.com/KM0mcPc4ZbEiA1B1/arcgis/rest/services/Mapa_COVID_19/FeatureServer/0',
              {
                turn: true,
                renderer: true,
                rendererField: 'CONTAGIADO',
                opacity: 0.60,
                disabledOption: false,
                fields: ["*"]
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
          layer: {
            type: "FeatureServer",
            args: [
              'https://services7.arcgis.com/2Tnf1ndg2tSoKCCU/ArcGIS/rest/services/coronavirusBolivia/FeatureServer/0',
              {
                turn: true,
                renderer: true,
                rendererField: 'CONFIRMADOS',
                opacity: 0.60,
                disabledOption: false,
                fields: ["*"]                
              }
            ]
          }
        }
      ]
    }];
    return listLayer;
});