var loadLayer = [
    {
        fuente: 'Johns Hopkins University',
        name: '<strong>Coronavirus COVID-19</strong><br> Fuente: Johns Hopkins University',
        url: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1',
        turn: true,
        renderer: false,
        opacity: 0.5,
        disabledOption: false,
    }, 
    {
        fuente: 'Telemática SAC',
        name: '<strong>Confirmados Lima-Callao</strong><br> Fuente: Telemática SAC',
        url: 'https://services8.arcgis.com/2qDHoDLqu6VOlf1y/ArcGIS/rest/services/Distritos_Lima_Callao_Confirmados_COVID/FeatureServer/0',
        turn: true,
        renderer: false,
        opacity: 0.75,
        disabledOption: false,
    },
    {
        fuente: 'Telemática SAC',
        name: '<strong>Confirmados por región</strong><br> Fuente: Telemática SAC',
        url: 'https://services8.arcgis.com/2qDHoDLqu6VOlf1y/arcgis/rest/services/Departamentos_covid/FeatureServer/0',
        turn: true,
        renderer: true,
        rendererField: 'Casos_confirmados',
        opacity: 0.60,
        disabledOption: false,
    }
]