<template>
  <div class="loader">
    <div
      ref="load"
      :style="{
        width: width,
        height: height,
        overflow: 'hidden',
        margin: '0px auto',
      }"
    ></div>
  </div>
</template>

<script>
import lottie from "lottie-web";
const load = () => import("@/lottie/loading/loading.json");
export default {
  data() {
    return {
      load: null,
      height: "281px",
      width: "500px",
    };
  },
  mounted() {
    var that = this;
    load().then(function (data) {
      that.load = lottie.loadAnimation({
        container: that.$refs.load,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: data,
      });
    });
  },
};
</script>

<style scoped lang="scss">
.loader {
  width: 100%;
  height: calc(100vh - 40px);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 300px;
    height: 300px;
    user-select: none;
  }
}
</style>


