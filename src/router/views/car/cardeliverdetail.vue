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

.upload__box {
}

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

.OneBottomBtn {
  grid-template-columns: 1fr !important;
}

.video-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.video-container video {
  width: 100%;
  height: auto;
  display: block;
}

.fw_6 {
  position: relative;
}

.actions {
  /* position: absolute;
  top: 1px;
  left: 80px; */
  font-size: 14px;
}

.actions a {
  color: #888;
  margin-right: 10px;
}

.sub-history {
  background-color: #f8f8f8;
  padding: 5px;
  margin: 5px 0px;
  border: 1px solid #aaa;
  border-radius: 5px;
}

.sub-history .btn-wrap {
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
}

.sub-history input[type="date"],
.sub-history input[type="time"] {
  padding: 8px 15px;
  text-align: center;
  letter-spacing: 2px;
}

table {
  border: 1px solid #aaa;
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}

table td,
table th {
  border-top: 1px solid #00000011;
  border-bottom: 1px solid #00000011;
  padding: 3px 0px;
  margin: 0px;
  text-align: left;
  vertical-align: middle;
  font-size: 14px;
}

td {
  color: #888;
}

tr:nth-child(odd) {
  background-color: #ffffff99;
}

tr:nth-child(even) {
  background-color: #ffffff11;
}

/*
tr.isDefault td {
  color: blue;
} */

.table-container {
  max-height: 100px;
  /* 根据需要调整高度 */
  overflow-y: auto;
}

.delete-file {
  position: absolute;
  z-index: 9;
  top: -12px;
  right: -10px;
}

.phoneNum-checkbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-title {
  font-size: 18px;
  font-weight: 700;
}

.start-time,
.end-time {
  width: 47%;
}
</style>

