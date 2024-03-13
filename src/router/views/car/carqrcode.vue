<style>
ul.main-list li {
  display: inline-block;
  width: 24.3%;
  padding: 8px;
}
</style>

<template>
  <div>


    <div>
      <div class="header">
        <div class="tf-container">
          <div class="tf-statusbar d-flex justify-content-center align-items-center">
            <a href="/" class="back-btn"> <i class="icon-left"></i> </a>
            <h3>掃描QRCODE</h3>
          </div>
        </div>
      </div>
      <div class="wrap-qr">
        <div class="tf-container">
          <h2 class="fw_6 text-center">請確認對準後，下方出現編號後即可送出</h2>
          <div class="logo-qr" v-show="!isCameraOpen">
            <img src="images/scan-qr/qrcode1.png" alt="image" @click="StartCamera">
          </div>
          <div v-show="isCameraOpen">
            <div id="qr-code-full-region"></div>
          </div>
          <div class="group-input mt-3">
            <input type="text" placeholder="配送單號" v-model.trim="queryObj.keyword">
          </div>
        </div>
      </div>

      <div class="bottom-navigation-bar bottom-btn-fixed">
        <div class="tf-container d-flex ">
          <a href="javascript:;" @click="SendConfirm" class="tf-btn accent medium">確認送出</a>
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
        <div class="bottom" :class="modelMsg.IsAlert ? 'OneBottomBtn' : ''">
          <a href="#" class="btn-hide-modal" :class="modelMsg.iscritical ? 'critical_color' : 'primary_color'"
            data-dismiss="modal" aria-label="Close" @click="ContinueScan()" v-if="modelMsg.IsAlert == false">繼續掃瞄</a>
          <a href="javascript:;" class="secondary_color btn-hide-modal" data-dismiss="modal" aria-label="Close"
            @click="CloseModal()">{{ modelMsg.IsAlert == false ? '查詢訂單' : '確認' }}</a>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>

import { server } from "@/api";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
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
        data: '',
      },
      MyUser: {},
      queryObj: { keyword: '' },
      html5QrcodeScanner: null,
      isCameraOpen: false,
    }

  },
  mounted() {
    let user = localStorage.getItem('user')
    if (user == null) {
      return;
    }
    this.MyUser = JSON.parse(user)
    this.$nextTick(() => {
      this.StartCamera();
    })
  },
  methods: {
    ShowMessage(title, msg1) {
      this.modelMsg.data = '';
      this.modelMsg.iscritical = false;
      this.modelMsg.title = title
      this.modelMsg.msg = msg1
      this.modelMsg.IsActive = true;
      this.modelMsg.IsAlert = true;

    },
    ConfirmMessage(title, msg1) {
      this.modelMsg.data = '';
      this.modelMsg.iscritical = false;
      this.modelMsg.title = title
      this.modelMsg.msg = msg1
      this.modelMsg.IsActive = true;
      this.modelMsg.IsAlert = false;

    },
    CloseModal() {
      if (this.modelMsg.title == "配送單號") {
        this.$router.push(`/?number=${this.queryObj.keyword}`);
      }
      this.queryObj.keyword = '';
      this.modelMsg.IsActive = false;
      this.modelMsg.IsAlert = false;
    },
    ContinueScan() {
      this.modelMsg.IsActive = false;
      this.modelMsg.IsAlert = false;
      this.queryObj.keyword = '';
      this.createScan();
    },
    createScan() {
      if (this.html5QrcodeScanner != null && this.html5QrcodeScanner.getState() == 3) {
        //console.log("getstate", this.html5QrcodeScanner.getState())
        this.html5QrcodeScanner.resume();
      } else {

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
        };
        this.html5QrcodeScanner = new Html5QrcodeScanner(
          "qr-code-full-region",
          config,
          false
        );
        this.html5QrcodeScanner.render((decodedText) => {

          this.queryObj.keyword = String(decodedText).trim();
          this.isCameraOpen = false; // 设置相机状态为关闭
          this.closeCamera()
        });
      }
      this.isCameraOpen = true;
    },

    closeCamera() {
      this.isCameraOpen = false; // 设置相机状态为关闭
      if (this.html5QrcodeScanner && this.html5QrcodeScanner.getState() == 2) {
        //console.log("getstate", this.html5QrcodeScanner.getState())
        this.html5QrcodeScanner.pause();
      }
    },

    StartCamera() {

      if (!this.isCameraOpen) {
        this.createScan();
      } else {
        this.closeCamera();
      }
    },
    SendConfirm() {
      if (this.queryObj.keyword == '') {
        this.ShowMessage('掃描QRCODE', '請先掃描QRCODE')
        return;
      }


      server.SetDeliveryAssign({ number: this.queryObj.keyword, driverId: this.MyUser.supplier_id }, (apRlt) => {
        if (apRlt != null && apRlt.msg == "操作成功") {
          //this.CloseModal();
          //this.$router.push(`/?number=${this.queryObj.keyword}`);
          this.ConfirmMessage("配送單號", `己接單號:${this.queryObj.keyword}`)
          //this.queryObj.keyword = '';
        } else {
          this.ShowMessage("掃描QRCODE錯誤", apRlt.result)
        }
      })
    }
  }
}
</script>
