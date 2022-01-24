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
      // this.map = new Map({
      //   basemap:"streets-vector",
      // });
      //
      // this.view = new MapView({
      //   container:"viewDiv",
      //   map:this.map,
      //   zoom:3
      // })
      loadModules(["esri/Map", "esri/views/MapView"]).then(([Map,MapView]) => {
        this.map = new Map({
          basemap:"streets-vector",
        });

        this.view = new MapView({
          container:"viewDiv",
          map:this.map,
          zoom:3
        })

        console.log(this.view);
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
  padding: 0px 0px 0px 0px;
  margin: 0 0 0 0;
  height: 100%;
}
</style>
