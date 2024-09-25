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
  <link
    rel="apple-touch-icon"
    sizes="192x192"
    href="app/icons/icon-192x192.png"
  />
  <PageLoading />

  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
export default {
  name: "App",
  setup() {},
};
</script>
