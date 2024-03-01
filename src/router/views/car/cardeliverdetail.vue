
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
          <h3 class="white_color">配送單號: {{ DetailInfo.number }}</h3>
        </div>

        <h1 class="text-center white_color mt-2">{{ formatAddressArea(DetailInfo.address) }}</h1>

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
              <li v-if="driver.status <= 1" class="is-active"><span>未接單</span></li>
              <li v-else :class="formatDriverStatus(2)"><span>接單中</span></li>
              <li :class="formatDriverStatus(3)"><span>聯絡中</span></li>
              <li :class="formatDriverStatus(4)"><span>配送中</span></li>
              <li :class="formatDriverStatus(5)"><span>配送完成</span></li>
            </ol>
            <h3 class="fw_6"><a href="#" class="white_color">配送訂單類型及資訊</a></h3>

            <div class="bottom d-flex justify-content-between">
              <div class="inner-left">
                <span class="fw_6 secondary2_color">預計配送日期</span>
                <p><a href="javascript:;">{{ formatDate(DetailInfo.agreedDelivery) }}</a></p>
              </div>
              <div class="inner-right">
                <span class="fw_6 secondary2_color">司機/車號</span>
                <p class="text-end"><a href="#">{{ driver.driverName }} / {{ driver.carNumber }}</a></p>
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
            <li>訂單編號: <span>{{ DetailInfo.number }}</span> </li>
            <li>訂單日期: <span>{{ formatDate(DetailInfo.operTime) }} </span> </li>
            <li>訂單來源: <span>{{ DetailInfo.organName }}</span> </li>
            <li>處理人員: <span>{{ DetailInfo.creatorName }}</span> </li>

          </ul>
          <div class="tf-spacing-12"></div>
          <h3>收件人資訊</h3>
          <div class="tf-spacing-12"></div>
          <ul class="list-card-info">

            <li>收件人: <span>{{ DetailInfo.receiveName }} </span> </li>
            <li>電話: <span>{{ DetailInfo.cellphone }}</span> </li>
            <li>地址: <span>{{ DetailInfo.address }}</span> </li>

          </ul>
        </div>
      </div>
      <div class="content-card mt-5">
        <div class="tf-container">
          <div class="tf-card-list bg_surface_color large">
            <div class="info">
              <a href="#" class="note-voucher">商品內容</a>
              <div class="tf-spacing-12"></div>
              <p v-for="(name1, nidx) in String(DetailInfo.materialsList).split(',')" :key="'materialsList' + nidx">
                {{ name1 }}
              </p>

            </div>
          </div>
          <div class="tf-spacing-12"></div>
          <div class="tf-card-list bg_yellow large out-line">
            <div class="logo">
              <img src="images/user/user1.jpg?update=1" alt="image">
            </div>
            <div class="info">
              <h4 class="fw_6">客服提醒事項</h4>
              <p>{{ DetailInfo.remark }}&nbsp;</p>
            </div>
          </div>
          <div class="tf-spacing-12"></div>


          <h3 class="auth-line  fw_8">訂單狀態區</h3>
          <ul class="box-card">
            <li class="tf-card-list medium bt-line">
              <div class="logo">
                <img src="images/icon/index_service6.png" style="width:43px;">
              </div>
              <div class="info">
                <h4 class="fw_6"><a href="javascript:;" @click="SetOrderStatus(2)">接單領貨</a></h4>
                <p>{{ DetailInfo.depotList }} {{ formatDeliveryStatus(2) ? '領貨完成' : '等待接單' }}</p>
              </div>
              <input type="checkbox" class="tf-checkbox circle-check" :checked="formatDeliveryStatus(2)"
                @click="SetOrderStatus(2)">
            </li>
            <li class="tf-card-list medium bt-line">
              <div class="logo">
                <img src="images/icon/index_service6.png" style="width:43px;">
              </div>
              <div class="info">
                <h4 class="fw_6"><a href="javascript:;" @click="SetOrderStatus(3)">聯絡中</a></h4>
                <p>連絡電話: {{ DetailInfo.cellphone }} {{ DetailInfo.receiveName }} </p>
              </div>
              <input type="checkbox" class="tf-checkbox circle-check" :checked="formatDeliveryStatus(3)"
                @click="SetOrderStatus(3);">
            </li>
            <li class="tf-card-list medium bt-line">
              <div class="logo">
                <img src="images/icon/index_service6.png" style="width:43px;">
              </div>
              <div class="info">
                <h4 class="fw_6"><a href="javascript:;" @click="SetOrderStatus(4)">配送中</a></h4>
                <p>{{ DetailInfo.address }}</p>
              </div>
              <input type="checkbox" class="tf-checkbox circle-check" :checked="formatDeliveryStatus(4)"
                @click="SetOrderStatus(4)">
            </li>
            <li class="tf-card-list medium">
              <div class="logo">
                <img src="images/icon/index_service6.png" style="width:43px;">
              </div>
              <div class="info">
                <h4 class="fw_6"><a href="javascript:;" @click="SetOrderStatus(5)">配送完成</a></h4>
                <p>客戶完成簽收</p>
              </div>
              <input type="checkbox" class="tf-checkbox circle-chec" :checked="formatDeliveryStatus(5)"
                @click="SetOrderStatus(5)">
            </li>
          </ul>
          <div class="tf-spacing-12"></div>
          <button class="btn btn-danger" @click="SetOrderStatus(6)">
            {{ formatDeliveryStatus(6) == true ? '異常訂單' : '設定異常訂單' }}</button>
          <div class="tf-spacing-12"></div>


          <h3 class="auth-line  fw_8">司機回報區</h3>
          <template v-for="(r1, ridx) in DriverReportList" :key="'DriverReportList'+ridx">
            <div class="tf-card-list bg_white large out-line">
              <div class="info">
                <h4 class="fw_6">司機備註回報</h4>
                <h5> {{ r1.datetime }}</h5>
                <p v-for="(ss1, ssidx) in String(r1.message).split('\n')" :key="'message' + ssidx">{{ ss1 }}</p>
              </div>
            </div>
            <div class="tf-spacing-12" v-if="r1.feedback != null && r1.feedback != ''"></div>
            <div class="tf-card-list bg_yellow large out-line" v-if="r1.feedback != null && r1.feedback != ''">
              <div class="logo">
                <img src="images/user/user1.jpg?update=1" alt="image">
              </div>
              <div class="info">
                <h4 class="fw_6">客服回覆內容</h4>
                <p v-for="(ss1, ssidx) in String(r1.feedback).split('\n')" :key="'feedback' + ssidx">{{ ss1 }}</p>
              </div>
            </div>
            <div class="tf-spacing-12"></div>
          </template>


          <form class="tf-form mt-5">
            <div class="group-input">
              <label>配送問題備註</label>
              <textarea v-model="customerReportMsg" placeholder="客戶回饋...">.</textarea>
            </div>
            <button class="btn btn-dark" @click="driverReport">送出問題備註</button>
            <div class="tf-spacing-12"></div>
            <div class="wrap-banks mt-3">
              <h3 class="auth-line  fw_8">相關照片/影片上傳</h3>
              <div class="tf-spacing-12"></div>



              <ul class="bank-box">
                <li v-for="(f1, fidx) in filelist" :key="'file-' + fidx">
                  <span class="bank-list">
                    <img class="logo-bank" v-if="CheckIsImage(f1)" :src="GetAccessFile1(f1)" @click="ShowImage(f1)" />
                    <a v-else href="javascript:;" @click="ShowImage(f1)" style="word-break:break-all">{{
                      f1.split('/').pop()
                    }}</a>
                  </span>
                  <a href="javascript:;" class="text-danger" @click="DeleteFile1(f1)">&nbsp;<i class="bx bx-x"></i></a>
                </li>

              </ul>
            </div>
            <div class="tf-spacing-20"></div>
            <div class="upload__box">
              <div class="upload__btn-box">
                <label class="upload__btn">
                  <p>新增上傳照片/影片 <i class="icon-plus fw_7"></i></p>
                  <input type="file" multiple="" data-max_length="20" class="upload__inputfile" ref="file2"
                    @change="handleFileUpload">
                </label>
              </div>
              <div class="upload__img-wrap"></div>
            </div>
            <div class="upload__img-wrap"></div>
            <div class=" mt-5 st2">
              <a class="tf-btn accent large" href="javascript:;" id="btn-popup-down"
                @click="UpdateDeliveryReport">送出修改</a>
            </div>

          </form>
        </div>
      </div>
    </div>
    <b-modal v-model="modelMsg.IsActive" id="modalhome1" centered title="Center modal" title-class="font-18" hide-footer
      hide-header>

      <div class="modal-content">
        <div class="heading">
          <h4 class="fw_6 text-center">
            {{ modelMsg.title }}
          </h4>
          <p class="fw_4 mt-2 text-center">{{ modelMsg.msg }}</p>
        </div>
        <div class="bottom">

          <a href="#" class="btn-hide-modal" :class="modelMsg.iscritical ? 'critical_color' : 'primary_color'"
            data-dismiss="modal" aria-label="Close" @click="SetOrderStatusConfirm" v-if="modelMsg.IsAlert == false">確認</a>
          <a href="javascript:;" class="secondary_color btn-hide-modal" data-dismiss="modal" aria-label="Close"
            @click="CloseModal()">{{ modelMsg.IsAlert == false ? '取消' : '確認' }}</a>
        </div>
      </div>
    </b-modal>
    <b-modal size="xl" v-model="showImageModal" title="顯示圖片" title-class="text-black font-18" body-class="p-3" centered
      hide-header hide-footer>
      <form>
        <div class="row text-center">
          <div class="col-12">
            <img :src="showImageURL" max-width="100%" max-height="100%" style="max-width: 100%;">
          </div>
        </div>
      </form>
    </b-modal>

  </div>
