<template>
  <link rel="shortcut icon" href="images/logo.png" />
  <link rel="apple-touch-icon-precomposed" href="images/logo.png" />
  <!-- Font -->
  <link rel="stylesheet" href="fonts/fonts.css" />
  <!-- Icons -->
  <link rel="stylesheet" href="fonts/icons-alipay.css?update=4" />
  <link rel="stylesheet" href="styles/bootstrap.css" />

  <link rel="stylesheet" type="text/css" href="styles/styles.css?update=4" />
  <link
    rel="manifest"
    href="_manifest.json"
    data-pwa-version="set_in_manifest_and_pwa_js"
  />

  <PageLoading />

  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
import { onMounted } from "vue";
export default {
  name: "App",
  setup() {
    onMounted(() => {
      console.log("app.vue onMounted");

      window.addEventListener("online", function () {
        // 有連接網路
        console.log("online");
      });

      window.addEventListener("offline", function () {
        // 斷網
        console.log("offline");
        alert("未連接網路，請連接後重試");
      });
    });
  },
};
</script>
