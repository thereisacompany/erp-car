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
            <input type="text" v-model="MyUser.LoginName">
          </div>
          <div class="group-input">
            <label>司機名稱</label>
            <input type="text" v-model="MyUser.username">
          </div>
          <div class="group-input">
            <label>Email</label>
            <input type="text" v-model="MyUser.email">
          </div>
          <div class="group-input">
            <label>電話</label>
            <input type="text" v-model="MyUser.phoneNum">
          </div>
          <div class="group-input">
            <label>車號</label>
            <input type="text" v-model="MyUser.licensePlateNumber">
          </div>
          <div class="group-input">
            <label>生日</label>
            <input type="date" v-model="MyUser.birthday">
          </div>

          <div class="bottom-navigation-bar bottom-btn-fixed st2">
            <a class="tf-btn accent large" href="/">Continue</a>
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
      MyUser: {},
    }

  },
  mounted() {
    let user = localStorage.getItem('user')
    if (user == null) {
      return;
    }
    this.MyUser = JSON.parse(user)
    console.log(this.MyUser)
    // UserID: jshdata.user.id,
    // token: jshdata.token,
    // LoginName: jshdata.user.loginName,
    // username: jshdata.user.username,
    // licensePlateNumber: jshdata.user.licensePlateNumber,
    // supplier_id: jshdata.user.supplier_id,
    // Status: jshdata.user.status,
    // phoneNum: jshdata.user.phoneNum,
    // telephone: jshdata.user.telephone,
    // email: jshdata.user.email,
    // birthday: jshdata.user.birthday,
    // sex: jshdata.user.sex,
  }
}
</script>
