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
        <div
          class="tf-statusbar d-flex justify-content-center align-items-center"
        >
          <a href="/" class="back-btn"> <i class="icon-left"></i> </a>
          <h3>基本資料</h3>
        </div>
      </div>
    </div>
    <div class="mt-3" id="app-wrap">
      <div class="tf-container">
        <div class="d-flex justify-content-center">
          <div class="box-avatar mt-5">
            <img src="images/user/user1.jpg?update=1" alt="image" />
          </div>
        </div>
        <form class="tf-form mt-7">
          <div class="group-input">
            <label>員工編號</label>
            <input type="text" v-model="MyUser.LoginName" disabled />
          </div>
          <div class="group-input">
            <label>司機名稱</label>
            <input type="text" v-model="MyUser.username" disabled />
          </div>
          <div class="group-input">
            <label>Email</label>
            <input type="text" v-model="MyUser.email" disabled />
          </div>
          <div class="group-input">
            <label>電話</label>
            <input type="text" v-model="MyUser.phoneNum" disabled />
          </div>
          <div class="group-input">
            <label>車號</label>
            <input type="text" v-model="MyUser.licensePlateNumber" disabled />
          </div>
          <div class="group-input">
            <label>生日</label>
            <input type="date" v-model="MyUser.birthday" disabled />
          </div>

          <div class="bottom-navigation-bar bottom-btn-fixed st2">
            <a
              class="tf-btn change-password large"
              style="margin-bottom: 5px"
              href="javascript:;"
              @click="openModal = true"
              >修改密碼</a
            >
            <a
              class="tf-btn logout large"
              style="margin-bottom: 5px"
              href="javascript:;"
              @click="logout()"
              >登出</a
            >
            <a class="tf-btn back large" href="/">返回</a>
          </div>
        </form>
      </div>
    </div>
    <a-modal
      v-model:open="openModal"
      title="修改密碼"
      @ok="handleOk"
      @cancel="cancelChange"
      okText="確認"
      class="change-password-modal"
      destroyOnClose
    >
      <div class="form">
        <a-form
          :model="formState"
          name="change-password-form"
          class="change-password-form"
        >
          <a-form-item
            label="舊密碼"
            name="oldpassword"
            :rules="[{ required: true, message: '請輸入你的舊密碼' }]"
          >
            <a-input-password v-model:value="formState.oldpassword">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item
            label="新密碼"
            name="password"
            :rules="[{ required: true, message: '請輸入新密碼' }]"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item
            label="確認密碼"
            name="checkpassword"
            :rules="[{ required: true, message: '請輸入確認後的新密碼' }]"
          >
            <a-input-password v-model:value="formState.checkpassword">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { Modal, Form, FormItem, InputPassword, message } from "ant-design-vue";
import { LockOutlined } from "@ant-design/icons-vue";
import { server } from "@/api";
import md5 from "md5";
export default {
  components: {
    AModal: Modal,
    AForm: Form,
    AFormItem: FormItem,
    AInputPassword: InputPassword,
    LockOutlined,
  },
  setup() {},
  data() {
    return {
      MyUser: {},
      openModal: false,
      formState: {
        oldpassword: "",
        password: "",
        checkpassword: "",
      },
    };
  },
  mounted() {
    // const APIUrl = "/user/getUserSession";
    // server
    //   .get(APIUrl)
    //   .then((res) => {
    //     if (res != null && res.data != null && res.data.code == 200) {
    //       let jshdata = res.data;
    //       console.log("jshdata", jshdata.data);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log("error", error);
    //     return;
    //   });
    let user = localStorage.getItem("user");
    if (user == null) {
      return;
    }
    this.MyUser = JSON.parse(user);

    console.log("user data", this.MyUser);
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
  },
  // watch: {
  //   formState: {
  //     immediate: true,
  //     handler(newVal, oldVal) {
  //       if (oldVal == false && newVal == true) {
  //         this.createScan();
  //       }
  //     },
  //   },
  // },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push({ name: "login" });
    },
    handleOk() {
      console.log("handleOk:", this.formState);

      if (this.formState.checkpassword != this.formState.password) {
        message.error("確認密碼與新密碼不一致，請重新輸入");
      } else {
        // 送出api /user/updatePwd
        const url = "/user/updatePwd";
        const data = {
          CaruserId: this.MyUser.UserID,
          oldpassword: md5(this.formState.oldpassword),
          password: md5(this.formState.password),
        };
        server
          .put(url, data)
          .then((res) => {
            console.log("res", res);
            if (
              res != null &&
              res.data.data.message == "修改成功" &&
              res.status == 200
            ) {
              message.success("修改成功");
              this.openModal = false;
              this.formState.oldpassword = "";
              this.formState.password = "";
              this.formState.checkpassword = "";
            } else {
              message.error(res.data.data.message);
            }
          })
          .catch(function (error) {
            console.log("error form change password", error);
          });
      }
    },
    cancelChange() {
      this.formState.oldpassword = "";
      this.formState.password = "";
      this.formState.checkpassword = "";
    },
  },
};
</script>
<style scoped>
.box-avatar {
  width: 80px;
  height: 80px;
}

.change-password {
  background-color: #f2cc4d;
  border: 1px solid #f2cc4d;
  color: #000;
}

.change-password:hover {
  background-color: #fff;
  border: 1px solid #f2cc4d;
  color: #f2cc4d;
}

.back {
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
}

.back:hover {
  color: #000;
  background-color: #fff;
  border: 1px solid #000;
}
</style>
