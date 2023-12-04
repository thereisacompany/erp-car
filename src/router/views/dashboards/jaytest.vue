<script>
import appConfig from "@/app.config";
import { server } from "@/api";
import axios from "axios";
// import axios from 'axios';

export default {
  page: {
    title: "Jay's Test Page",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      testdata: "Hello!"
    };
  },

  computed: {
    
  },
  methods: {    
    Hello(){
      this.testdata="HELLO, 現在時間:"+new Date()      
    },
    localUser(){
      const loggeduser = localStorage.getItem('user');
      this.testdata= JSON.stringify(loggeduser)
    },
    GetServerData(){
      
      const loggeduser = JSON.parse(localStorage.getItem('user'));
     
      //let jsonData = {};
      //let APIUrl = `${process.env.VUE_APP_API_URL}user/getAllList`;
      // let APIUrl = `http://34.80.85.84:9999/jshERP-boot/user/getAllList`;
      // let headers = {headers: {'X-Access-Token': loggeduser.token },withCredentials: true,baseURL:"http://34.80.85.84:9999"};
      // console.log(APIUrl,headers)
      const ax1 = axios.create({     
        headers: {'X-Access-Token': loggeduser.token} 
      })
      ax1.get("/jshERP-boot/user/getAllList",{withCredentials: true})
          .then((res) => {
            console.log("回傳資料成功 res=",res);
            if(res !=null && res.data != null && res.data.code == 200 && res.data.data != null){
              //回傳資料成功
              let jshdata = res.data.data;             
              this.testdata= JSON.stringify(jshdata)
              return;
            }
          }).catch(function (error) {
            console.log("error",error);
              return;
          });       
        

    },
    GetServerData2(){
    
      let APIUrl = `/user/getAllList`;
      server.get(APIUrl)
          .then((res) => {
            console.log("回傳資料成功 res=",res);
            if(res !=null && res.data != null && res.data.code == 200 && res.data.data != null){
              //回傳資料成功
              let jshdata = res.data.data;             
              this.testdata= JSON.stringify(jshdata)
              return;
            }
          }).catch(function (error) {
            console.log("error",error);
              return;
          });       
    },

  },
  mounted() {
    console.log("this.$route.query.vConsole=",process.env.NODE_ENV)
    this.localUser()
  },
}
</script>
<template>
  <div class="account-pages my-5 pt-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="text-center mb-5">
            <h1 class="display-2 fw-medium">
              <div class="button-items">
                <b-button variant="primary" @click="Hello()">HELLO</b-button>
                <b-button variant="primary" @click="localUser()">localUser</b-button>
                <b-button variant="primary" @click="GetServerData()">全部用戶列表</b-button>
                <b-button variant="primary" @click="GetServerData2()">全部用戶列表2</b-button>
              </div>
            </h1>
            <h4 style="word-break:break-all">{{testdata}}</h4>
            <div class="mt-5 text-center">
              <router-link class="btn btn-primary" to="/">Back to Dashboard</router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-8 col-xl-6">
          <div>
            <img src="@/assets/images/error-img.png" alt class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

