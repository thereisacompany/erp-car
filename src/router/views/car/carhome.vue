<style>
#qr-code-full-region button {
  color: red;
}

#qr-code-full-region img {
  width: 80%;
  max-height: 70vh;
}

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
  transition: all 0.2s ease-in-out;
}

.xprogress-bar li:first-child:before {
  left: 0;
}

.xprogress-bar li:last-child:before {
  right: 0;
  left: auto;
}

.xprogress-bar span {
  transition: opacity 0.3s ease-in-out;
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
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%208%208%22%3E%3Cpath%20fill%3D%22%23ed1c24%22%20d%3D%22M4%200l4%208H0z%22%2F%3E%3C%2Fsvg%3E");
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
</style>

<template>
  <div>
    <div class="app-header">
      <div class="tf-container">
        <div
          class="tf-topbar d-flex justify-content-between align-items-center"
        >
          <a
            class="user-info d-flex justify-content-between align-items-center"
            href="/profile"
          >
            <img src="images/user/user1.jpg?update=1" alt="image" />

            <div class="content">
              <h4 class="white_color">{{ User.username }}</h4>
              <p class="white_color fw_4">
                員工編號: {{ User.LoginName }} / 車號:
                {{ User.licensePlateNumber }}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="card-secton">
      <div class="tf-container">
        <div class="tf-balance-box">
          <div class="balance">
            <div class="row">
              <div class="col-3 br-right">
                <div class="inner-left">
                  <p class="text-center">
                    {{ IsQueryToday ? "今日任務" : "歷史任務" }}
                  </p>
                  <h3 class="text-center">{{ TotalInfo.all }}</h3>
                </div>
              </div>
              <div class="col-2 br-right">
                <div class="inner-left">
                  <p class="success_color text-center">已完成</p>
                  <h3 class="success_color text-center">
                    {{ TotalInfo.done }}
                  </h3>
                </div>
              </div>
              <div class="col-2 br-right">
                <div class="inner-left">
                  <p class="warning_color text-center">未完成</p>
                  <h3 class="warning_color text-center">
                    {{ TotalInfo.doing }}
                  </h3>
                </div>
              </div>
              <div class="col-2 br-right">
                <div class="inner-left">
                  <p class="critical_color text-center">異常</p>
                  <h3 class="critical_color text-center">
                    {{ TotalInfo.abnormal }}
                  </h3>
                </div>
              </div>
              <div class="col-3">
                <div class="inner-right">
                  <p>今天日期:</p>
                  <h3>
                    <span>{{ today }}</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div class="wallet-footer">
            <ul class="d-flex justify-content-between align-items-center">
              <li class="wallet-card-item">
                <a class="fw_6" href="javascript:;" @click="GetDataDay(1)">
                  <img
                    src="images/icon/index_service6.png"
                    style="width: 60px"
                  />
                  所有送貨單
                </a>
              </li>
              <li class="wallet-card-item">
                <a
                  class="fw_6 text-center"
                  id="btn-popup-down"
                  @click="toggleOpenRecodeModal"
                  style="cursor: pointer"
                >
                  <img
                    src="images/icon/index_service2.png"
                    style="width: 60px"
                  />
                  近期查詢
                </a>
              </li>
              <li class="wallet-card-item">
                <a
                  class="fw_6 btn-card-popup"
                  href="javascript:;"
                  @click="toggleOpenSearchModal"
                >
                  <img
                    src="images/icon/index_service5.png"
                    width="34"
                    style="width: 60px"
                  />
                  日期搜尋
                </a>
              </li>
              <li class="wallet-card-item">
                <a class="fw_6" href="tel:02-12345678">
                  <img
                    src="images/icon/index_service4.png"
                    width="34"
                    style="width: 60px"
                  />
                  聯絡客服
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bill-content mt-5 mb-9">
    <div class="tf-container panel-open">
      <div class="box-search mt-3 mb-3">
        <div class="input-field">
          <span class="icon-search" @click="GetData()"></span>
          <input
            required
            class="search-field value_input"
            placeholder="快速派發單查詢"
            type="text"
            v-model="queryObj.keyword"
            v-on:keyup.enter="GetData"
          />
          <span
            class="icon-clear"
            @click="
              queryObj.keyword = '';
              GetData();
            "
          ></span>
        </div>
        <span class="icon-qrcode4" @click="StartCamera"></span>
      </div>
      <div v-show="isCameraOpen">
        <div id="qr-code-full-region"></div>
      </div>
      <h3 class="fw_6 d-flex mt-3 mb-1">
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12.25" cy="12" r="9.5" stroke="#717171"></circle>
          <path
            d="M17.033 11.5318C17.2298 11.3316 17.2993 11.0377 17.2144 10.7646C17.1293 10.4914 16.9076 10.2964 16.6353 10.255L14.214 9.88781C14.1109 9.87213 14.0218 9.80462 13.9758 9.70702L12.8933 7.41717C12.7717 7.15989 12.525 7 12.2501 7C11.9754 7 11.7287 7.15989 11.6071 7.41717L10.5244 9.70723C10.4784 9.80483 10.3891 9.87234 10.286 9.88802L7.86469 10.2552C7.59257 10.2964 7.3707 10.4916 7.2856 10.7648C7.2007 11.038 7.27018 11.3318 7.46702 11.532L9.2189 13.3144C9.29359 13.3905 9.32783 13.5 9.31021 13.607L8.89692 16.1239C8.86027 16.3454 8.91594 16.5609 9.0533 16.7308C9.26676 16.9956 9.6394 17.0763 9.93735 16.9128L12.1027 15.7244C12.1932 15.6749 12.3072 15.6753 12.3975 15.7244L14.563 16.9128C14.6684 16.9707 14.7807 17 14.8966 17C15.1083 17 15.3089 16.9018 15.4469 16.7308C15.5845 16.5609 15.6399 16.345 15.6033 16.1239L15.1898 13.607C15.1722 13.4998 15.2064 13.3905 15.2811 13.3144L17.033 11.5318Z"
            stroke="#717171"
            stroke-width="1.25"
          ></path>
        </svg>
        {{ IsQueryToday ? "今日" : "歷史" }}派發出貨單
        <span v-if="TotalInfo.all != 0">
          ({{ DepotHeadList.length }}/{{ TotalInfo.all }})</span
        >
      </h3>
      <hr class="mt-2" />
      <ul class="mt-3 mb-5">
        <li
          class="list-card-invoice"
          v-for="(a1, aidx) in DepotHeadList"
          :key="'DepotHeadList' + aidx"
        >
          <div class="logo">
            <img src="images/icon/service_icon1.png" />
          </div>
          <div class="content-right">
            <h4>
              <a href="javascript:;" @click="GoDetail(a1)"
                >訂單編號: {{ a1.number }}
                <span :class="formatdStatusCSS(a1.dstatus)">{{
                  formatdStatus(a1.dstatus)
                }}</span>
              </a>
            </h4>
            <div>
              <span
                class="btn btn-success btn-sm"
                v-if="a1.subType == '配送單'"
                @click="GoDetail(a1)"
                >配送單</span
              >
              <span
                class="btn btn-warning btn-sm"
                v-if="a1.subType == '門市取貨'"
                >門市取貨</span
              >
              <span
                class="btn btn-warning btn-sm"
                v-if="a1.subType == '門市取貨派送'"
                >門市取貨派送</span
              >
            </div>
            <p>地址: {{ a1.address }}</p>
            <p>
              收件人: {{ a1.receiveName }} &nbsp;&nbsp;&nbsp;電話:{{
                a1.cellphone
              }}
            </p>
            <ol
              class="xprogress-bar mt-5"
              :class="a1.dstatus == 5 ? 'doneok' : a1.dstatus == 6 ? 'bad' : ''"
            >
              <li :class="a1.dstatus >= 2 ? 'is-active' : ''">
                <span>接單中</span>
              </li>
              <li :class="a1.dstatus >= 3 ? 'is-active' : ''">
                <span>聯絡中</span>
              </li>
              <li :class="a1.dstatus >= 4 ? 'is-active' : ''">
                <span>配送中</span>
              </li>
              <li :class="a1.dstatus >= 5 ? 'is-active' : ''">
                <span>配送完成</span>
              </li>
            </ol>
          </div>
        </li>
      </ul>

      <div class="bottom-navigation-bar">
        <div class="tf-container">
          <ul class="tf-navigation-bar">
            <li class="today" :class="IsQueryToday ? 'active' : ''">
              <a
                class="fw_4 d-flex justify-content-center align-items-center flex-column"
                href="javascript:;"
                @click="GetDataDay(1)"
                ><svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12.25" cy="12" r="9.5" stroke="#717171" />
                  <path
                    d="M17.033 11.5318C17.2298 11.3316 17.2993 11.0377 17.2144 10.7646C17.1293 10.4914 16.9076 10.2964 16.6353 10.255L14.214 9.88781C14.1109 9.87213 14.0218 9.80462 13.9758 9.70702L12.8933 7.41717C12.7717 7.15989 12.525 7 12.2501 7C11.9754 7 11.7287 7.15989 11.6071 7.41717L10.5244 9.70723C10.4784 9.80483 10.3891 9.87234 10.286 9.88802L7.86469 10.2552C7.59257 10.2964 7.3707 10.4916 7.2856 10.7648C7.2007 11.038 7.27018 11.3318 7.46702 11.532L9.2189 13.3144C9.29359 13.3905 9.32783 13.5 9.31021 13.607L8.89692 16.1239C8.86027 16.3454 8.91594 16.5609 9.0533 16.7308C9.26676 16.9956 9.6394 17.0763 9.93735 16.9128L12.1027 15.7244C12.1932 15.6749 12.3072 15.6753 12.3975 15.7244L14.563 16.9128C14.6684 16.9707 14.7807 17 14.8966 17C15.1083 17 15.3089 16.9018 15.4469 16.7308C15.5845 16.5609 15.6399 16.345 15.6033 16.1239L15.1898 13.607C15.1722 13.4998 15.2064 13.3905 15.2811 13.3144L17.033 11.5318Z"
                    stroke="#717171"
                    stroke-width="1.25"
                  />
                </svg>
                今日任務</a
              >
            </li>
            <li :class="IsQueryToday ? '' : 'active'">
              <a
                class="fw_4 d-flex justify-content-center align-items-center flex-column"
                href="javascript:;"
                @click="GetDataDay(2)"
                ><i class="icon-history"></i> 歷史任務</a
              >
            </li>
            <li>
              <a
                class="fw_4 d-flex justify-content-center align-items-center flex-column"
                href="javascript:;"
                @click="StartCamera"
                ><i class="icon-scan-qr-code"></i>
              </a>
            </li>

            <li>
              <a
                class="fw_4 d-flex justify-content-center align-items-center flex-column"
                href="/profile"
                ><i class="icon-user-outline"></i> 基本資料</a
              >
            </li>
            <li>
              <a
                class="fw_6 d-flex justify-content-center align-items-center flex-column"
                @click="logout"
                href="javascript:;"
                ><i class="icon-signout"></i> 登出</a
              >
            </li>
          </ul>
          <!-- <span class="line"></span> -->
        </div>
      </div>

      <div class="tf-panel down" :class="openRecodeModal ? 'panel-open' : ''">
        <div class="panel_overlay"></div>
        <div class="panel-box panel-down" style="left: 0">
          <div class="header bg_white_color">
            <div class="tf-container">
              <div
                class="tf-statusbar d-flex justify-content-center align-items-center"
              >
                <a
                  href="javascript:;"
                  class="clear-panel"
                  @click="toggleOpenRecodeModal"
                >
                  <i class="icon-close1"></i>
                </a>
                <h3>快速出貨單紀錄</h3>
              </div>
            </div>
          </div>
          <div class="wrap-transfer mb-5">
            <div class="tf-container" v-if="recodeListData.length > 0">
              <a
                href="javascript:;"
                class="action-sheet-transfer"
                v-for="recode in recodeListData"
                :key="recode"
                style="padding: 15px 0"
              >
                <div class="icon"><img src="images/user/user1.jpg" /></div>
                <div class="content" @click="GoDetail(recode)">
                  <h4 class="fw_6">{{ getStatus(recode.status) }}</h4>
                  <p style="margin: 0">
                    出貨單單號: {{ recode.defaultNumber }}
                  </p>
                </div>
              </a>
            </div>
            <span style="padding: 15px 10px; margin: 10px"
              >＊紀錄資料為近10筆查詢記錄＊</span
            >
          </div>
        </div>
      </div>

      <div
        class="tf-panel card-popup"
        :class="openSearchModal ? 'panel-open' : ''"
      >
        <div class="panel_overlay"></div>
        <div class="panel-box panel-down" style="left: 0">
          <div class="header">
            <div class="tf-container">
              <div
                class="tf-statusbar d-flex justify-content-center align-items-center"
              >
                <a
                  href="javascript:;"
                  class="clear-panel"
                  @click="toggleOpenSearchModal"
                >
                  <i class="icon-left"></i>
                </a>
                <h3>快速查詢訂單</h3>
              </div>
            </div>
          </div>
          <!-- <span style="color: red">
          queryObj.beginTime-{{ queryObj.beginTime }}</span
        > -->
          <div class="content-card mt-3 mb-5">
            <div class="tf-container">
              <form class="tf-form mt-8">
                <div class="group-input">
                  <label>開始日期</label>
                  <input type="date" v-model="queryObj.beginTime" />
                </div>
                <div class="group-input">
                  <label>結束日期</label>
                  <input type="date" v-model="queryObj.endTime" />
                </div>
                <div class="tf-spacing-20"></div>
                <!-- <div class="bottom-navigation-bar bottom-btn-fixed st2">
                <button @click="searchDate">快速查找</button>
              </div> -->
              </form>
              <button
                @click="searchDate"
                style="background-color: #f2cc4d; color: black"
              >
                快速查找
              </button>
              <div class="tf-spacing-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { server } from "@/api";
import dayjs from "dayjs";
import { useHtml5QrCode } from "@/api/html5-qr-code";
//import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

export default {
  setup() {},
  data() {
    return {
      cameraSupported: false,
      html5QrCode: null,
      html5QrcodeScanner: null,
      isCameraOpen: false,

      DepotHeadList: [],
      TotalInfo: { all: 0, doing: 0, abnormal: 0, done: 0 },
      queryObj: {
        currentPage: 1,
        pageSize: 10,
        driverId: "",
        number: "",
        keyword: "",
        beginTime: "",
        endTime: "",
      },
      User: {
        LoginName: "",
        Status: 0,
        UserID: 0,
        username: "",
        licensePlateNumber: "",
        supplier_id: "",
      },
      openSearchModal: false,
      openRecodeModal: false,
      recodeListData: [],
    };
  },
  mounted() {
    let user = localStorage.getItem("user");
    if (user == null) {
      return;
    }
    // console.log("this.$route.query", this.$route.query['number'])

    let MyUser = JSON.parse(user);
    this.User.LoginName = MyUser.LoginName;
    this.User.Status = MyUser.Status;
    this.User.UserID = MyUser.UserID;
    this.User.username = MyUser.username;
    this.User.licensePlateNumber = MyUser.licensePlateNumber;
    this.User.supplier_id = MyUser.supplier_id;
    this.queryObj.driverId = this.User.supplier_id;
    this.queryObj.keyword = this.$route.query["number"] || "";

    if (this.queryObj.keyword != "") {
      this.GetData();
    } else {
      this.$nextTick(() => {
        this.GetDataDay(1);
      });
    }
  },
  computed: {
    today() {
      return dayjs().format("YYYY/MM/DD");
    },
    IsQueryToday() {
      console.log(
        "IsQueryToday",
        this.queryObj.beginTime == dayjs().format("YYYY-MM-DD 00:00:00")
      );
      if (this.queryObj.beginTime == dayjs().format("YYYY-MM-DD 00:00:00")) {
        return true;
      }
      return false;
    },
  },
  watch: {
    cameraSupported: {
      immediate: true,
      handler(newVal, oldVal) {
        if (oldVal == false && newVal == true) {
          this.createScan();
        }
      },
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push({ name: "login" });
    },
    qrCodeSuccessCallback(decodedText) {
      this.queryObj.keyword = String(decodedText);
      this.isCameraOpen = false;
      this.GetData();
      this.closeCamera();
    },
    createScan() {
      //if (this.cameraSupported == false) return;
      if (this.cameraSupported == false) {
        this.checkCameraSupport();
        return;
      }
      if (this.html5QrCode == null) {
        this.html5QrCode = useHtml5QrCode("qr-code-full-region");
      }
      this.html5QrCode.start(this.qrCodeSuccessCallback);
      this.isCameraOpen = true;
    },
    closeCamera() {
      this.isCameraOpen = false;
      this.html5QrCode.handleStop();
    },
    StartCamera() {
      if (!this.isCameraOpen) {
        this.createScan();
      } else {
        this.closeCamera();
      }
    },
    async checkCameraSupport() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        console.log("相機許可權已獲得");
        this.cameraSupported = true;
        stream.getTracks().forEach((track) => track.stop()); // 關閉相機流
      } catch (error) {
        console.error("無法獲得相機許可權或相機不支持：");
        this.cameraSupported = false;
      }
    },
    formatdStatusCSS(dStatus) {
      switch (Number(dStatus)) {
        case 0:
          return "warning_color";
        case 1:
          return "warning_color";
        case 2:
          return "warning_color";
        case 3:
          return "warning_color";
        case 4:
          return "warning_color";
        case 5:
          return "success_color";
        case 6:
          return "critical_color";
        default:
          return "";
      }
    },
    formatdStatus(dStatus) {
      switch (Number(dStatus)) {
        case 0:
          return "未派發";
        case 1:
          return "已派發";
        case 2:
          return "已接單";
        case 3:
          return "聯絡中";
        case 4:
          return "配送中";
        case 5:
          return "配送完成";
        case 6:
          return "配送異常";

        default:
          return dStatus;
      }
    },
    GoDetail(SubItem) {
      ///deliverdetail
      this.$router.push(
        `/deliverdetail?headerId=${SubItem.id}&number=${SubItem.number}`
      );
    },
    GetDataDay(iNum) {
      this.queryObj.number = "";
      this.queryObj.keyword = "";
      this.queryObj.beginTime = "";
      this.queryObj.endTime = "";
      if (iNum == 1) {
        this.queryObj.beginTime = dayjs().format("YYYY-MM-DD 00:00:00");
        this.queryObj.endTime = dayjs().format("YYYY-MM-DD 23:59:59");
      }
      this.GetData();
    },
    GetData() {
      if (this.queryObj.keyword != "") {
        this.queryObj.beginTime = "";
        this.queryObj.endTime = "";
      }
      server.GetDepotHeadList(this.queryObj, (apData) => {
        this.DepotHeadList = apData.rows;
        this.TotalInfo = apData.total;
        if (this.DepotHeadList.length == 1 && this.queryObj.keyword != "") {
          this.GoDetail(this.DepotHeadList[0]);
        }
      });
      this.getLocalStorage();
    },
    GetDataMore() {
      this.queryObj.pageSize = this.queryObj.pageSize * 2;
      this.GetData();
    },
    // 點擊日期搜尋，切換開啟快速查詢訂單modal
    toggleOpenSearchModal() {
      this.openSearchModal = !this.openSearchModal;
      this.queryObj.beginTime = "";
      this.queryObj.endTime = "";
    },
    // 點擊近期查詢，切換開啟快速出貨單紀錄modal
    toggleOpenRecodeModal() {
      this.openRecodeModal = !this.openRecodeModal;
    },
    // 日期搜尋
    searchDate() {
      console.log("queryObj", this.queryObj);
      this.GetData();
      this.toggleOpenSearchModal();

      setTimeout(() => {
        this.queryObj.beginTime = "";
        this.queryObj.endTime = "";
      }, 500);
    },
    // 取得local storage紀錄塞回出貨單紀錄modal
    getLocalStorage() {
      const item = localStorage.getItem(`recode-${this.User.UserID}`);
      if (item) {
        try {
          const parsedItem = JSON.parse(item);
          if (this.User.UserID == parsedItem.userId) {
            this.recodeListData = parsedItem.recodeList;
          }
        } catch (e) {
          console.error("Error parsing localStorage value", e);
        }
      }
    },
    // 取得訂單狀態
    getStatus(value) {
      // dstatus (2:接單中 3:聯絡中 4:配送中 5:配送完成)
      switch (value) {
        case 0:
          return "未派發";
        case 1:
          return "已派發";
        case 2:
          return "接單中";
        case 3:
          return "聯絡中";
        case 4:
          return "配送中";
        case 5:
          return "配送完成";
        default:
          return "處理中";
      }
    },
  },
};
</script>
