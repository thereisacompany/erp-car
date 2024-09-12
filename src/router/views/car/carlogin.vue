<style>
ul.main-list li {
  display: inline-block;
  width: 24.3%;
  padding: 8px;
}

.login-section input {
  text-align: center;
}

.auth-pass-input {
  display: flex;
  position: relative;
}

.eye-icon {
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
}
</style>

<template>
  <div class="mt-7 login-section">
    <div class="tf-container">
      <p class="text-center">
        <img src="images/icon/logistic_contact.png" style="width: 60%" />
      </p>
      <form class="tf-form mt-5">
        <h1 class="text-center">貨物配發派送</h1>
        <div class="group-input">
          <label>員工代碼</label>
          <input type="text" placeholder="eg:0912345678" v-model="loginName" />
        </div>
        <div class="group-input auth-pass-input last">
          <label>密碼</label>

          <input
            :type="seePassword ? 'text' : 'password'"
            class="password-input"
            placeholder="請輸入密碼..."
            v-model="password"
          />
          <Icon
            :icon="seePassword ? 'heroicons-solid:eye' : 'mdi:eye-off'"
            class="eye-icon"
            @click="toggleSeePassword"
          />
        </div>
        <a href="#" class="auth-forgot-password mt-3">登入出現問題? </a>
        <button
          onclick="return false"
          class="tf-btn accent large"
          @click="tryToLogIn"
        >
          登入系統
        </button>
      </form>
      <ul class="main-list mt-5 mb-4">
        <li>
          <a href="/home"
            ><img src="images/icon/index_service1.png" alt="image"
          /></a>
        </li>
        <li>
          <a href="/home"
            ><img src="images/icon/index_service2.png" alt="image"
          /></a>
        </li>
        <li>
          <a href="/home"
            ><img src="images/icon/index_service3.png" alt="image"
          /></a>
        </li>
        <li>
          <a href="/home"
            ><img src="images/icon/index_service4.png" alt="image"
          /></a>
        </li>
      </ul>
    </div>
  </div>
</template>>
<script>
import { server } from "@/api";
import config from "../../../../vue.config";
import md5 from "md5";
import VConsole from "vconsole";
import { Icon } from "@iconify/vue";

export default {
  data() {
    return {
      IsPreload: true,
      loginName: "",
      password: "",
      seePassword: false,
    };
  },
  components: { Icon },
  mounted() {
    //console.log("this.$route.query.vConsole=", process.env.NODE_ENV)
    localStorage.removeItem("user");
    if (this.$route.query.vConsole == "1") {
      new VConsole().show();
    }

    console.log("Proxy Config:", config.devServer.proxy);

    this.$nextTick(() => {
      setTimeout(() => {
        this.IsPreload = false;
        this.seePassword = false;
      }, 500);
    });
  },
  methods: {
    tryToLogIn() {
      let loginName = this.loginName;
      let password = md5(String(this.password));
      let jsonData = { loginName, password, isDriver: 1 };

      let APIUrl = `user/login`;

      server
        .post(APIUrl, jsonData)
        .then((res) => {
          // console.log("res>>",res);
          // console.log("res.data>>",res.data);
          if (
            res != null &&
            res.data != null &&
            res.data.code == 200 &&
            res.data.data != null
          ) {
            //回傳資料成功
            let jshdata = res.data.data;
            if (jshdata.msgTip == "user can login") {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  UserID: jshdata.user.id,
                  token: jshdata.token,
                  LoginName: jshdata.user.loginName,
                  username: jshdata.user.username,
                  licensePlateNumber: jshdata.user.licensePlateNumber,
                  supplier_id: jshdata.user.supplier_id,
                  Status: jshdata.user.status,

                  phoneNum: jshdata.user.phoneNum,
                  telephone: jshdata.user.telephone,
                  email: jshdata.user.email,
                  birthday: jshdata.user.birthday,
                  sex: jshdata.user.sex,
                })
              );
              //this.$router.push(this.$route.query.redirectFrom || { name: "default", });
              this.$router.push(
                this.$route.query.redirectFrom || { name: "default" }
              );
              return;
            } else if (jshdata.msgTip == "user is not exist") {
              alert("此帳號已停用");
            } else {
              alert("登入失敗!");
              console.log("登入失敗", jshdata.msgTip);
            }
            return;
          }
        })
        .catch(function (error) {
          console.log("error", error);
          alert("登入失敗!");
        });
    },
    toggleSeePassword() {
      this.seePassword = !this.seePassword;
    },
  },
};
</script>
