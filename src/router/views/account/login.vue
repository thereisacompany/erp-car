<script>

// import axios from "axios";
import { server } from "@/api";
import md5 from "md5";
import VConsole from 'vconsole';



import Layout from "../../layouts/auth";
import {
  userMethods,
  authMethods,
  authFackMethods,
  notificationMethods,
} from "@/state/helpers";
import { mapState } from "vuex";

import appConfig from "@/app.config";
import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

/**
 * Login component
 */
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  page: {
    title: "Login",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
  },
  data() {
    return {
      loginName: "",
      password: "",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    };
  },
  validations: {
    loginName: {
      required: helpers.withMessage("請輸入帳號", required),
    },
    password: {
      required: helpers.withMessage("請輸入密碼", required),
    },
  },
  computed: {
    ...mapState("authfack", ["status"]),

    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  methods: {
    ...userMethods,
    ...authMethods,
    ...authFackMethods,
    ...notificationMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.v$.$touch();
      // console.log("this.v$.$invalid",this.v$.$invalid)
      // console.log("process.env.VUE_APP_DEFAULT_AUTH",process.env.VUE_APP_DEFAULT_AUTH)
      if (this.v$.$invalid) {
        return;
      } else {

        let loginName = this.loginName;
        let password = md5(String(this.password));
        let jsonData = { loginName, password };
        let APIUrl = `user/login`;

        server.post(APIUrl, jsonData)
          .then((res) => {
            // console.log("res>>",res);
            // console.log("res.data>>",res.data);
            if (res != null && res.data != null && res.data.code == 200 && res.data.data != null) {
              //回傳資料成功
              let jshdata = res.data.data;
              if (jshdata.msgTip == "user can login") {
                //console.log("OK","this.$route.query.redirectFrom",this.$route.query)
                //console.log("jshdata",jshdata)
                this.changeUserID({ value: jshdata.user.id });
                this.changeLoginName({ value: jshdata.user.loginName });
                this.changeUsername({ value: jshdata.user.username });
                this.changeToken({ value: jshdata.token });
                this.changeTreeList({ value: jshdata.userBtn });

                localStorage.setItem('user', JSON.stringify({ UserID: jshdata.user.id, token: jshdata.token, loginName: jshdata.user.loginName }));

                localStorage.setItem('user_authList', JSON.stringify(jshdata.user.authList));


                this.$router.push(this.$route.query.redirectFrom || { name: "default", });


                // this.tryingToLogIn = false;
                // this.authError = String(123) || "no data-2";
                // this.isAuthError = true;
                //alert("this.$route.query.redirectFrom:"+JSON.stringify(this.$route.query.redirectFrom))

                return;
              }

              //console.log("error msgTip",jshdata.msgTip)
              this.tryingToLogIn = false;
              this.authError = jshdata.msgTip ? jshdata.msgTip : "";
              this.isAuthError = true;
              return;
            }
          }).catch(function (error) {
            console.log("error", error);

          });

        // jshERP.userlogin({loginName:this.loginName,password:this.password})
        //   .then((su1)=>{
        //     console.log("success",su1)
        // })
      }
    },

  },
  mounted() {

    //console.log("this.$route.query.vConsole=", process.env.NODE_ENV)
    localStorage.removeItem("user");
    localStorage.removeItem("user_authList")
    if (this.$route.query.vConsole == "1") {
      new VConsole().show();
    }

  },
};
</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <img src="@/assets/images/logo.png" class="img-fluid">
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img src="@/assets/images/profile-img.png" alt class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <router-link to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img src="@/assets/images/logo.svg" alt height="34" />
                  </span>
                </div>
              </router-link>
            </div>
            <b-alert v-model="isAuthError" variant="danger" class="mt-3" dismissible>{{ authError }}</b-alert>
            <div v-if="notification.message" :class="'alert ' + notification.type">
              {{ notification.message }}
            </div>

            <b-form class="p-2" @submit.prevent="tryToLogIn">
              <b-form-group class="mb-3" id="input-group-1" label="帳號" label-for="input-1">
                <b-form-input id="input-1" v-model="loginName" type="text" placeholder="請輸入登入帳號" :class="{
                  'is-invalid': submitted && v$.loginName.$error,
                }"></b-form-input>
                <div v-for="(item, index) in v$.loginName.$errors" :key="index" class="invalid-feedback">
                  <span v-if="item.$message">{{ item.$message }}</span>
                </div>
              </b-form-group>

              <b-form-group class="mb-3" id="input-group-2" label="密碼" label-for="input-2">
                <b-form-input id="input-2" v-model="password" type="password" placeholder="請輸入登入密碼" :class="{
                  'is-invalid': submitted && v$.password.$error,
                }"></b-form-input>
                <div v-if="submitted && v$.password.$error" class="invalid-feedback">
                  <span v-if="v$.password.required.$message">{{
                    v$.password.required.$message
                  }}</span>
                </div>
              </b-form-group>
              <b-form-checkbox class="form-check me-2 mt-0" id="customControlInline" name="checkbox-1" value="accepted"
                unchecked-value="not_accepted">記住我
              </b-form-checkbox>
              <div class="mt-3 d-grid">
                <b-button type="submit" variant="primary" class="btn-block">登入</b-button>
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">


          <p>
            © {{ new Date().getFullYear() }} 鉅生物流有限公司
            <i class="mdi mdi-heart text-danger"></i> ERP
          </p>
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>