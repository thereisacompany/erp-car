
<style>
.xprogress-bar {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

.xprogress-bar li {
  flex: 2;
  position: relative;
  padding: 0 0 14px 0;
  line-height: 1.5;
  color: var(--color-yellow);
  font-weight: 600;
  white-space: nowrap;
  overflow: visible;
  min-width: 0;
  text-align: center;
  border-bottom: 2px solid var(--color-gray-disabled);
}

.xprogress-bar li:first-child,
.xprogress-bar li:last-child {
  flex: 1;
}

.xprogress-bar li:last-child {
  text-align: right;
}

.xprogress-bar li:before {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  background-color: var(--color-gray-disabled);
  border-radius: 50%;
  border: 2px solid var(--color-white);
  position: absolute;
  left: calc(50% - 6px);
  bottom: -6px;
  z-index: 3;
  transition: all .2s ease-in-out;
}

.xprogress-bar li:first-child:before {
  left: 0;
}

.xprogress-bar li:last-child:before {
  right: 0;
  left: auto;
}

.xprogress-bar span {
  transition: opacity .3s ease-in-out;
}

.xprogress-bar li:not(.is-active) span {
  opacity: 0;
}

.xprogress-bar .is-complete:not(:first-child):after,
.xprogress-bar .is-active:not(:first-child):after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  bottom: -2px;
  left: -50%;
  z-index: 2;
  border-bottom: 2px solid var(--color-yellow);
}

.xprogress-bar li:last-child span {
  width: 200%;
  display: inline-block;
  position: absolute;
  left: -100%;
}

.xprogress-bar .is-complete:last-child:after,
.xprogress-bar .is-active:last-child:after {
  width: 200%;
  left: -100%;
}

.xprogress-bar .is-complete:before {
  background-color: var(--color-yellow);
}

.xprogress-bar .is-active:before,
.xprogress-bar li:hover:before,
.xprogress-bar .is-hovered:before {
  background-color: var(--color-white);
  border-color: var(--color-yellow);
}

.xprogress-bar li:hover:before,
.xprogress-bar .is-hovered:before {
  transform: scale(1.33);
}

.xprogress-bar li:hover span,
.xprogress-bar li.is-hovered span {
  opacity: 1;
}

.xprogress-bar:hover li:not(:hover) span {
  opacity: 0;
}

.x-ray .xprogress-bar,
.x-ray .xprogress-bar li {
  border: 1px dashed red;
}

.xprogress-bar .has-changes {
  opacity: 1 !important;
}

.xprogress-bar .has-changes:before {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  position: absolute;
  left: calc(50% - 4px);
  bottom: -20px;
  background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%208%208%22%3E%3Cpath%20fill%3D%22%23ed1c24%22%20d%3D%22M4%200l4%208H0z%22%2F%3E%3C%2Fsvg%3E');
}

.bad {
  border-bottom: 1px solid var(--color-red);
}

.bad li {
  color: var(--color-red);
}

.bad li.is-complete:before {
  background-color: var(--color-red);
}

.bad .is-complete:not(:first-child):after,
.bad .is-active:not(:first-child):after {

  border-bottom: 2px solid var(--color-red);
}

.bad .is-active:before,
.bad li:hover:before,
.bad .is-hovered:before {
  background-color: var(--color-white);
  border-color: var(--color-red);
}

.doneok {
  border-bottom: 1px solid var(--color-green);
}

.doneok li {
  color: var(--color-green);
}

.doneok li.is-complete:before {
  background-color: var(--color-green);
}

.doneok .is-complete:not(:first-child):after,
.doneok .is-active:not(:first-child):after {

  border-bottom: 2px solid var(--color-green);
}

.doneok .is-active:before,
.doneok li:hover:before,
.doneok .is-hovered:before {
  background-color: var(--color-white);
  border-color: var(--color-green);
}


.upload__box {}

