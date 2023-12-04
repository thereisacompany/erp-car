
<style>
ul.main-list li{display:inline-block; width:24.3%; padding:8px;}
</style>

<template>
<div>
  <link rel="shortcut icon" href="images/logo.png" />
    <link rel="apple-touch-icon-precomposed" href="images/logo.png" />
    <!-- Font -->
    <link rel="stylesheet" href="fonts/fonts.css" />
    <!-- Icons -->
    <link rel="stylesheet" href="fonts/icons-alipay.css?update=4">
    <link rel="stylesheet" href="styles/bootstrap.css">

    <link rel="stylesheet" type="text/css" href="styles/styles.css?update=4" />
    <link rel="manifest" href="_manifest.json" data-pwa-version="set_in_manifest_and_pwa_js">
    <link rel="apple-touch-icon" sizes="192x192" href="app/icons/icon-192x192.png">

     <!-- preloade -->
     <transition name="fade" mode="out-in">
      <div class="preload preload-container" v-show="IsPreload">
        <div class="preload-logo">
          <div class="spinner"></div>
        </div>
      </div>
    </transition>
    
    <!-- /preload -->    
    <div class="mt-7 login-section">
        <div class="tf-container">
            <p class="text-center"><img src="images/icon/logistic_contact.png" style="width:60%"></p>
            <form class="tf-form mt-5" action="/car/home">
                    <h1 class="text-center">貨物配發派送</h1>
                    <div class="group-input">
                        <label>員工代碼</label>
                        <input type="text" placeholder="eg:0912345678">
                    </div>
                    <div class="group-input auth-pass-input last">
                        <label>密碼</label>
                        <input type="password" class="password-input" placeholder="請輸入密碼...">
                        <a class="icon-eye password-addon" id="password-addon"></a>
                    </div>
                    <a href="#" class="auth-forgot-password mt-3">登入出現問題? </a>

                <button type="submit" class="tf-btn accent large">登入系統</button>

            </form>  
            <ul class="main-list mt-5 mb-4">
                <li><a href="/car/home"><img src="images/icon/index_service1.png" alt="image"></a></li>
                <li><a href="/car/home"><img src="images/icon/index_service2.png" alt="image"></a></li>
                <li><a href="/car/home"><img src="images/icon/index_service3.png" alt="image"></a></li>
                <li><a href="/car/home"><img src="images/icon/index_service4.png" alt="image"></a></li>
            </ul>
            
        </div>
    </div>
</div>

</template>>
<script>

export default {
  setup() {
    
  },
  data(){
    return{
      IsPreload:true,      
    }
    
  },
  mounted(){
    this.$nextTick(()=>{
      setTimeout(() => {
        this.IsPreload=false;  
      }, 500);
    })      
  }
}
</script>
