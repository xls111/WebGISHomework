<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"> </router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.fullPath;
    }
  }
}
</script>

<style scoped>
/*.app-main {*/
/*  position: absolute;*/
/*  top: 50px;*/
/*  left: 210px;*/
/*  bottom: 0px;*/
/*  right: 0px;  !* 距离右边0像素 *!*/
/*  padding: 10px;*/
/*  overflow-y: auto; !* 当内容过多时y轴出现滚动条 *!*/
/*  !* background-color: red; *!*/
/*}*/
.app-main{
  position:relative;
  left:0;
  right:5px;
  padding: 1px 5px 1px 1px;
  bottom:0;
  min-height:calc(100% - 60px);
}
</style>