<template>
  <div>
    <div class="app-header st1">
      <div class="tf-container">
        <div class="tf-topbar d-flex justify-content-center align-items-center">
          <a href="/" class="back-btn">
            <i class="icon-left white_color"></i
          ></a>
          <h3 class="white_color">配送單號: {{ DetailInfo.number }}</h3>
        </div>

        <h1 class="text-center white_color mt-2">
          {{ formatAddressArea(DetailInfo.address) }}
        </h1>
      </div>
    </div>
    <div id="app-wrap" style="margin-top: -73px; padding-top: 0">
      <div class="wrap-card-detail mt-3">
        <div class="tf-container">
          <div class="tf-atm-card">
            <!-- <div class="heading">
              <a><i class="icon-qr-code"></i></a>
              <a id="btn-popup-up"><i class="icon-user-outline"></i></a>
            </div> -->
            <ol class="xprogress-bar mt-5">
              <li v-if="driver.status <= 1" class="is-active">
                <span>未接單</span>
              </li>
              <li v-else :class="formatDriverStatus(2)"><span>接單中</span></li>
              <li :class="formatDriverStatus(3)"><span>聯絡中</span></li>
              <li :class="formatDriverStatus(4)"><span>配送中</span></li>
              <li :class="formatDriverStatus(5)"><span>配送完成</span></li>
            </ol>
            <h3 class="fw_6">
              <a href="javascript:;" class="white_color">
                <span
                  class="btn btn-success btn-sm"
                  v-if="DetailInfo.subType == '配送單'"
                  >配送單</span
                >
                <span
                  class="btn btn-warning btn-sm"
                  v-if="DetailInfo.subType == '門市取貨'"
                  >門市取貨</span
                >
                <span
                  class="btn btn-warning btn-sm"
                  v-if="DetailInfo.subType == '門市取貨派送'"
                  >門市取貨派送</span
                >
              </a>
            </h3>

            <div class="bottom d-flex justify-content-between">
              <div class="inner-left">
                <span class="fw_6 secondary2_color">預計配送日期</span>
                <p>
                  <a href="javascript:;">{{
                    formatDate(DetailInfo.agreedDelivery)
                  }}</a>
                </p>
              </div>
              <div class="inner-right">
                <span class="fw_6 secondary2_color">司機/車號</span>
                <p class="text-end">
                  <a href="#"
                    >{{ driver.driverName }} / {{ driver.carNumber }}</a
                  >
                </p>
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
            <li>
              訂單編號: <span>{{ DetailInfo.number }}</span>
            </li>
            <li>
              訂單日期: <span>{{ formatDate(DetailInfo.operTime) }} </span>
            </li>
            <li>
              訂單來源: <span>{{ DetailInfo.organName }}</span>
            </li>
            <li>
              處理人員: <span>{{ DetailInfo.creatorName }}</span>
            </li>
          </ul>
          <div class="tf-spacing-12"></div>
          <h3>收件人資訊</h3>
          <div class="tf-spacing-12"></div>
          <ul class="list-card-info">
            <li>
              收件人: <span>{{ DetailInfo.receiveName }} </span>
            </li>
            <li>
              電話: <span>{{ DetailInfo.cellphone }}</span>
            </li>
            <li>
              地址: <span>{{ DetailInfo.address }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="content-card mt-5">
        <div class="tf-container">
          <div class="tf-card-list bg_surface_color large">
            <div class="info">
              <a href="#" class="note-voucher">商品內容</a>
              <div class="tf-spacing-12"></div>
              <p
                v-for="(name1, nidx) in String(DetailInfo.materialsList).split(
                  ','
                )"
                :key="'materialsList' + nidx"
              >
                名稱：{{ name1 }}
              </p>
              <p>數量：{{ DetailInfo.materialCount }}</p>
              <p>型號：{{ DetailInfo.materialsModel }}</p>
              <p>規格：{{ DetailInfo.materialsStandard }}</p>
            </div>
          </div>
          <div class="tf-spacing-12"></div>
          <div class="tf-card-list bg_yellow large out-line">
            <div class="logo">
              <img src="images/user/user1.jpg?update=1" alt="image" />
            </div>
            <div class="info">
              <div></div>
              <h4 class="fw_6">客服提醒事項</h4>
              <p>{{ DetailInfo.remark }}&nbsp;</p>
              <p>安裝方式：{{ DetailInfo.install }}&nbsp;</p>
              <p>是否回收：{{ DetailInfo.recycle }}&nbsp;</p>
            </div>
          </div>
          <div class="tf-spacing-12"></div>

          <h3 class="auth-line fw_8">訂單狀態區</h3>
          <ul class="box-card">
            <li class="tf-card-list medium bt-line">
              <div class="logo">
                <img src="images/icon/index_service6.png" style="width: 43px" />
              </div>
              <div class="info">
                <h4 class="fw_6">
                  <a
                    href="javascript:;"
                    @click="SetOrderStatus(2)"
                    class="status-title"
                    >接單領貨</a
                  >
                </h4>
                <p>
                  {{ DetailInfo.depotList }}
                  {{ formatDeliveryStatus(2) ? "領貨完成" : "等待接單" }}
                </p>
              </div>
              <input
                type="checkbox"
                class="tf-checkbox circle-check"
                :checked="formatDeliveryStatus(2)"
                @click="SetOrderStatus(2)"
              />
            </li>
            <li class="tf-card-list medium bt-line" style="flex-wrap: wrap">
              <div class="logo">
                <img src="images/icon/index_service6.png" style="width: 43px" />
              </div>
              <div class="info">
                <h4 class="fw_6">
                  <a
                    href="javascript:;"
                    @click="SetOrderStatus(3)"
                    class="status-title"
                    >聯絡中</a
                  >
                </h4>
                <div class="phoneNum-checkbox">
                  <p>
                    連絡電話: {{ DetailInfo.cellphone }}
                    {{ DetailInfo.receiveName }}
                  </p>
                  <input
                    type="checkbox"
                    class="tf-checkbox circle-check"
                    :checked="formatDeliveryStatus(3)"
                    @click="SetOrderStatus(3)"
                  />
                </div>
                <div class="actions">
                  <a
                    href="javascript:;"
                    class="query-history"
                    @click="
                      IsAgreedDateHistory = false;
                      IsAgreedDateChange = !IsAgreedDateChange;
                      NewAgreed.date = '';
                      NewAgreed.startTime = '';
                      NewAgreed.endTime = '';
                    "
                  >
                    {{
                      IsAgreedDateChange == true
                        ? "取消修改約配日 ▲"
                        : "修改約配日 ▼"
                    }}
                  </a>
                  <a
                    href="javascript:;"
                    class="query-history"
                    @click="
                      IsAgreedDateChange = false;
                      IsAgreedDateHistory = !IsAgreedDateHistory;
                    "
                  >
                    {{
                      IsAgreedDateHistory == true ? "關閉記錄 ▲" : "查詢記錄 ▼"
                    }}
                  </a>
                </div>
                <div class="actions-content">
                  <div class="close-recode">
                    <div class="sub-history" v-if="IsAgreedDateChange == true">
                      <span>日期:</span
                      ><input
                        type="date"
                        :min="today"
                        v-model="NewAgreed.date"
                      />
                      <span>時間:</span>
                      <!-- <input
                        type="time"
                        :min="currentTime"
                        v-model="NewAgreed.time"
                        :disabled="!NewAgreed.date"
                      /> -->
                      <br />
                      <a-time-picker
                        class="start-time"
                        :disabled="!NewAgreed.date"
                        :disabledTime="() => disabledTime('start')"
                        :minuteStep="30"
                        :showNow="false"
                        v-model:value="NewAgreed.startTime"
                        placeholder="開始時間"
                        format="HH:mm"
                      />
                      <span>~</span>
                      <a-time-picker
                        class="end-time"
                        :disabled="!NewAgreed.startTime"
                        :disabledTime="() => disabledTime('end')"
                        :minuteStep="30"
                        :showNow="false"
                        v-model:value="NewAgreed.endTime"
                        placeholder="結束時間"
                        format="HH:mm"
                      />

                      <div class="btn-group btn-group-sm btn-wrap">
                        <a
                          href="javascript:;"
                          class="btn btn-primary"
                          @click="ChangeAgreedDate()"
                          >確認</a
                        >
                        <a
                          href="javascript:;"
                          class="btn btn-secondary"
                          @click="IsAgreedDateChange = false"
                          >取消</a
                        >
                      </div>
                    </div>
                    <div
                      class="sub-history table-container"
                      v-if="IsAgreedDateHistory == true"
                    >
                      <table>
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">日期</th>
                            <th scope="col">修改者</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(a1, a1idx) in driver.agreedDelivery"
                            :key="'agreed' + a1idx"
                            :class="a1.isDefault == true ? 'isDefault' : ''"
                          >
                            <th scope="row">{{ a1idx + 1 }}</th>
                            <td>{{ a1.datetime }}</td>
                            <td>{{ a1.name }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="btn-wrap" v-if="IsAgreedDateHistory == true">
                      <a
                        href="javascript:;"
                        class="btn btn-secondary btn-sm"
                        style="width: 100%"
                        @click="IsAgreedDateHistory = false"
                        >關閉記錄 ▲</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="tf-card-list medium bt-line">
              <div class="logo">
                <img src="images/icon/index_service6.png" style="width: 43px" />
              </div>
              <div class="info">
                <h4 class="fw_6">
                  <a
                    href="javascript:;"
                    @click="SetOrderStatus(4)"
                    class="status-title"
                    >配送中</a
                  >
                </h4>
                <p>{{ DetailInfo.address }}</p>
              </div>
              <input
                type="checkbox"
                class="tf-checkbox circle-check"
                :checked="formatDeliveryStatus(4)"
                @click="SetOrderStatus(4)"
              />
            </li>
            <li class="tf-card-list medium">
              <div class="logo">
                <img src="images/icon/index_service6.png" style="width: 43px" />
              </div>
              <div class="info">
                <h4 class="fw_6">
                  <a
                    href="javascript:;"
                    @click="SetOrderStatus(5)"
                    class="status-title"
                    >配送完成</a
                  >
                </h4>
                <p>客戶完成簽收</p>
              </div>
              <input
                type="checkbox"
                class="tf-checkbox circle-check"
                :checked="formatDeliveryStatus(5)"
                @click="SetOrderStatus(5)"
              />
            </li>
          </ul>
          <div class="tf-spacing-12"></div>
          <button class="btn btn-danger" @click="SetOrderStatus(6)">
            {{ formatDeliveryStatus(6) == true ? "異常訂單" : "設定異常訂單" }}
          </button>
          <div class="tf-spacing-12"></div>

          <h3 class="auth-line fw_8">司機回報區</h3>
          <template
            v-for="(r1, ridx) in DriverReportList"
            :key="'DriverReportList' + ridx"
          >
            <div class="tf-card-list bg_white large out-line">
              <div class="info">
                <h4 class="fw_6">司機備註回報</h4>
                <h5>{{ r1.datetime }}</h5>
                <p
                  v-for="(ss1, ssidx) in String(r1.message).split('\n')"
                  :key="'message' + ssidx"
                >
                  {{ ss1 }}
                </p>
              </div>
            </div>
            <div
              class="tf-spacing-12"
              v-if="r1.feedback != null && r1.feedback != ''"
            ></div>
            <div
              class="tf-card-list bg_yellow large out-line"
              v-if="r1.feedback != null && r1.feedback != ''"
            >
              <div class="logo">
                <img src="images/user/user1.jpg?update=1" alt="image" />
              </div>
              <div class="info">
                <h4 class="fw_6">客服回覆內容</h4>
                <p
                  v-for="(ss1, ssidx) in String(r1.feedback).split('\n')"
                  :key="'feedback' + ssidx"
                >
                  {{ ss1 }}
                </p>
              </div>
            </div>
            <div class="tf-spacing-12"></div>
          </template>

          <form class="tf-form mt-5">
            <div class="group-input">
              <label>配送問題備註</label>
              <textarea v-model="customerReportMsg" placeholder="客戶回饋...">
.</textarea
              >
            </div>
            <button class="btn btn-dark" @click="driverReport">
              送出問題備註
            </button>
            <div class="tf-spacing-12"></div>
            <div class="wrap-banks mt-3">
              <h3 class="auth-line fw_8">相關照片/影片上傳</h3>
              <div class="tf-spacing-12"></div>
              <ul class="bank-box">
                <li
                  v-for="(f1, fidx) in fileList"
                  :key="'file-' + fidx"
                  style="position: relative"
                >
                  <a
                    href="javascript:;"
                    v-if="driver.status != 5"
                    class="text-danger delete-file"
                    @click="DeleteFile1(f1)"
                    >&nbsp;<i class="bx bx-x" style="font-size: 25px"></i
                  ></a>
                  <span class="bank-list">
                    <img
                      class="logo-bank"
                      v-if="CheckIsImage(f1)"
                      :src="GetAccessFile1(f1)"
                      @click="ShowImage(f1)"
                    />
                    <img
                      class="logo-bank"
                      v-else-if="CheckIsVideo(f1)"
                      src="/images/playvideo.jpg"
                      @click="ShowImage(f1)"
                    />
                    <a
                      v-else
                      href="javascript:;"
                      @click="ShowImage(f1)"
                      style="word-break: break-all"
                    >
                      {{ f1.split("/").pop() }}</a
                    >
                  </span>
                </li>
              </ul>
            </div>
            <div class="tf-spacing-20"></div>
            <div class="upload__box">
              <div class="upload__btn-box">
                <label class="upload__btn">
                  <p>新增上傳照片/影片 <i class="icon-plus fw_7"></i></p>
                  <input
                    type="file"
                    id="uploadFile"
                    multiple=""
                    data-max_length="20"
                    class="upload__inputfile"
                    ref="file2"
                    @change="handleFileUpload"
                  />
                </label>
              </div>
              <div class="upload__img-wrap"></div>
            </div>
            <span class="d-block w-full text-center" style="color: #dc3545"
              >上傳完畢後，需按下送出修改</span
            >
            <div class="upload__img-wrap"></div>
            <div class="mt-5 st2">
              <a
                class="tf-btn accent large"
                href="javascript:;"
                id="btn-popup-down"
                @click="UpdateDeliveryReport"
                >送出修改</a
              >
            </div>
          </form>
        </div>
      </div>
    </div>
    <b-modal
      v-model="modelMsg.IsActive"
      id="modalhome1"
      centered
      title="Center modal"
      title-class="font-18"
      hide-footer
      hide-header
    >
      <div class="modal-content">
        <div class="heading">
          <h4 class="fw_6 text-center">
            {{ modelMsg.title }}
          </h4>
          <p
            class="fw_4 mt-2 text-center"
            v-for="(m1, m1idx) in String(modelMsg.msg).split('\n')"
            :key="'modelMsg-msg' + m1idx"
          >
            {{ m1 }}
          </p>
        </div>
        <div class="bottom" :class="modelMsg.IsAlert ? 'OneBottomBtn' : ''">
          <a
            href="javascript:void(0);"
            class="btn-hide-modal"
            :class="modelMsg.iscritical ? 'critical_color' : 'primary_color'"
            data-dismiss="modal"
            aria-label="Close"
            @click="SetOrderStatusConfirm"
            v-if="modelMsg.IsAlert == false"
            >確認</a
          >
          <a
            href="javascript:;"
            class="secondary_color btn-hide-modal"
            data-dismiss="modal"
            aria-label="Close"
            @click="CloseModal()"
            >{{ modelMsg.IsAlert == false ? "取消" : "確認" }}</a
          >
        </div>
      </div>
    </b-modal>
    <b-modal
      size="xl"
      v-model="showImageModal"
      title="顯示圖片"
      title-class="text-black font-18"
      body-class="p-3"
      centered
      hide-header
      hide-footer
    >
      <form>
        <div class="row text-center">
          <div class="col-12" v-if="showImageURL != ''">
            <img
              :src="showImageURL"
              max-width="100%"
              max-height="100%"
              style="max-width: 100%"
            />
          </div>
          <div class="col-12" v-show="showVideoURL != ''">
            <video
              ref="videoPlayer"
              playsinline
              controls
              preload="auto"
              autoplay
              loop
              muted
            >
              <source :src="showVideoURL" type="video/mp4" />
              您的瀏覽器不支援影片格式
            </video>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { server } from "@/api";
import common from "@/api/common";
import { TimePicker } from "ant-design-vue";
export default {
  setup() {},
  components: { ATimePicker: TimePicker },
  data() {
    return {
      modelMsg: {
        IsActive: false,
        IsAlert: false,
        title: "",
        msg: "",
        iscritical: false,
        callFunc: null,
        data: "",
      },
      queryObj: {
        number: "",
        headerId: "",
      },
      customerReportMsg: "",
      User: {
        LoginName: "",
        Status: 0,
        UserID: 0,
        UserName: "",
        CarNumber: "",
      },
      driver: {
        driverId: "",
        driverName: "",
        assignDate: "",
        carNumber: "",
        assignUser: "",
        filePath: "",
        status: 0,
        deliveryStatusList: [],
        reportList: [],
      },
      DriverReportList: [],
      fileList: [],
      DetailInfo: {},
      NewAgreed: {
        date: "",
        time: "",
      },
      IsAgreedDateChange: false,
      IsAgreedDateHistory: false,

      showImageURL: "",
      showVideoURL: "",
      showImageModal: false,
      today: dayjs().format("YYYY-MM-DD"),
      currentTime: dayjs().format("YYYY-MM-DDThh:mm"),
    };
  },
  mounted() {
    let user = localStorage.getItem("user");
    if (user == null) {
      return;
    }

    let MyUser = JSON.parse(user);
    //console.log("MyUser", MyUser)
    this.User.LoginName = MyUser.LoginName;
    this.User.Status = MyUser.Status;
    this.User.UserID = MyUser.UserID;
    this.User.UserName = MyUser.UserName;

    this.queryObj.number = this.$route.query.number || "";
    this.queryObj.headerId = this.$route.query.headerId || "";
    this.$nextTick(() => {
      // const video = this.$refs.videoPlayer;
      // console.log("video", video)
      // this.player = videojs(video, {}, function onPlayerReady() {
      //   console.log('onPlayerReady', this);
      // });
      this.GetData();
    });
    // const now = new Date();
    // const hours = String(now.getHours()).padStart(2, "0");
    // const minutes = String(now.getMinutes()).padStart(2, "0");
    // this.currentTime = `${hours}:${minutes}`;
    // document.getElementById('timePicker').setAttribute('min', currentTime);
    // console.log("currentTime", this.currentTime);
  },
  methods: {
    async handleFileUpload(event) {
      // console.log("file", event.target.files);
      const list = event.target.files;
      for (let i = 0; i < list.length; i++) {
        // console.log("list[i]", list[i]);
        if (list[i].size > 30720000) {
          this.ShowMessage("檔案上傳錯誤", `檔案大小不可大於30MB`);
          return;
        } else {
          // console.log("name", list[i].name);
          try {
            // const uploadPath = await server.UploadFile1({
            //   biz: "driver",
            //   file: list[i],
            // });
            // // console.log("uploadPath", uploadPath);
            // if (uploadPath != null) {
            //   this.fileList.push(uploadPath);
            // }
            const fileData = {
              biz: "driver",
              file: list[i],
            };
            let biz = !common.IsNullOrEmpty(fileData.headerId)
              ? fileData.headerId
              : "";
            let file = fileData.file;

            let APIUrl = `/systemConfig/upload`;
            const formData = new FormData();
            formData.append("biz", biz);
            formData.append("file", file);
            server
              .post(APIUrl, formData)
              .then((res) => {
                if (res != null && res.data != null && res.data.code == 200) {
                  let jshdata = res.data;
                  console.log("jshdata", jshdata.data);
                  this.fileList.push(jshdata.data);
                }
              })
              .catch(function (error) {
                console.log("error", error);
                return;
              });
          } catch (error) {
            console.error(`Error uploading file ${list[i].name}`, error);
          }
        }
      }

      // console.log("fileList", this.fileList);
    },
    // handleFileUpload: function () {
    //   //console.log("handleFileUpload")
    //   for (let i = 0; i < this.$refs.file2.files.length; i++) {
    //     let file1 = this.$refs.file2.files[i];
    //     console.log(file1.size);
    //     if (file1.size > 30720000) {
    //       this.ShowMessage("檔案上傳錯誤", `檔案大小不可大於30MB`);
    //       return;
    //     }
    //   }

    //   for (let i = 0; i < this.$refs.file2.files.length; i++) {
    //     let file1 = this.$refs.file2.files[i];
    //     if (file1.size <= 30720000) {
    //       server.UploadFile1({ biz: "driver", file: file1 }, (uploadPath) => {
    //         if (uploadPath != null) {
    //           this.fileList.push(uploadPath);
    //         }
    //       });
    //     }
    //   }
    //   this.$refs.file2.value = "";
    // },
    GetAccessFile1(UrlPath1) {
      let APIUrl = `${process.env.VUE_APP_API_URL}/systemConfig/static${UrlPath1}`;
      return APIUrl;
    },
    CheckIsImage(ImageUrl) {
      let filename = this.GetAccessFile1(ImageUrl);
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
      const extension = filename.slice(filename.lastIndexOf(".")).toLowerCase();
      if (imageExtensions.includes(extension)) {
        return true;
      }
      return false;
    },
    CheckIsVideo(ImageUrl) {
      let filename = this.GetAccessFile1(ImageUrl);
      const imageExtensions = [".mp4", ".mov"];
      const extension = filename.slice(filename.lastIndexOf(".")).toLowerCase();
      if (imageExtensions.includes(extension)) {
        return true;
      }
      return false;
    },
    DeleteFile1(file1) {
      const filteredArray = this.fileList.filter((obj) => !(obj === file1));
      this.fileList = filteredArray;
    },
    playVideo() {
      const video = this.$refs.videoPlayer;
      if (video && !video.paused) {
        return; // 如果视频已经在播放，则不执行任何操作
      }
      if (video && video.paused) {
        video.play(); // 播放视频
      }
    },
    ShowImage(ImageUrl) {
      let filename = this.GetAccessFile1(ImageUrl);

      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
      const extension = filename.slice(filename.lastIndexOf(".")).toLowerCase();
      if (imageExtensions.includes(extension)) {
        this.showImageURL = filename;
        this.showVideoURL = "";
        this.showImageModal = true;
      } else if ([".mp4", ".mov"].includes(extension)) {
        this.showImageURL = "";
        this.showVideoURL = filename;
        this.showImageModal = true;
        const video = this.$refs.videoPlayer;
        if (video) {
          this.$nextTick(() => {
            video.style.width = "100%";
            video.style.height = `100%`;
            video.src = this.showVideoURL;
            video.play();
          });
        }
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
      let index = Math.min(
        ...keywords
          .map((keyword) => String(address).indexOf(keyword))
          .filter((index) => index !== -1)
      );

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
      return "is-complete";
    },
    formatDeliveryStatus(iStatus) {
      if (this.driver.deliveryStatusList == null) return false;

      let F1List = this.driver.deliveryStatusList.filter(
        (x) => String(x.status) == String(iStatus)
      );
      if (F1List.length != 0) return true;
      return false;
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
    formatDate(datestr) {
      if (dayjs(datestr).isValid()) return dayjs(datestr).format("YYYY/MM/DD");
      return "";
    },
    formatDateTime(datestr) {
      if (dayjs(datestr).isValid())
        return dayjs(datestr).format("YYYY/MM/DD HH:mm:ss");
      return "";
    },
    SetOrderStatusConfirm() {
      console.log("確認");
      let orderStatus = this.modelMsg.data;
      if (!common.IsNumber(orderStatus)) return;

      server.SetOrderStatus(
        { headerId: this.DetailInfo.id, orderStatus: orderStatus },
        (apRlt) => {
          if (apRlt != null && apRlt.msg == "操作成功") {
            this.CloseModal();
            this.GetData();
          }
        }
      );
      server.SetOrderStatus(
        { headerId: this.DetailInfo.id, orderStatus: orderStatus },
        (apRlt) => {
          if (apRlt != null) {
            if (apRlt.msg == "操作成功") {
              this.CloseModal();
              this.GetData();
            } else {
              this.ShowMessage("訂單錯誤", apRlt.result);
            }
          }
        }
      );
    },
    SetOrderStatus(NewStatus) {
      event.preventDefault();
      if (this.DetailInfo.id == null || this.DetailInfo.id == 0) return;

      if (this.driver.status == NewStatus) {
        this.modelMsg.data = "";
        this.modelMsg.iscritical = false;
        switch (NewStatus) {
          case 2:
            this.modelMsg.title = `已接單`;
            break;
          case 3:
            this.modelMsg.title = `已聯絡`;
            break;
          case 4:
            this.modelMsg.title = `配送中`;
            break;
          case 5:
            this.modelMsg.title = `已配送完成`;
            break;
          case 6:
            this.modelMsg.title = `已為異常狀態`;
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
          this.modelMsg.title = `確認是否接單?`;
          break;
        case 3:
          this.modelMsg.title = `確認是否己聯絡?`;
          break;
        case 4:
          this.modelMsg.title = `確認是否開始配送?`;
          break;
        case 5:
          this.modelMsg.title = `確認是否配送完成?`;
          break;
        case 6:
          this.modelMsg.title = `確認是否變更為異常狀態?`;
          this.modelMsg.iscritical = true;
          break;
      }
      if (NewStatus == 5 && this.fileList.length == 0) {
        this.modelMsg.title = `無法完成訂單`;
        this.modelMsg.msg = `此配送單未上傳檔案，無法完成訂單!`;
        this.modelMsg.IsActive = true;
        this.modelMsg.IsAlert = true;
        return;
      }
      this.modelMsg.IsActive = true;
      this.modelMsg.IsAlert = false;
      // $("#modalhome1").modal({ show: true });
    },
    ShowMessage(title, msg1) {
      this.modelMsg.data = "";
      this.modelMsg.iscritical = false;
      this.modelMsg.title = title;
      this.modelMsg.msg = msg1;
      this.modelMsg.IsActive = true;
      this.modelMsg.IsAlert = true;
    },
    driverReport() {
      event.preventDefault();

      if (this.DetailInfo.id == null || this.DetailInfo.id == 0) return;
      if (String(this.customerReportMsg).trim() == "") {
        this.ShowMessage("客戶回報", "請填寫配送問題或備註");

        return false;
      }
      server.driverReport(
        { detailId: this.DetailInfo.id, message: this.customerReportMsg },
        (apRlt) => {
          console.log("aprlt", apRlt);
          if (apRlt != null && apRlt.msg == "操作成功") {
            this.customerReportMsg = "";
            this.ShowMessage("送出問題備註", "己送出");
            this.GetData();
          } else {
            this.ShowMessage("送出問題備註", apRlt.message);
          }
        }
      );
    },
    UpdateDeliveryReport() {
      event.preventDefault();

      if (this.DetailInfo.id == null || this.DetailInfo.id == 0) return;

      server.UpdateDeliveryFile(
        { headerId: this.DetailInfo.id, filePath: this.fileList.join(",") },
        (apRlt) => {
          console.log("aprlt", apRlt);
          if (apRlt != null && apRlt.msg == "操作成功") {
            this.ShowMessage("送出修改", "己保存");
            this.GetData();
          } else {
            this.ShowMessage("送出修改", apRlt.message);
          }
        }
      );
    },
    ChangeAgreedDate() {
      if (this.DetailInfo.number == null || this.DetailInfo.number == "")
        return;
      // if (!common.IsDate(this.NewAgreed.date)) {
      //   this.ShowMessage("修改約配日", "請選擇新的約配日期");
      //   return;
      // }
      // console.log("??", common.IsTime(this.NewAgreed.time + ":00"));
      // if (!common.IsTime(this.NewAgreed.time + ":00")) {
      //   this.ShowMessage("修改約配日", "請選擇新的約配時間");
      //   return;
      // }
      let wObj = {};
      wObj.number = this.DetailInfo.number;
      wObj.datetime = `${this.NewAgreed.date} ${dayjs(
        this.NewAgreed.startTime
      ).format("HH:mm:ss")}`;

      if (this.NewAgreed.endTime) {
        wObj.datetimeEnd = `${this.NewAgreed.date} ${dayjs(
          this.NewAgreed.endTime
        ).format("HH:mm:ss")}`;
      }

      console.log("wObj.datetime ", wObj.datetime);
      console.log("wObj.datetimeEnd ", wObj.datetimeEnd);
      console.log("wObj ", wObj);
      server.UpdateDeliveryAgreed(wObj, (apRlt) => {
        console.log("apRlt ", apRlt);
        if (apRlt != null && apRlt.msg == "操作成功") {
          this.ShowMessage(
            "已修改約配日完成",
            wObj.datetimeEnd
              ? `約配時間： ${wObj.datetime} ~ ${wObj.datetimeEnd}`
              : `約配時間： ${wObj.datetime}`
          );
          this.GetData();
        } else {
          this.ShowMessage("修改約配日", apRlt.message);
        }
      });
      this.IsAgreedDateChange = false;

      // if(common.IsDate(thi))
      //       DetailInfo.number
      //       UpdateDeliveryAgreed
    },
    GetData() {
      server.GetDeliveryData(this.queryObj, (jshdata) => {
        this.driver.driverId = jshdata.driverId;
        this.driver.driverName = jshdata.driverName;
        this.driver.carNumber = jshdata.carNumber;
        this.driver.assignDate = dayjs(jshdata.takeDate).format("YYYY-MM-DD");
        this.driver.assignUser = jshdata.assignUser;

        this.driver.filePath = jshdata.filePath;
        this.driver.status = Number(jshdata.status);
        this.driver.deliveryStatusList = jshdata.deliveryStatusList;
        this.driver.agreedDelivery = jshdata.agreedDelivery || [];
        if (this.driver.filePath == null || this.driver.filePath == "") {
          this.fileList = [];
        } else {
          this.fileList = String(this.driver.filePath).split(",");
        }
      });
      server.GetDetailByNumber(this.queryObj, (jshdata) => {
        this.DetailInfo = jshdata;

        //console.log("DetailInfo", jshdata)
      });
      //server.GetDetailList(this.queryObj, (data) => { console.log(data) });
      server.GetDriverReport(this.queryObj, (jshdata) => {
        //console.log(data);
        jshdata.sort((a, b) => {
          return a.id - b.id;
        });
        //console.log(jshdata)
        this.DriverReportList = jshdata;
      });

      setTimeout(() => {
        this.setUserId(this.User.UserID);
      }, 500);
    },
    GetDataMore() {
      this.queryObj.pageSize = this.queryObj.pageSize * 2;
      this.GetData();
    },
    setLocalStorage(value) {
      localStorage.setItem(`recode-${this.User.UserID}`, JSON.stringify(value));
    },
    getLocalStorage() {
      const item = localStorage.getItem(`recode-${this.User.UserID}`);
      if (item) {
        try {
          return JSON.parse(item);
        } catch (e) {
          console.error("Error parsing localStorage value", e);
        }
      }
      return { userId: null, recodeList: [] };
    },
    addDataToLocalStorage() {
      // 获取当前存储的对象
      let storedData = this.getLocalStorage();
      // console.log("this.DetailInfo", this.DetailInfo);
      // console.log("this.driver", this.driver);
      const data = {
        id: this.DetailInfo.id,
        number: this.DetailInfo.number,
        status: this.driver.status,
      };
      // 添加新的记录到 recodeList 数组
      storedData.recodeList.push(data);
      // 限制 recodeList 数组长度为 10
      if (storedData.recodeList.length > 10) {
        storedData.recodeList.shift();
      }
      // 将更新后的对象重新存储到 localStorage
      this.setLocalStorage(storedData);
    },
    setUserId(userId) {
      // 获取当前存储的对象
      let storedData = this.getLocalStorage();
      // 设置 userId
      storedData.userId = userId;

      // 将更新后的对象重新存储到 localStorage
      this.setLocalStorage(storedData);
      this.addDataToLocalStorage();
    },
    disabledTime(type) {
      const now = dayjs();
      const currentHour = now.hour();
      const currentMinute = now.minute();
      const startTime = dayjs(this.NewAgreed.startTime, "HH:mm");
      // 起始時間
      if (type == "start") {
        // 若日期為當日，disabled過去時間
        if (this.NewAgreed.date === dayjs().format("YYYY-MM-DD")) {
          return {
            disabledHours: () => {
              // 如果当前时间已超过整点，禁用当前小时及之前的小时
              if (currentMinute > 0) {
                return Array.from({ length: 24 }, (_, i) => i).filter(
                  (hour) => hour <= currentHour
                );
              }
              // 否则，只禁用之前的小时
              return Array.from({ length: 24 }, (_, i) => i).filter(
                (hour) => hour < currentHour
              );
            },
            disabledMinutes: (selectedHour) => {
              // 如果选中的小时是当前小时
              if (selectedHour === currentHour) {
                // 如果当前分钟已经超过 30 分钟
                if (currentMinute > 30) {
                  // 禁用所有分钟
                  return Array.from({ length: 60 }, (_, i) => i);
                }
                // 否则，仅允许选择 00 和 30 分钟
                return Array.from({ length: 60 }, (_, i) => i).filter(
                  (minute) => minute !== 0 && minute !== 30
                );
              }
              // 否则，所有分钟都可选
              return [];
            },
          };
        } else {
          // 若日期為未來，不disabled
          return {
            disabledHours: null,
            disabledMinutes: null,
            disabledSeconds: null,
          };
        }
      } else {
        // 結束時間,不可早於開始時間
        return {
          disabledHours: () => {
            const startHour = startTime.hour();
            const startMinute = startTime.minute();

            return Array.from({ length: 24 }, (_, i) => i).filter((hour) => {
              // 禁用早于startTime的小时
              if (hour < startHour) return true;
              // 如果当前时间已经超过整点，禁用当前小时及之前的小时
              if (hour === startHour && startMinute > 30) return true;
              return false;
            });
          },
          disabledMinutes: (selectedHour) => {
            const startHour = startTime.hour();
            const startMinute = startTime.minute();

            if (selectedHour < startHour) {
              return Array.from({ length: 60 }, (_, i) => i);
            }
            if (selectedHour === startHour) {
              return Array.from({ length: 60 }, (_, i) => i).filter(
                (minute) => minute <= startMinute
              );
            }
            return [];
          },
        };
      }
    },
  },
};
</script>