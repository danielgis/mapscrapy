define(
  [
    "esri/map",
    "dojo/domReady!"
  ], function(Map) {
    /* Objeto de mapa principal */
    let map = new Map("map", {
      center: [-75.015152,-9.1899672],
      zoom: 5,
      basemap: "osm"
    });
    /* map.permisos={ estadoAgua:true } */
    return map;
});