<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import { server } from "@/api";


import appConfig from "@/app.config";

/**
 * Customers component
 */
export default {
  page: {
    title: "結算帳號管理",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      customersData: [],
      title: "結算帳號管理",
      items: [
        {
          text: "人事管理",
          href: "javascript:;",
        },
        {
          text: "結算帳號管理",
          href: "javascript:;",
        },
        {
          text: "結算帳號列表",
          active: true,
        },
      ],
      showModal: false,
      submitted: false,
      customers: {
        id: '',
        name: '',
        serial_no: '',
        initial_amount: '',
        current_amount: '',
        sort: '',
        enabled: '',

      },



      name: '',
      serial_no: '',
      remark: '',

      IsGetDataing: false,
      pageSize: 10,
      totalRows: 0,
      currentPage: 1,
      maxPage: 10,
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations: {
    customers: {
      name: {
        required: helpers.withMessage("請填寫結算帳號名稱", required),
      },
      serial_no: {
        required: helpers.withMessage("請填寫編號", required),
      },

    },
  },
  mounted() {
    this.$nextTick(() => {
      this.GetData();
    })
  },
  methods: {
    /**
     * Modal form submit
     */
    // eslint-disable-next-line no-unused-vars
    handleSubmit(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        if (this.customers.id == 0) {
          this.AddData(this.customers);
        } else if (this.customers.id > 0) {
          this.UpdData(this.customers);
        }
      }
      console.log("OK")

      this.submitted = false;
    },
    EditOne(RowItem) {
      console.log("EditOne", RowItem)


      if (RowItem.id == null || RowItem.id == 0) {

        this.customers.id = 0;
        this.customers.name = "";
        this.customers.serial_no = "";
        this.customers.initial_amount = "";
        this.customers.current_amount = "";
        this.customers.sort = "";
        this.customers.enabled = true;


      }
      else {

        this.customers.id = RowItem.id;
        this.customers.name = RowItem.name;
        this.customers.serial_no = RowItem.serialNo;
        this.customers.initial_amount = RowItem.initialAmount;
        this.customers.current_amount = RowItem.currentAmount;
        this.customers.remark = RowItem.remark;
        this.customers.sort = RowItem.sort;
        this.customers.enabled = RowItem.enabled;


      }



      this.showModal = true;
    },
    GetData() {
      if (this.IsGetDataing == true) return;
      this.IsGetDataing = true;
      let APIUrl = `/account/list`;
      //let APIParameter = encodeURIComponent(`search={"name":"","type":"結算帳號","telephone":"","phonenum":""}&column=createTime&order=desc&field=id,,,action,supplier,serial_no,taxid,contacts,telephone,phoneNum,email,sort,enabled&currentPage=1&pageSize=10`);
      let APIParameter = `?currentPage=${this.currentPage}&pageSize=${this.pageSize}`;
      let queryStr = `{"name":"${this.name}","serialNo":"${this.serial_no}","remark":"${this.remark}"}`;
      APIParameter += `&search=${encodeURIComponent(queryStr)}`;
      server.get(APIUrl + APIParameter)
        .then((res) => {
          console.log("回傳資料成功 res=", res);
          if (res != null && res.data != null && res.data.code == 200 && res.data.data != null) {
            //回傳資料成功
            let jshdata = res.data.data;
            this.customersData = jshdata.rows;
            this.totalRows = jshdata.total;
            this.maxPage = Math.ceil(this.totalRows / this.pageSize) == 0 ? 1 : Math.ceil(this.totalRows / this.pageSize);
          }
          this.IsGetDataing = false;
        }).catch(function (error) {
          console.log("error", error);
          this.IsGetDataing = false;
          return;
        });
    },
    AddData(data1) {
      if (this.IsGetDataing == true) return;
      this.IsGetDataing = true;
      let APIUrl = `/account/add`;
      server.post(APIUrl, data1)
        .then((res) => {
          console.log("回傳資料成功 res=", res);
          if (res != null && res.data != null && res.data.code == 200 && res.data.data != null) {
            //回傳資料成功       
            this.showModal = false;
            this.$nextTick(() => this.GetData());
          }
          this.IsGetDataing = false;
        }).catch(function (error) {
          console.log("error", error);
          this.IsGetDataing = false;
          return;
        });
    },
    UpdData(data1) {
      if (this.IsGetDataing == true) return;
      this.IsGetDataing = true;
      let APIUrl = `/account/update`;
      server.put(APIUrl, data1)
        .then((res) => {
          console.log("回傳資料成功 res=", res);
          if (res != null && res.data != null && res.data.code == 200 && res.data.data != null) {
            //回傳資料成功       
            this.showModal = false;
            this.$nextTick(() => this.GetData());
          }
          this.IsGetDataing = false;
        }).catch(function (error) {
          console.log("error", error);
          this.IsGetDataing = false;
          return;
        });
    }
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-8">
                <div class="search-box me-2 mb-2 d-inline-block">
                  <div class="position-relative">
                    <input type="text" class="form-control" placeholder="名稱" v-model="name" @keyup.enter="GetData()" />
                  </div>
                </div>
                <div class="search-box me-2 mb-2 d-inline-block">
                  <div class="position-relative">
                    <input type="text" class="form-control" placeholder="編號" v-model="serial_no"
                      @keyup.enter="GetData()" />
                  </div>
                </div>
                <div class="search-box me-2 mb-2 d-inline-block">
                  <div class="position-relative">
                    <input type="text" class="form-control" placeholder="備註" v-model="remark" @keyup.enter="GetData()" />
                  </div>
                </div>
                <div class="search-box me-2 mb-2 d-inline-block">
                  <div class="position-relative">
                    <b-button variant="primary" @click="GetData()">
                      <i :class="IsGetDataing ? 'bx bx-loader bx-spin font-size-16 align-middle me-2' : ''"></i> 查詢
                    </b-button>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="text-sm-end">
                  <button type="button" class="btn btn-success btn-rounded mb-2 me-2" @click="EditOne({ id: 0 })">
                    <i class="mdi mdi-plus me-1"></i> 新增結算帳號
                  </button>
                  <b-modal v-model="showModal" :title="customers.id == 0 ? '新增結算帳號' : '修改結算帳號'"
                    title-class="text-black font-18" body-class="p-3" hide-footer>
                    <form @submit.prevent="handleSubmit">
                      <div class="row">
                        <div class="col-12">
                          <div class="mb-3">
                            <label for="name">名稱</label>
                            <input id="name" v-model="customers.name" type="text" class="form-control"
                              placeholder="結算帳號名稱" :class="{ 'is-invalid': submitted && v$.customers.name.$error, }" />
                            <div v-if="submitted && v$.customers.name.$error" class="invalid-feedback">
                              <span v-if="v$.customers.name.required.$message">{{
                                v$.customers.name.required.$message }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="mb-3">
                            <label for="name">編號</label>
                            <input id="name" v-model="customers.serial_no" type="text" class="form-control"
                              placeholder="編號" :class="{ 'is-invalid': submitted && v$.customers.serial_no.$error, }" />
                            <div v-if="submitted && v$.customers.serial_no.$error" class="invalid-feedback">
                              <span v-if="v$.customers.serial_no.required.$message">{{
                                v$.customers.serial_no.required.$message }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="mb-3">
                            <label for="name">期初金額</label>
                            <input id="name" v-model="customers.initial_amount" type="number" class="form-control"
                              placeholder="期初金額" />
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="mb-3">
                            <label for="name">順序</label>
                            <input id="name" v-model="customers.sort" type="text" class="form-control" placeholder="順序" />
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="mb-3">
                            <label for="name">備註</label>
                            <input id="name" v-model="customers.remark" type="text" class="form-control"
                              placeholder="備註" />
                          </div>
                        </div>

                        <div class="col-12">
                          <div class="mb-3">
                            <label for="name">狀態</label>
                            <div>
                              <div class="btn-group btn-group-sm">
                                <a href="javascript:;" class="btn btn-outline-success"
                                  :class="customers.enabled == true ? 'active' : ''"
                                  @click="customers.enabled = true">啟用</a>
                                <a href="javascript:;" class="btn btn-outline-danger"
                                  :class="customers.enabled == false ? 'active' : ''" @click="customers.enabled = false"
                                  v-if="customers.id > 0">停用</a>
                              </div>
                            </div>

                          </div>
                        </div>



                      </div>

                      <div class="text-end pt-5 mt-3">
                        <b-button variant="light" @click="showModal = false">關閉</b-button>
                        <b-button type="submit" variant="success" class="ms-1">{{ customers.id == 0 ? '新增' : '修改'
                        }}</b-button>
                      </div>
                    </form>
                  </b-modal>
                </div>
              </div>
              <!-- end col-->
            </div>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap align-middle">
                <thead>
                  <tr>
                    <th width="5px">#</th>
                    <th>名稱</th>
                    <th>編號</th>
                    <th>期初金額</th>
                    <th>當前餘額</th>
                    <th>備註</th>
                    <th>順序</th>
                    <th>狀態</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(SubItem, cidx) in customersData" :key="SubItem.id">
                    <td>{{ (currentPage - 1) * pageSize + cidx + 1 }}</td>
                    <td>{{ SubItem.name }}</td>
                    <td>{{ SubItem.serialNo }}</td>
                    <td>{{ SubItem.initialAmount }}</td>
                    <td>{{ SubItem.currentAmount }}</td>
                    <td>{{ SubItem.remark }}</td>
                    <td>{{ SubItem.sort }}</td>
                    <td>
                      <div class="btn-group btn-group-sm">
                        <span class="btn btn-outline-success" v-if="SubItem.enabled == true">啟用</span>
                        <span class="btn btn-outline-danger" v-else>停用</span>
                      </div>
                    </td>
                    <td>
                      <div class="btn-group btn-group-sm">
                        <a class="btn btn-secondary" href="javascript:;" @click="EditOne(SubItem)">編輯</a>
                      </div>

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul class="pagination pagination-rounded justify-content-center mb-2">
              <li class="page-item" :class="currentPage == 1 ? 'disabled' : ''">
                <a class="page-link" href="javascript:;" aria-label="Previous" @click="currentPage = 1"><i
                    class="mdi mdi-chevron-left"></i></a>
              </li>
              <li class="page-item" v-for="(pg1, pdx) in [-3, -2, -1, 0, 1, 2, 3]" :key="'page' + pdx"
                :class="pg1 == 0 ? 'active' : ''" v-show="currentPage + pg1 >= 1 && currentPage + pg1 <= maxPage">
                <a class="page-link" href="javascript:;" @click="currentPage = currentPage + pg1; this.GetData()">{{
                  currentPage + pg1 }}</a>
              </li>
              <li class="page-item" :class="currentPage == maxPage ? 'disabled' : ''">
                <a class="page-link" href="javascript:;" aria-label="Next" @click="currentPage = maxPage"><i
                    class="mdi mdi-chevron-right"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
