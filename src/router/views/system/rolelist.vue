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
    title: "角色管理",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      customersData: [],
      title: "角色管理",
      items: [
        {
          text: "系統管理",
          href: "javascript:;",
        },
        {
          text: "角色管理",
          href: "javascript:;",
        },
        {
          text: "角色列表",
          active: true,
        },
      ],
      showModal: false,
      submitted: false,
      customers: {
        id: '',
        name: '',
        description: '',
        enabled: '',
        type: ''
      },

      name: '',
      telephone: '',
      description: '',

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
        required: helpers.withMessage("請填寫角色名稱", required),
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
        for (let key in this.customers) {
          this.customers[key] = '';
        }
        this.customers.id = 0;
        this.customers.name = "";
        this.customers.description = "";
        this.customers.type = "全部數據";
        this.customers.enabled = true;
      }
      else {

        this.customers.id = RowItem.id;
        this.customers.name = RowItem.name;
        this.customers.description = RowItem.description;
        this.customers.enabled = RowItem.enabled;
        this.customers.type = RowItem.type;
      }



      this.showModal = true;
    },
    GetData() {
      if (this.IsGetDataing == true) return;
      this.IsGetDataing = true;
      let APIUrl = `/role/list`;

      let APIParameter = `?currentPage=${this.currentPage}&pageSize=${this.pageSize}`;
      let queryStr = `{"name":"${this.name}"}`;
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
      let APIUrl = `/role/add`;
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
      let APIUrl = `/role/update`;
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
                    <input type="text" class="form-control" placeholder="角色名稱" v-model="name" @keyup.enter="GetData()" />
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
                    <i class="mdi mdi-plus me-1"></i> 新增角色
                  </button>
                  <b-modal v-model="showModal" :title="customers.id == 0 ? '新增角色' : '修改角色'"
                    title-class="text-black font-18" body-class="p-3" hide-footer>
                    <form @submit.prevent="handleSubmit">
                      <div class="row">
                        <div class="col-sm-12 ">
                          <div class="mb-3">
                            <label for="name">角色名稱</label>
                            <input id="name" v-model="customers.name" type="text" class="form-control"
                              :class="{ 'is-invalid': submitted && v$.customers.name.$error, }" />
                            <div v-if="submitted && v$.customers.name.$error" class="invalid-feedback">
                              <span v-if="v$.customers.name.required.$message">{{
                                v$.customers.name.required.$message }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 ">
                          <div class="mb-3">
                            <label for="type">資料類型</label>
                            <select class="form-select" v-model="customers.type">
                              <option :value="u1" selected v-for="(u1, uidx) in ['全部數據', '個人數據']" :key="'type' + uidx">
                                {{ u1 }}</option>
                            </select>
                          </div>
                        </div>


                        <div class="col-sm-12 ">
                          <div class="mb-3">
                            <label for="description">說明</label>
                            <input id="description" v-model="customers.description" type="text" class="form-control" />
                          </div>
                        </div>

                        <div class="col-12">
                          <div class="mb-3">
                            <label for="enabled">狀態</label>
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
                    <th width="1%">#</th>
                    <th width="20%">角色名稱</th>
                    <th width="20%">資料類型</th>
                    <th width="20%">說明</th>
                    <th width="5%">狀態</th>
                    <th width="5%">操作</th>


                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(SubItem, cidx) in customersData" :key="SubItem.id">
                    <td>{{ (currentPage - 1) * pageSize + cidx + 1 }}</td>
                    <td>{{ SubItem.name }}</td>
                    <td>{{ SubItem.type }}</td>
                    <td>{{ SubItem.description }}</td>
                    <td>
                      <div class="btn-group btn-group-sm">
                        <span class="btn btn-success" v-if="SubItem.enabled == true">啟用</span>
                        <span class="btn btn-danger" v-else>停用</span>
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