</template>
<script>

import dayjs from 'dayjs'
import { server } from "@/api";
import common from "@/api/common";


export default {
  setup() {

  },

  data() {
    return {
      modelMsg: {
        IsActive: false,
        IsAlert: false,
        title: '',
        msg: '',
        iscritical: false,
        callFunc: null,
        data: '',
      },
      queryObj: {
        number: '',
        headerId: '',
      },
      customerReportMsg: '',
      User: {
        LoginName: "",
        Status: 0,
        UserID: 0,
        UserName: "",
        CarNumber: ""
      },
      driver: {
        driverId: '',
        driverName: '',
        assignDate: '',
        carNumber: '',
        assignUser: '',
        filePath: '',
        status: 0,
        deliveryStatusList: [],
        reportList: [],
      },
      DriverReportList: [],
      filelist: [],
      DetailInfo: {},

      showImageURL: '',
      showImageModal: false,
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
    handleFileUpload: function () {
      console.log("handleFileUpload")
      for (let i = 0; i < this.$refs.file2.files.length; i++) {
        let file1 = this.$refs.file2.files[i];
        console.log(file1.size)
        if (file1.size <= 10240000) {
          server.UploadFile1({ biz: 'driver', file: file1 }, (uploadPath) => {
            if (uploadPath != null) {
              this.filelist.push(uploadPath);
            }
          })
        }

      }
      this.$refs.file2.value = '';
    },
    GetAccessFile1(UrlPath1) {
      let APIUrl = `${process.env.VUE_APP_API_URL}/systemConfig/static/${UrlPath1}`;
      return APIUrl;

    },
    CheckIsImage(ImageUrl) {
      let filename = this.GetAccessFile1(ImageUrl);
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
      const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
      if (imageExtensions.includes(extension)) {
        return true;
      }
      return false;
    },
    DeleteFile1(file1) {
      const filteredArray = this.filelist.filter(obj => !(obj === file1));
      this.filelist = filteredArray;
    },
    ShowImage(ImageUrl) {
      let filename = this.GetAccessFile1(ImageUrl);

      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
      const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
      if (imageExtensions.includes(extension)) {
        this.showImageURL = filename;
        this.showImageModal = true;
      } else {
        window.open(filename, "file1");
      }


    },
    CloseModal() {
      this.modelMsg.IsActive = false;
      this.modelMsg.IsAlert = false;
    },
    formatAddressArea(address) {
      let keywords = ["區", "路"];
      let index = Math.min(...keywords.map(keyword => String(address).indexOf(keyword)).filter(index => index !== -1));

      // 如果找不到區或路，就取最前面6個字
      if (index === -1) {
        return String(address).substring(0, 6);
      } else {
        // 取得到區或路為止的前面字串
        return String(address).substring(0, index + 1);
      }

    },
    formatDriverStatus(iStatus) {
      if (!common.IsNumber(this.driver.status)) return "";
      if (iStatus > this.driver.status) return "";
      if (iStatus == this.driver.status) return "is-active";
      return "is-complete"
    },
    formatDeliveryStatus(iStatus) {

      if (this.driver.deliveryStatusList == null) return false;

      let F1List = this.driver.deliveryStatusList.filter(x => String(x.status) == String(iStatus));
      if (F1List.length != 0) return true;
      return false;


    },
    formatdStatus(dStatus) {
      switch (Number(dStatus)) {
        case 0: return "未派發";
        case 1: return "已派發";
        case 2: return "已接單";
        case 3: return "聯絡中";
        case 4: return "配送中";
        case 5: return "配送完成";
        case 6: return "配送異常";

        default: return dStatus
      }
    },
    formatDate(datestr) {
      if (dayjs(datestr).isValid()) return dayjs(datestr).format("YYYY/MM/DD");
      return "";
    },
    SetOrderStatusConfirm() {
      let orderStatus = this.modelMsg.data;
      if (!common.IsNumber(orderStatus)) return;

      server.SetOrderStatus({ headerId: this.DetailInfo.id, orderStatus: orderStatus }, (apRlt) => {
        if (apRlt != null && apRlt.msg == "操作成功") {
          this.CloseModal();
          this.GetData();
        }
      })
    },
    SetOrderStatus(NewStatus) {
      event.preventDefault()
      if (this.DetailInfo.id == null || this.DetailInfo.id == 0) return;


      if (this.driver.status == NewStatus) {
        this.modelMsg.data = '';
        this.modelMsg.iscritical = false;
        switch (NewStatus) {
          case 2:
            this.modelMsg.title = `已接單`
            break;
          case 3:
            this.modelMsg.title = `已聯絡`
            break;
          case 4:
            this.modelMsg.title = `配送中`
            break;
          case 5:
            this.modelMsg.title = `已配送完成`
            break;
          case 6:
            this.modelMsg.title = `已為異常狀態`
            this.modelMsg.iscritical = true;
            break;
        }

        this.modelMsg.IsActive = true;
        this.modelMsg.IsAlert = true;
        return;
      }



      this.modelMsg.msg = `單號:${this.DetailInfo.number}`;
      this.modelMsg.data = NewStatus;
      this.modelMsg.iscritical = false;
      switch (NewStatus) {
        case 2:
          this.modelMsg.title = `確認是否接單?`
          break;
        case 3:
          this.modelMsg.title = `確認是否己聯絡?`
          break;
        case 4:
          this.modelMsg.title = `確認是否開始配送?`
          break;
        case 5:
          this.modelMsg.title = `確認是否配送完成?`
          break;
        case 6:
          this.modelMsg.title = `確認是否變更為異常狀態?`
          this.modelMsg.iscritical = true;
          break;
      }

      this.modelMsg.IsActive = true;
      this.modelMsg.IsAlert = false;
      // $("#modalhome1").modal({ show: true });
    },

    ShowMessage(title, msg1) {
      this.modelMsg.data = '';
      this.modelMsg.iscritical = false;
      this.modelMsg.title = title
      this.modelMsg.msg = msg1
      this.modelMsg.IsActive = true;
      this.modelMsg.IsAlert = true;

    },
    driverReport() {
      event.preventDefault()

      if (this.DetailInfo.id == null || this.DetailInfo.id == 0) return;
      if (String(this.customerReportMsg).trim() == "") {
        this.ShowMessage("客戶回報", "請填寫配送問題或備註")

        return false;
      }
      server.driverReport({ detailId: this.DetailInfo.id, message: this.customerReportMsg }, (apRlt) => {
        console.log("aprlt", apRlt)
        if (apRlt != null && apRlt.msg == "操作成功") {
          this.customerReportMsg = "";
          this.ShowMessage("送出問題備註", "己送出")
          this.GetData();
        } else {
          this.ShowMessage("送出問題備註", apRlt.message)
        }
      })

    },
    UpdateDeliveryReport() {
      event.preventDefault()

      if (this.DetailInfo.id == null || this.DetailInfo.id == 0) return;

      server.UpdateDeliveryFile({ headerId: this.DetailInfo.id, filePath: this.filelist.join(',') }, (apRlt) => {
        console.log("aprlt", apRlt)
        if (apRlt != null && apRlt.msg == "操作成功") {

          this.ShowMessage("送出修改", "己保存")
          this.GetData();
        } else {
          this.ShowMessage("送出修改", apRlt.message)
        }
      })

    },
    GetData() {
      server.GetDeliveryData(this.queryObj, (jshdata) => {

        this.driver.driverId = jshdata.driverId
        this.driver.driverName = jshdata.driverName;
        this.driver.carNumber = jshdata.carNumber
        this.driver.assignDate = dayjs(jshdata.takeDate).format("YYYY-MM-DD")
        this.driver.assignUser = jshdata.assignUser

        this.driver.filePath = jshdata.filePath
        this.driver.status = Number(jshdata.status)
        this.driver.deliveryStatusList = jshdata.deliveryStatusList
        if (this.driver.filePath == null || this.driver.filePath == "") {
          this.filelist = []
        } else {
          this.filelist = String(this.driver.filePath).split(',')
        }
      })
      server.GetDetailByNumber(this.queryObj, (jshdata) => {
        this.DetailInfo = jshdata;

        //console.log("DetailInfo", jshdata)
      })
      //server.GetDetailList(this.queryObj, (data) => { console.log(data) });
      server.GetDriverReport(this.queryObj, (jshdata) => {
        //console.log(data); 
        jshdata.sort((a, b) => { return a.id - b.id })
        //console.log(jshdata)
        this.DriverReportList = jshdata
      });

    },
    GetDataMore() {
      this.queryObj.pageSize = this.queryObj.pageSize * 2;
      this.GetData();
    }
  }
}
</script>


                                                                           