<template>
  <div id="viewDiv" style="width:100%;height:600px"></div>
</template>

<script>
import {loadModules} from 'esri-loader';


export default {
  name: 'BaseMap',
  data () {
    return {
      map: null,
      view: null
    }
  },

  methods: {
    _createSceneView: function () {

      let options = {
        url: 'https://js.arcgis.com/4.22/',
        // css: 'https://js.arcgis.com/4.22/esri/themes/light/main.css'
        css:"https://js.arcgis.com/4.22/@arcgis/core/assets/esri/themes/light/main.css"
      };

      loadModules([
        "esri/layers/MapImageLayer",
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/rest/route",
        "esri/rest/support/RouteParameters",
        "esri/rest/support/FeatureSet",
        "esri/widgets/Search"], options).then(([
                                                 MapImageLayer,
                                                 Map,
                                                 MapView,
                                                 Graphic,
                                                 GraphicsLayer,
                                                 route,
                                                 RouteParameters,
                                                 FeatureSet, Search]) => {

        const routeUrl = //"https://localhost:6443/arcgis/rest/services/network/gznetwork/NAServer";
          "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

        // The stops and route result will be stored in this layer
        const routeLayer = new GraphicsLayer();

        // Setup the route parameters
        const routeParams = new RouteParameters({
          // An authorization string used to access the routing service
          apiKey: "AAPK7c373bb46012443ca98e6b8617d9d639z8yIy7eDExePTvYCu4VS57U4WkhlHZiui2xy1p9IKrffAXGor_x-lKIX4i3WB6Xa",
          stops: new FeatureSet(),
          outSpatialReference: {
            // autocasts as new SpatialReference()
            wkid: 3857
          }
        });

        // Define the symbology used to display the stops
        const stopSymbol = {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          style: "cross",
          size: 15,
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 4
          }
        };

        // Define the symbology used to display the route
        const routeSymbol = {
          type: "simple-line", // autocasts as SimpleLineSymbol()
          color: [0, 0, 255, 0.5],
          width: 5
        };

        const layer = new MapImageLayer({
          url:"https://localhost:6443/arcgis/rest/services/subwayall/MapServer"
        });

        const subwaypoint = new MapImageLayer({
          url:"https://localhost:6443/arcgis/rest/services/po/MapServer"
        });
        const map = new Map({
          basemap: "osm-dark-gray",
          // layers: [routeLayer] // Add the route layer to the map
          layers: [subwaypoint,layer,routeLayer] // Add the route layer to the map
        });


        const view = new MapView({
          container: "viewDiv", // Reference to the scene div created in step 5
          map: map, // Reference to the map object created before the scene
          center: [113.386,23.069],
          zoom: 19
        });

        //

        // Adds a graphic when the user clicks the map. If 2 or more points exist, route is solved.
        view.on("click", addStop);

        const searchWidget = new Search({
          view: view
        });


        // Add the search widget to the top right corner of the view
        view.ui.add(searchWidget, {
          position: "top-right"
        });

        searchWidget.on("select-name", function(event){
          console.log("The selected search result: ", event);
        });

        function addStop(event) {
          // Add a point at the location of the map click
          const stop = new Graphic({
            geometry: event.mapPoint,
            symbol: stopSymbol
          });
          routeLayer.add(stop);

          // Execute the route if 2 or more stops are input
          routeParams.stops.features.push(stop);
          if (routeParams.stops.features.length >= 2) {
            route.solve(routeUrl, routeParams).then(showRoute);
          }
        }
        // Adds the solved route to the map as a graphic
        function showRoute(data) {
          const routeResult = data.routeResults[0].route;
          routeResult.symbol = routeSymbol;
          routeLayer.add(routeResult);
        }
        // console.log(overviewMap);
      }).catch((err) =>{
        console.log(err);
      })
    }
  },
  mounted() {
    this._createSceneView();
  }
}
</script>

<style scoped>
#viewDiv {
  padding:0;
  margin: 0 0 0 0;
  height: 100%;
  width: 100%;
}
</style>
