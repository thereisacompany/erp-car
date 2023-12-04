
<style>
ul.main-list li {
  display: inline-block;
  width: 24.3%;
  padding: 8px;
}
</style>

<template>
  <div>


    <div>
      <div class="header">
        <div class="tf-container">
          <div class="tf-statusbar d-flex justify-content-center align-items-center">
            <a href="/" class="back-btn"> <i class="icon-left"></i> </a>
            <h3>掃描QRCODE</h3>
          </div>
        </div>
      </div>
      <div class="wrap-qr">
        <div class="tf-container">
          <h2 class="fw_6 text-center">請確認對準後，下方出現編號後即可送出</h2>
          <div class="logo-qr">
            <img src="images/scan-qr/qrcode1.png" alt="image">
          </div>
          <div class="group-input mt-3">
            <input type="text" placeholder="eg:xdd-2928277-298373664">
          </div>
        </div>
      </div>

      <div class="bottom-navigation-bar bottom-btn-fixed">
        <div class="tf-container d-flex ">
          <a href="home.html" class="tf-btn accent medium">確認送出</a>
        </div>
      </div>


    </div>
  </div>
</template>>
<script>

export default {
  setup() {

  },
  data() {
    return {
      IsPreload: true,
    }

  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.IsPreload = false;
      }, 500);
    })
  }
}
</script>