.upload__inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.upload__btn {
  display: inline-block;
  font-weight: 600;
  color: #333;
  text-align: center;
  min-width: 150px;
  padding: 13px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid;
  border-radius: 10px;
  line-height: 26px;
  font-size: 14px;


  border: 2px dashed #c5c5c5;
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-transform: capitalize;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.upload__btn:hover {
  background-color: unset;
  color: #4045ba;
  transition: all 0.3s ease;
}

.upload__btn-box {
  margin-bottom: 10px;
}

.upload__img-wrap {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
}

.upload__img-box {
  width: 150px;
  padding: 0 10px;
  margin-bottom: 12px;
}

.upload__img-close {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 10px;
  right: 10px;
  text-align: center;
  line-height: 24px;
  z-index: 1;
  cursor: pointer;
}

.upload__img-close:after {
  content: "✖";
  font-size: 14px;
  color: white;
}

.img-bg {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  padding-bottom: 100%;
}
</style>


<template>
  <div>

    <div class="app-header st1">
      <div class="tf-container">
        <div class="tf-topbar d-flex justify-content-center align-items-center">
          <a href="/" class="back-btn"> <i class="icon-left white_color"></i></a>
          <h3 class="white_color">配送單號: x123456</h3>
        </div>

        <h1 class="text-center white_color mt-2">台北市新店區</h1>

      </div>
    </div>
    <div id="app-wrap" style="margin-top:-73px; padding-top:0;">
      <div class="wrap-card-detail mt-3">
        <div class="tf-container">
          <div class="tf-atm-card">
            <div class="heading">
              <a><i class="icon-qr-code"></i></a>
              <a id="btn-popup-up"><i class="icon-user-outline"></i></a>
            </div>
            <ol class="xprogress-bar mt-5">
              <li class="is-complete"><span>接單中</span></li>
              <li class="is-active"><span>聯絡中</span></li>
              <li><span>配送中</span></li>
              <li><span>配送完成</span></li>
            </ol>
            <h3 class="fw_6"><a href="#" class="white_color">配送訂單類型及資訊</a></h3>

            <div class="bottom d-flex justify-content-between">
              <div class="inner-left">
                <span class="fw_6 secondary2_color">預計配送日期</span>
                <p><a href="#">2023年08月29日</a></p>
              </div>
              <div class="inner-right">
                <span class="fw_6 secondary2_color">司機/車號</span>
                <p class="text-end"><a href="#">王大頭 / ABC-123</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box-card-service mt-3">
        <div class="tf-container">
          <h3>訂單資訊</h3>
          <div class="tf-spacing-12"></div>

          <ul class="list-card-info">
            <li>訂單編號: <span>HO-2212A6542</span> </li>
            <li>訂單日期: <span>2023-10-12 </span> </li>
            <li>訂單來源: <span>momo購物台</span> </li>
            <li>處理人員: <span>陳小姐</span> </li>

          </ul>
          <div class="tf-spacing-12"></div>
          <h3>收件人資訊</h3>
          <div class="tf-spacing-12"></div>
          <ul class="list-card-info">
            <li>地址: <span>10$</span> </li>
            <li>收件人: <span>陳先生 </span> </li>
            <li>電話: <span>0928654121</span> </li>
            <li>地址: <span>台北市新店區大德路二段180巷50號2樓</span> </li>

          </ul>
        </div>
      </div>
      <div class="content-card mt-5">
        <div class="tf-container">
          <div class="tf-card-list bg_surface_color large">
            <div class="info">
              <a href="#" class="note-voucher">商品內容</a>
              <div class="tf-spacing-12"></div>
              <p>【Haier 海爾】雙門變頻冰箱334L-FC2-334S X 1</p>
              <p>【Haier 海爾】雙門變頻冰箱334L-FC2-334S X 1</p>
              <p>【Haier 海爾】雙門變頻冰箱334L-FC2-334S X 1</p>
            </div>
          </div>
          <div class="tf-spacing-12"></div>
          <div class="tf-card-list bg_yellow large out-line">
            <div class="logo">
              <img src="images/user/user1.jpg?update=1" alt="image">
            </div>
            <div class="info">
              <h4 class="fw_6">客服提醒事項</h4>
              <p>司機記得要跟客戶收錢...</p>
            </div>
          </div>


          <h3 class="auth-line  fw_8">司機回報區</h3>
          <ul class="box-card">
            <li class="tf-card-list medium bt-line">
              <div class="logo">
                <img src="images/icon/index_service6.png" style="width:43px;">
              </div>
              <div class="info">
                <h4 class="fw_6"><a href="">接單領貨</a></h4>
                <p>台北倉領貨完成</p>
              </div>
              <input type="checkbox" class="tf-checkbox circle-check" checked>
            </li>
            <li class="tf-card-list medium bt-line">
              <div class="logo">
                <img src="images/icon/index_service6.png" style="width:43px;">
              </div>
              <div class="info">
                <h4 class="fw_6"><a href="">聯絡中</a></h4>
                <p>連絡電話: 12345678 陳先生</p>
              </div>
              <input type="checkbox" class="tf-checkbox circle-check" checked>
            </li>
            <li class="tf-card-list medium bt-line">
              <div class="logo">
                <img src="images/icon/index_service6.png" style="width:43px;">
              </div>
              <div class="info">
                <h4 class="fw_6"><a href="">配送中</a></h4>
                <p>台北市新店區大德路二段180巷50號2樓</p>
              </div>
              <input type="checkbox" class="tf-checkbox circle-check" checked>
            </li>
            <li class="tf-card-list medium">
              <div class="logo">
                <img src="images/icon/index_service6.png" style="width:43px;">
              </div>
              <div class="info">
                <h4 class="fw_6"><a href="">配送完成</a></h4>
                <p>客戶完成簽收</p>
              </div>
              <input type="checkbox" class="tf-checkbox circle-check" checked>
            </li>
          </ul>
          <form class="tf-form mt-5">

            <div class="group-input">
              <label>配送問題備註</label>
              <textarea>客戶回饋....</textarea>
            </div>

            <div class="wrap-banks mt-3">
              <h3 class="auth-line  fw_8">相關照片上傳</h3>
              <div class="tf-spacing-12"></div>
              <ul class="bank-box">
                <li>
                  <a class="bank-list" href="">
                    <img class="logo-bank" src="images/logo-banks/bank1.png" alt="image">
                  </a>
                </li>
                <li>
                  <a class="bank-list" href="">
                    <img class="logo-bank" src="images/logo-banks/bank2.png" alt="image">
                  </a>
                </li>
                <li>
                  <a class="bank-list" href="">
                    <img class="logo-bank" src="images/logo-banks/bank3.png" alt="image">
                  </a>
                </li>
                <li>
                  <a class="bank-list" href="#">
                    <img class="logo-bank" src="images/logo-banks/bank4.png" alt="image">
                  </a>
                </li>
                <li>
                  <a class="bank-list" href="">
                    <img class="logo-bank" src="images/logo-banks/bank5.png" alt="image">
                  </a>
                </li>
                <li>
                  <a class="bank-list" href="">
                    <img class="logo-bank" src="images/logo-banks/bank6.png" alt="image">
                  </a>
                </li>
                <li>
                  <a class="bank-list" href="">
                    <img class="logo-bank" src="images/logo-banks/bank7.png" alt="image">
                  </a>
                </li>
                <li>
                  <a class="bank-list" href="">
                    <img class="logo-bank" src="images/logo-banks/bank8.png" alt="image">
                  </a>
                </li>
              </ul>
            </div>
            <div class="tf-spacing-20"></div>
            <div class="upload__box">
              <div class="upload__btn-box">
                <label class="upload__btn">
                  <p>新增上傳照片 <i class="icon-plus fw_7"></i></p>
                  <input type="file" multiple="" data-max_length="20" class="upload__inputfile">
                </label>
              </div>
              <div class="upload__img-wrap"></div>
            </div>
            <div class="upload__img-wrap"></div>
            <div class=" mt-5 st2">
              <a class="tf-btn accent large" href="success.html" id="btn-popup-down">送出修改</a>
            </div>

          </form>

        </div>
      </div>





    </div>






    <div class="tf-panel up">
      <div class="panel_overlay"></div>
      <div class="panel-box panel-up wrap-panel-clear">
        <div class="heading">
          <p>是否通報該筆配送單異常?</p>
          <a href="#" class="critical_color">確認異常訂單</a>
        </div>
        <div class="bottom">
          <a class="clear-panel" href="#">取消</a>
        </div>
      </div>
    </div>


  </div>
</template>>
<script>


import { server } from "@/api";

export default {
  setup() {

  },
  data() {
    return {
      queryObj: {
        number: '',
        headerId: '',
      },
      User: {
        LoginName: "",
        Status: 0,
        UserID: 0,
        UserName: "",
        CarNumber: ""
      }

    }
  },
  mounted() {
    let user = localStorage.getItem('user')
    if (user == null) {
      return;
    }

    let MyUser = JSON.parse(user)
    //console.log("MyUser", MyUser)
    this.User.LoginName = MyUser.LoginName;
    this.User.Status = MyUser.Status;
    this.User.UserID = MyUser.UserID;
    this.User.UserName = MyUser.UserName;

    this.queryObj.number = this.$route.query.number || ''
    this.queryObj.headerId = this.$route.query.headerId || ''
    this.$nextTick(() => { this.GetData() })

  },
  methods: {
    GetData() {
      server.GetDeliveryData(this.queryObj, (data) => { console.log(data) })
      server.GetDetailByNumber(this.queryObj, (data) => { console.log(data) })
      server.GetDetailList(this.queryObj, (data) => { console.log(data) });
    },
    GetDataMore() {
      this.queryObj.pageSize = this.queryObj.pageSize * 2;
      this.GetData();
    }
  }
}
</script>


                                                                           