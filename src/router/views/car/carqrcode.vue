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
            <h2 class="tf-btn light medium" @click="closeCamera">關閉相機</h2>
          </div>
          <div class="group-input mt-3">
            <input type="text" class="text-center" placeholder="配送單號" v-model.trim="queryObj.keyword">
          </div>
        </div>
      </div>
      <div class="tf-spacing-60"></div>
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
//import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { useHtml5QrCode } from '@/api/html5-qr-code'
import VConsole from 'vconsole';
export default {
  setup() {

  },
  data() {
    return {
      cameraSupported: false,
      html5QrCode: null,
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
    // this.MyUser = JSON.parse(user)
    // this.$nextTick(() => {
    //   this.StartCamera();
    // })
    if (this.$route.query.vConsole == "1") {
      new VConsole().show();
    }
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
    qrCodeSuccessCallback(decodedText) {
      this.queryObj.keyword = String(decodedText).trim();
      this.isCameraOpen = false;
      this.closeCamera()
    },
    createScan() {
      if (this.cameraSupported == false) {
          this.checkCameraSupport();
          return;
      }
      if (this.html5QrCode == null) {
        this.html5QrCode = useHtml5QrCode('qr-code-full-region')
      }
      this.html5QrCode.start(this.qrCodeSuccessCallback)
      this.isCameraOpen = true;
    },
    closeCamera() {
      this.isCameraOpen = false;
      this.html5QrCode.handleStop()
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
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                console.log('相機許可權已獲得');
                this.cameraSupported = true;
                stream.getTracks().forEach(track => track.stop()); // 關閉相機流
            } catch (error) {
                console.error('無法獲得相機許可權或相機不支持：');
                this.cameraSupported = false;
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
          //this.ConfirmMessage("配送單號", `己接單號:${this.queryObj.keyword}`)
          this.ShowMessage("掃描QRCODE錯誤", apRlt.result)
        }
      })
    }
  }
}
</script>
