<template>
  <div id="viewDiv" style="width:100%;height:750px"></div>
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
        css:"http://LJLHAPPY/arcgis_js_api/library/3.9/3.9/js/esri/css/esri.css"
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
        "esri/widgets/Search",
        "esri/widgets/Legend",
        "esri/rest/identify",
        "esri/rest/support/IdentifyParameters"], options).then(([
                                                                  MapImageLayer,
                                                                  Map,
                                                                  MapView,
                                                                  Graphic,
                                                                  GraphicsLayer,
                                                                  route,
                                                                  RouteParameters,
                                                                  FeatureSet, Search,Legend, identify, IdentifyParameters]) => {
        var params;

        const routeUrl =
          "https://localhost:6443/arcgis/rest/services/subway2/NAServer/Route";

        // The stops and route result will be stored in this layer
        const routeLayer = new GraphicsLayer();

        // Setup the route parameters
        const routeParams = new RouteParameters({
          // An authorization string used to access the routing service
          // apiKey: "AAPKb3d4a3b7868644599c52b95c88c007fdcvw8mYT39eJ_EegFvQXT5q0I7tWHgAi3BmWIDmRMOd5nmaqwqFrFQKXEKT7ulJ_0",
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

        const subwayline = new MapImageLayer({
          url:"https://localhost:6443/arcgis/rest/services/subwayline/MapServer"
        });

        const identifyURL =
          "https://localhost:6443/arcgis/rest/services/subwayline/MapServer";
        const map = new Map({
          basemap: "streets-navigation-vector",
          // layers: [routeLayer] // Add the route layer to the map
          layers: [subwayline,routeLayer] // Add the route layer to the map
        });


        const view = new MapView({
          container: "viewDiv", // Reference to the scene div created in step 5
          map: map, // Reference to the map object created before the scene
          center: [113.386,23.069],
          zoom: 13
        });

        //

        const legend = new Legend({
          view: view,
          layerInfos: [
            {
              layer:subwayline,
              title: "Legend"
            }
          ]
        });

        // Add widget to the bottom right corner of the view
        view.ui.add(legend, "bottom-right");
        // Adds a graphic when the user clicks the map. If 2 or more points exist, route is solved.



        // executeIdentify() is called each time the view is clicked
        view.on("click", executeIdentify);

        // Set the parameters for the identify
        params = new IdentifyParameters();
        params.tolerance = 3;
        params.layerIds = [0, 1, 2, 3, 4];
        params.layerOption = "top";
        params.width = view.width;
        params.height = view.height;


        function executeIdentify(event) {
          // Set the geometry to the location of the view click
          params.geometry = event.mapPoint;
          params.mapExtent = view.extent;
          document.getElementById("viewDiv").style.cursor = "wait";

          // This function returns a promise that resolves to an array of features
          // A custom popupTemplate is set for each feature based on the layer it
          // originates from
          identify
            .identify(identifyURL, params)
            .then(function (response) {
              const results = response.results;

              return results.map(function (result) {
                const feature = result.feature;
                const layerName = result.layerName;

                feature.attributes.layerName = layerName;
                if (layerName === "subwayPoint") {
                  feature.popupTemplate = {
                    // autocasts as new PopupTemplate()
                    title: layerName,
                    content:
                      "<b>Name:</b> {name} " +
                      "<br><b>Address:</b> {address}"
                  };
                }
                return feature;
              });
            })
            .then(showPopup); // Send the array of features to showPopup()

          // Shows the results of the identify in a popup once the promise is resolved
          function showPopup(response) {
            if (response.length > 0) {
              view.popup.open({
                features: response,
                location: event.mapPoint
              });
            }
            document.getElementById("viewDiv").style.cursor = "auto";
          }
        }

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
            route.solve(routeUrl, routeParams).then((data)=>{
              showRoute(data);
              showDirections(data);
            })
          }
        }
        // Adds the solved route to the map as a graphic
        function showRoute(data) {
          const routeResult = data.routeResults[0].route;
          routeResult.symbol = routeSymbol;
          routeLayer.add(routeResult);
        }

        function showDirections(data) {
          const directions=data.routeResults[0].directions.features;
          function showRouteDirections(directions) {
            const directionsList = document.createElement("ol");
            directions.forEach(function(result,i){
              const direction = document.createElement("li");
              direction.innerHTML = result.attributes.text + ((result.attributes.length > 0) ? " (" + result.attributes.length.toFixed(2) + " miles)" : "");
              directionsList.appendChild(direction);
            });
            directionsElement.appendChild(directionsList);
          }

          const directionsElement = document.createElement("div");
          directionsElement.innerHTML = "<h3>Directions</h3>";
          directionsElement.classList = "esri-widget esri-widget--panel esri-directions__scroller directions";
          directionsElement.style.marginTop = "0";
          directionsElement.style.padding = "0 15px";
          directionsElement.style.minHeight = "365px";

          // showRouteDirections(directions);

          // view.ui.empty("top-right");
          view.ui.add(directionsElement, {
            position:"top-right"
          });
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

.esri-popup .esri-popup-header .esri-title {
  font-size: 18px;
  font-weight: bolder;
}

.esri-popup .esri-popup-body .esri-popup-content {
  font-size: 14px;
}
</style>
