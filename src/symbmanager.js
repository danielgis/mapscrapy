require([
    "esri/Color",
    "esri/renderers/ClassBreaksRenderer",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "dojo/domReady!"
], function(
    Color,
    ClassBreaksRenderer,
    SimpleFillSymbol,
    SimpleMarkerSymbol
) {

    _COVID19_AREACOLOR = '#80FF0000';
    _COVID19_OUTLINECOLOR = '#FF0000';
    _COVID19_MAXVALUE = 1000;
    _COVID19_MINVALUE = 1;


    _simbolPolygonToCentroidSize = function(
        rendererField,
        areaColor = _COVID19_AREACOLOR,
        outlineColor = _COVID19_OUTLINECOLOR,
        maxValue = _COVID19_MAXVALUE,
        minValue = _COVID19_MINVALUE) {

        var renderer = new ClassBreaksRenderer();
        renderer.attributeField = rendererField;

        var markerSymbol = new SimpleMarkerSymbol();
        markerSymbol.setColor(new Color(areaColor));
        markerSymbol.outline.setColor(new Color(outlineColor));

        renderer.addBreak({
            minValue: minValue,
            maxValue: maxValue,
            symbol: markerSymbol
        });

        renderer.setVisualVariables([{
            type: "sizeInfo",
            field: rendererField,
            minDataValue: 1,
            maxDataValue: 1000,
            minSize: 10,
            maxSize: 50
        }, ]);

        return renderer;

    };

})