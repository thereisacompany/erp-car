<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import { server } from "@/api";

import { menuItems } from "../../../components/menu";
import appConfig from "@/app.config";

/**
 * Customers component
 */
export default {
  page: {
    title: "用戶管理",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      menuItems: menuItems,
      menuAllList: [],
      rolelist: [],
      customersData: [],
      title: "用戶管理",
      items: [
        {
          text: "系統管理",
          href: "javascript:;",
        },
        {
          text: "用戶管理",
          href: "javascript:;",
        },
        {
          text: "用戶列表",
          active: true,
        },
      ],
      showModal: false,
      submitted: false,
      customers: {
        id: '',
        loginName: '',
        roleId: '',
        username: '',
        position: '',
        phonenum: '',
        description: '',
        authList: '',
      },

      loginName: '',
      username: '',
      phonenum: '',

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
      loginName: {
        required: helpers.withMessage("請填寫登入帳號", required),
      },
      username: {
        required: helpers.withMessage("請填寫用戶全名", required),
      },
      roleId: {
        required: helpers.withMessage("請選擇角色名稱", required),
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.GetRoleList();
      this.GetData();
      //console.log("menuItems", menuItems)

      this.menuAllList = [];
      menuItems.forEach(item => {
        if (item.id && !item.subItems) {
          this.menuAllList.push(item.id);
        }
        if (item.subItems) {
          item.subItems.forEach(item2 => {
            if (item2.id && !item2.subItems) {
              this.menuAllList.push(item2.id);
            }
          })
        }
      });
      //console.log(this.menuAllList)
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

      this.submitted = false;
    },
    AuthCheckALL(bSelectALL) {
      if (bSelectALL) {
        this.customers.authList = this.menuAllList.join(',');
      } else {
        this.customers.authList = "";
      }

    },
    CheckCustomerAuth(aid) {
      if (this.customers.authList == "all") return true
      if (String(this.customers.authList).split(',').indexOf(String(aid)) != -1) {
        return true;
      }
    },
    ChangeCustomerAuth(aid) {
      if (this.customers.authList == "all") {
        this.customers.authList = this.menuAllList.filter(item => item !== String(aid)).join(',');
        return;
      }
      let FFList = String(this.customers.authList).split(',')
      if (FFList.indexOf(String(aid)) != -1) {
        this.customers.authList = FFList.filter(item => item !== String(aid)).join(',');
        return;
      } else {
        this.customers.authList = this.customers.authList + ',' + String(aid)
        return;
      }
    },

    ResetPWD(RowItem) {

      if (confirm(`確認是否重置密碼?(預設值:123456)\n${RowItem.loginName} (${RowItem.username})`)) {
        if (this.IsGetDataing == true) return;
        this.IsGetDataing = true;
        let data1 = { id: RowItem.id }
        let APIUrl = `/user/resetPwd`;
        server.post(APIUrl, data1)
          .then((res) => {
            console.log("回傳資料成功 res=", res);
            if (res != null && res.data != null && res.data.code == 200) {
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
    DelOne(RowItem) {
      if (confirm(`確認是否刪除帳號? \n${RowItem.loginName} (${RowItem.username})`)) {
        if (this.IsGetDataing == true) return;
        this.IsGetDataing = true;

        let APIUrl = `/user/delete?id=${RowItem.id}`;
        server.delete(APIUrl)
          .then((res) => {
            console.log("回傳資料成功 res=", res);
            if (res != null && res.data != null && res.data.code == 200) {
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
    EditOne(RowItem) {
      console.log("EditOne", RowItem)


      if (RowItem.id == null || RowItem.id == 0) {
        for (let key in this.customers) {
          this.customers[key] = '';
        }


        this.customers.id = 0;
        this.customers.loginName = '';
        this.customers.roleId = '';
        this.customers.username = '';
        this.customers.position = '';
        this.customers.phonenum = '';
        this.customers.description = '';
        this.customers.authList = this.menuAllList.join(',');

      }
      else {


        this.customers.id = RowItem.id;
        this.customers.loginName = RowItem.loginName;
        this.customers.roleId = RowItem.roleId;
        this.customers.username = RowItem.username;
        this.customers.position = RowItem.position;
        this.customers.phonenum = RowItem.phonenum;
        this.customers.description = RowItem.description;
        this.customers.authList = RowItem.authList == null || RowItem.authList == "" ? "all" : RowItem.authList;


      }



      this.showModal = true;
    },
    GetRoleList() {
      let APIUrl = `/role/list`;
      let APIParameter = `?currentPage=1&pageSize=1000`;
      let queryStr = `{"type":""}`;
      APIParameter += `&search=${encodeURIComponent(queryStr)}`;
      server.get(APIUrl + APIParameter)
        .then((res) => {

          if (res != null && res.data != null && res.data.code == 200 && res.data.data != null) {
            //回傳資料成功
            let jshdata = res.data.data;
            this.rolelist = jshdata.rows;
            console.log("rolelist", this.rolelist);
          }

        }).catch(function (error) {
          console.log(error)
          return;
        });

    },
    GetData() {
      if (this.IsGetDataing == true) return;
      this.IsGetDataing = true;
      let APIUrl = `/user/list`;

      let APIParameter = `?currentPage=${this.currentPage}&pageSize=${this.pageSize}`;
      let queryStr = `{"loginName":"${this.loginName}","userName":"${this.username}"}`;
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

            this.ReInitMenu();
          }
          this.IsGetDataing = false;

        }).catch(function (error) {
          console.log("error", error);
          this.IsGetDataing = false;
          return;
        });
    },
    ReInitMenu() {
      let user = JSON.parse(localStorage.getItem('user'));
      let F1List = this.customersData.filter(x => String(x.id) == String(user.UserID));
      if (F1List.length == 1) {
        localStorage.setItem('user_authList', JSON.stringify(F1List[0].authList));
      }
    },
    AddData(data1) {
      if (this.IsGetDataing == true) return;
      this.IsGetDataing = true;
      let APIUrl = `/user/addUser`;
      server.post(APIUrl, data1)
        .then((res) => {
          console.log("回傳資料成功 res=", res);
          if (res != null && res.data != null && res.data.code == 200) {
            //回傳資料成功       
            this.showModal = false;
            this.$nextTick(() => this.GetData());
          } else if (res != null && res.data != null && res.data.code != null) {
            alert("新增失敗! 錯誤代碼:" + res.data.code)
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
      //console.log("data1.authList", data1.authList)
      if (data1.authList == null || data1.authList == "") data1.authList = "x";
      let APIUrl = `/user/updateUser`;
      server.put(APIUrl, data1)
        .then((res) => {
          console.log("回傳資料成功 res=", res);
          if (res != null && res.data != null && res.data.code == 200) {
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
                    <input type="text" class="form-control" placeholder="登入帳號" v-model="loginName"
                      @keyup.enter="GetData()" />
                  </div>
                </div>
                <div class="search-box me-2 mb-2 d-inline-block">
                  <div class="position-relative">
                    <input type="text" class="form-control" placeholder="用戶名稱" v-model="username"
                      @keyup.enter="GetData()" />
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
                    <i class="mdi mdi-plus me-1"></i> 新增用戶
                  </button>
                  <b-modal size="xl" v-model="showModal" :title="customers.id == 0 ? '新增用戶' : '修改用戶'"
                    title-class="text-black font-18" body-class="p-3" hide-footer>
                    <form @submit.prevent="handleSubmit">
                      <div class="row">
                        <div class="col-sm-12 col-md-4 col-lg-3">
                          <div class="mb-3">
                            <label for="name">登入帳號</label>

                            <input id="name" v-model="customers.loginName" type="text" class="form-control"
                              :readonly="customers.id != 0"
                              :class="{ 'is-invalid': submitted && v$.customers.loginName.$error, }" />
                            <div v-if="submitted && v$.customers.loginName.$error" class="invalid-feedback">
                              <span v-if="v$.customers.loginName.required.$message">{{
                                v$.customers.loginName.required.$message }}</span>
                            </div>
                            <span v-if="customers.id == 0" class="text-secondary">*預設密碼:123456</span>
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-4 col-lg-3">
                          <div class="mb-3">
                            <label for="name">用戶全名</label>
                            <input id="name" v-model="customers.username" type="text" class="form-control"
                              :class="{ 'is-invalid': submitted && v$.customers.username.$error, }" />
                            <div v-if="submitted && v$.customers.username.$error" class="invalid-feedback">
                              <span v-if="v$.customers.username.required.$message">{{
                                v$.customers.username.required.$message }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-4 col-lg-3">
                          <label for="name">角色名稱</label>
                          <select class="form-select" v-model="customers.roleId"
                            :class="{ 'is-invalid': submitted && v$.customers.roleId.$error, }">
                            <option :value="u1.id" selected v-for="u1 in rolelist" :key="'customers_roleid' + u1.id">
                              {{ u1.name }} ({{ u1.type }})</option>
                          </select>
                          <div v-if="submitted && v$.customers.roleId.$error" class="invalid-feedback">
                            <span v-if="v$.customers.roleId.required.$message">{{
                              v$.customers.roleId.required.$message
                            }}</span>
                          </div>

                        </div>
                        <div class="col-sm-12 col-md-4 col-lg-3">
                          <div class="mb-3">
                            <label for="name">職稱</label>
                            <input id="name" v-model="customers.position" type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-4 col-lg-3">
                          <div class="mb-3">
                            <label for="name">電話</label>
                            <input id="name" v-model="customers.phonenum" type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-4 col-lg-3">
                          <div class="mb-3">
                            <label for="name">說明</label>
                            <input id="name" v-model="customers.description" type="text" class="form-control" />
                          </div>
                        </div>


                        <div class="col-sm-12 col-md-12 col-lg-12">
                          <div class="mb-3 ">
                            <label for="name">權限</label>
                            <div class="btn-group-sm mb-3">
                              <a href="javascript:;" class="btn btn-sm btn-outline-secondary"
                                @click="AuthCheckALL(true)">全選</a>
                              <a href="javascript:;" class="btn btn-sm btn-outline-secondary"
                                @click="AuthCheckALL(false)">不選</a>
                            </div>
                            <div class="form-check" v-for="(m1, midx) in menuItems" :key="'authList' + midx">
                              <div class="form-check form-check-inline">
                                <i v-if="m1.icon" class="bx" :class="m1.icon">&nbsp;</i>
                                <input :id="'authid' + m1.id" class="form-check-input" type="checkbox" name="authCheck"
                                  :checked="CheckCustomerAuth(m1.id)" @click="ChangeCustomerAuth(m1.id)"
                                  v-if="!m1.subItems" :value="m1.id">

                                <label :for="'authid' + m1.id" class="form-check-label" style="min-width:80px"> {{
                                  m1.label }}
                                </label>
                              </div>
                              <template v-if="m1.subItems">
                                <div class="form-check form-check-inline" v-for="(m2, m2idx) in m1.subItems"
                                  :key="'authList' + m2idx">
                                  <input :id="'authid' + m2.id" class="form-check-input" type="checkbox" name="authCheck"
                                    :checked="CheckCustomerAuth(m2.id)" @click="ChangeCustomerAuth(m2.id)" :value="m2.id">
                                  <label :for="'authid' + m2.id" class="form-check-label" style="min-width:80px"> {{
                                    m2.label }}
                                  </label>

                                </div>
                              </template>


                            </div>

                          </div>
                        </div>



                      </div>

                      <div class="text-end pt-5 mt-3">
                        <b-button variant="light" @click="showModal = false">關閉</b-button>
                        <b-button type="submit" variant="success" class="ms-1">
                          {{ customers.id == 0 ? '新增' : '修改' }}</b-button>
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
                    <th width="20%">登入帳號</th>
                    <th width="20%">用戶姓名</th>
                    <th width="5%">角色資料</th>
                    <th width="5%">職稱</th>
                    <th width="5%">電話</th>
                    <th width="10%">說明</th>

                    <th>操作</th>


                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(SubItem, cidx) in customersData" :key="SubItem.id">
                    <td>{{ (currentPage - 1) * pageSize + cidx + 1 }}</td>
                    <td>{{ SubItem.loginName }}</td>
                    <td>{{ SubItem.username }}</td>
                    <td>{{ SubItem.roleName }}</td>
                    <td>{{ SubItem.position }}</td>
                    <td>{{ SubItem.phonenum }}</td>
                    <td>{{ SubItem.description }}</td>

                    <td>
                      <div class="btn-group btn-group-sm">
                        <a class="btn btn-secondary" href="javascript:;" @click="EditOne(SubItem)">編輯</a>
                        <a class="btn btn-warning" href="javascript:;" @click="ResetPWD(SubItem)">重置密碼</a>
                        <!-- <a class="btn btn-danger" href="javascript:;" @click="DelOne(SubItem)">刪除</a> -->
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
