<template>
  <div class="mapdiv"></div>
</template>

<script>
import {loadModules} from 'esri-loader';

export default {
  name: 'WebMap',
  async mounted() {
    loadModules(["esri/WebMap", "esri/views/MapView", "esri/widgets/Bookmarks", "esri/widgets/Expand"]).then(([WebMap, MapView, Bookmarks, Expand]) => {
      const webmap = new WebMap({
        portalItem: {
          id: "aa1d3f80270146208328cf66d022e09c",
        },
      });
      const view = new MapView({
        // https://v3.vuejs.org/api/instance-properties.html#el
        container: this.$el,
        map: webmap,
      });
      const bookmarks = new Bookmarks({
        view: view,
        // allows bookmarks to be added, edited, or deleted
        editingEnabled: true,
      });
      const bkExpand = new Expand({
        view: view,
        content: bookmarks,
        expanded: true,
      });
      // Add the widget to the top-right corner of the view
      view.ui.add(bkExpand, "top-right");
      // bonus - how many bookmarks in the webmap?
      webmap.when(function () {
        if (webmap.bookmarks && webmap.bookmarks.length) {
          console.log("Bookmarks: ", webmap.bookmarks.length);
        } else {
          console.log("No bookmarks in this webmap.");
        }
      });
    })
  }
}
</script>

<style scoped>
@import 'https://js.arcgis.com/4.22/@arcgis/core/assets/esri/themes/light/main.css';

.mapdiv {
  padding: 0;
  margin: 0;
  height: 100%;
}
</style>
