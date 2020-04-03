var loadLayer = [
    {
        fuente: 'Johns Hopkins University',
        name: '<strong>Coronavirus COVID-19 - Mundial</strong><br> Fuente: Johns Hopkins University',
        url: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1',
        turn: false,
        renderer: false,
        opacity: 0.5,
        disabledOption: false,
        fields: ["*"]
    }, 
    {
        fuente: 'Telemática SAC',
        name: '<strong>Confirmados Lima-Callao - Perú</strong><br> Fuente: Telemática SAC',
        url: 'https://services8.arcgis.com/2qDHoDLqu6VOlf1y/ArcGIS/rest/services/Distritos_Lima_Callao_Confirmados_COVID/FeatureServer/0',
        turn: false,
        renderer: false,
        opacity: 0.75,
        disabledOption: false,
        fields: ["*"]
    },
    {
        fuente: 'Telemática SAC',
        name: '<strong>Confirmados por región - Perú</strong><br> Fuente: Telemática SAC',
        url: 'https://services8.arcgis.com/2qDHoDLqu6VOlf1y/arcgis/rest/services/Departamentos_covid/FeatureServer/0',
        turn: true,
        renderer: true,
        rendererField: 'Casos_confirmados',
        opacity: 0.60,
        disabledOption: false,
        fields: ["DEPARTAMEN", "Casos_confirmados", "Casos_fallecidos"]
    },
    {
        fuente: 'Aeroterra',
        name: '<strong>Confirmados por provincia - Argentina</strong><br> Fuente: Aeroterra',
        url: 'https://services.arcgis.com/K1N9k0GQ4uh0JzlT/arcgis/rest/services/Casos_Covid19/FeatureServer/0',
        turn: true,
        renderer: true,
        rendererField: 'Casos',
        opacity: 0.60,
        disabledOption: false,
        fields: ["Casos", "Muertes", "Recuperados", "Provincia"]
    },
    {
        fuente: 'ESRI Chile',
        name: '<strong>Confirmados por región - Chile</strong><br> Fuente: ESRI Chile',
        url: 'https://services1.arcgis.com/KM0mcPc4ZbEiA1B1/arcgis/rest/services/Mapa_COVID_19/FeatureServer/0',
        turn: true,
        renderer: true,
        rendererField: 'CONTAGIADO',
        opacity: 0.60,
        disabledOption: false,
        fields: ["*"]
    },
    {
        fuente: 'Gobierno de Bolivia',
        name: '<strong>Confirmados por departamentos - Bolivia</strong><br> Fuente: Gobierno de Bolivia',
        url: 'https://services7.arcgis.com/2Tnf1ndg2tSoKCCU/ArcGIS/rest/services/coronavirusBolivia/FeatureServer/0',
        turn: true,
        renderer: true,
        rendererField: 'CONFIRMADOS',
        opacity: 0.60,
        disabledOption: false,
        fields: ["*"]
    },
    {
        fuente: 'Imagem',
        name: '<strong>Confirmados por estados - Brasil</strong><br> Fuente: Imagem',
        url: 'https://services.arcgis.com/4CZwpdWHGNPLU7QQ/arcgis/rest/services/Estados_Corona_View/FeatureServer/0',
        turn: true,
        renderer: true,
        rendererField: 'Casos_total',
        opacity: 0.60,
        disabledOption: false,
        fields: ["NM_ESTADO", "Casos_total"]
    }
]