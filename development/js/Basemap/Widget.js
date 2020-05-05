define(
  [
    "js/Map/Widget",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./Widget.html",
    "dojo/domReady!"
  ], function(
    map,
    declare,
    lang,
    _WidgetBase,
    _TemplatedMixin,
    template
  ){
    /* WIDGET - Basemap */
    return declare("WidgetBasemap",[_WidgetBase,_TemplatedMixin], {
      templateString: template,
      constructor: function(option,srcRefNode){
        console.log("constructor - BASEMAP");
        this.domNode = srcRefNode;
      },

      postCreate: function(){
        console.log("postCreate - BASEMAP");
        this.inherited(arguments);
        
      },

      startup: function(){
        console.log(template);
        console.log("startup - BASEMAP");
        /*
        var basemapGallery = new BasemapGallery({
          showArcGISBasemaps:true,
          map:map
        },"BasemapGallery");
        basemapGallery.startup();

        basemapGallery.on("error",function(msg){
          try {
            console.log("basemap gallery error: ",msg);
          } catch(error) {
            console.error(`${error.name} - ${error.message}.`);
          }
        });
        */

      },

      destroy: function(){
        console.log("destroy - BASEMAP");

      },

      myMethod: function(){
        return 1;
      }

    });    
});