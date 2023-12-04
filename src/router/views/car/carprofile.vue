
<style>
ul.main-list li {
  display: inline-block;
  width: 24.3%;
  padding: 8px;
}
</style>

<template>
  <div>
    <div class="header is-fixed">
      <div class="tf-container">
        <div class="tf-statusbar d-flex justify-content-center align-items-center">
          <a href="/" class="back-btn"> <i class="icon-left"></i> </a>
          <h3>司機大頭名稱</h3>
        </div>
      </div>
    </div>
    <div class="mt-3" id="app-wrap">
      <div class="tf-container">
        <div class="d-flex justify-content-center">
          <div class="box-avatar">
            <img src="images/user/user1.jpg?update=1" alt="image">
          </div>
        </div>
        <form class="tf-form mt-8">
          <div class="group-input">
            <label>員工編號</label>
            <input type="text" placeholder="司機名稱">
          </div>
          <div class="group-input">
            <label>司機名稱</label>
            <input type="text" placeholder="xxxxx大哥">
          </div>
          <div class="group-input">
            <label>Email</label>
            <input type="text" placeholder="Example@gmail">
          </div>
          <div class="group-input">
            <label>電話</label>
            <input type="text" placeholder="0912345678">
          </div>
          <div class="group-input">
            <label>車號</label>
            <input type="text" placeholder="ABC-123">
          </div>
          <div class="group-input">
            <label>生日</label>
            <input type="date">
          </div>
          <div class="group-input">
            <label>性別</label>
            <select class="box-sl-profile sl-gender form-select">
              <option>男</option>
              <option>女</option>
            </select>
          </div>
          <div class="bottom-navigation-bar bottom-btn-fixed st2">
            <button class="tf-btn accent large" onclick="return false">Continue</button>
          </div>
        </form>
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
