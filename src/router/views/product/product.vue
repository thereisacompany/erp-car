<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import { server } from "@/api";
import common from "@/api/common";
import Swal from "sweetalert2";

export default {
  components: { Layout, PageHeader },
  data() {
    return {
      showModal: false,
      title: "商品管理",
      items: [
        {
          text: "商品管理",
          href: "javascript:;",
        },
        {
          text: "商品列表",
          active: true,
        },
      ],
      supplierlist: [],
      categoryId: '',
      materialParam: '',
      IsGetDataing: false,
      pageSize: 10,
      totalRows: 0,
      currentPage: 1,
      maxPage: 10,
      formData: {
        id: null,
        name: "", //名稱
        standard: "", //規格
        model: "", //型號
        // weight:"",//重量
        // unit:"",//單位
        categoryId: "", //類別id
        enabled: true,
        length: '',
        width: '',
        high: '',
        base: '',
        volume: '',
        number: '',
        barcode: '',
        counter: '',
        organId: '',
      },
      modelInfo: {
        title: "",
        submitName: "",
        type: "",
      },
      lists: [],
      categoryList: [],
      categoryActiveTitle: "",
      categoryTitle: '',
      categoryActiveIsShow: false,
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.GetData();
    // }, 2000);
    //this.GetSupplierList();
    server.GetSupplierList((rows) => { this.supplierlist = rows })
    this.$nextTick(() => {
      this.handleGetMaterialCategoryTree();
      this.GetData();
      console.log(common.PadLeftZero(123, 5));
    })
  },
  methods: {

    calVolume() {
      this.formData.volume = Math.round((this.formData.length ? this.formData.length : 0) * (this.formData.width ? this.formData.width : 0) * (this.formData.high ? this.formData.high : 0) / 27826 * 10) / 10;
    },
    async handleGetMaterialCategoryTree() {
      //取得分類列表
      let APIUrl = `/materialCategory/getMaterialCategoryTree?id=`;
      try {
        const result = await server.get(APIUrl);
        // console.log(result);
        this.categoryList = [];
        this.categoryList = this.transformtMaterialCategoryTree(result.data);
        console.log(this.categoryList);
        return result;
      } catch (error) {
        // console.log(error);
        return error;
      }
    },
    transformtMaterialCategoryTree(data) {
      // console.log(data)
      data.forEach((item) => {
        item["childOpen"] = false;
      });
      return data;
    },
    EditOne({ type, data }) {
      this.showModal = true;
      console.log(type, JSON.stringify(data));

      this.handleGetMaterialCategoryTree();
      switch (type) {
        case "add":
          this.modelInfo["title"] = "新增商品";
          this.modelInfo["submitName"] = "新增";
          this.modelInfo["type"] = "add";

          break;
        case "edit":
          this.modelInfo["title"] = "編輯商品";
          this.modelInfo["submitName"] = "編輯";
          this.modelInfo["type"] = "edit";

          this.formData["id"] = data["id"];
          this.formData["enabled"] = data["enabled"];
          this.formData["name"] = data["name"];
          this.formData["standard"] = data["standard"];
          this.formData["model"] = data["model"];
          this.formData["length"] = data["length"];
          this.formData["width"] = data["width"];
          this.formData["high"] = data["high"];
          this.formData["base"] = data["base"];
          this.formData["volume"] = data["volume"];
          this.formData["barcode"] = data["barcode"];
          this.formData["counter"] = data["counter"];
          this.formData["number"] = data["number"];
          this.formData["organId"] = data["organId"];
          this.categoryActiveTitle = data["categoryName"];
          break;
      }
    },
    clearForm() {
      this.formData = {
        id: null,
        enabled: null,
        name: "",
        standard: "",
        model: "",
        categoryId: "",
        length: "",
        width: "",
        high: "",
        base: "",
        volume: "",
        barcode: "",
        counter: "",
        number: "",
        organId: "",
      };
      this.categoryActiveTitle = "";
    },

    GetData() {
      console.log("GetData");
      let APIUrl = `/material/list`;
      let APIParameter = `?currentPage=${this.currentPage}&pageSize=${this.pageSize}`;
      let queryStr = `{"categoryId":"${this.categoryId}","materialParam":"${this.materialParam}","color":"","materialOther":"","weight":"","expiryNum":"","enabled":"","enableSerialNumber":"","enableBatchNumber":"","remark":"","mpList":"制造商,自定义1,自定义2,自定义3"}`;
      //let queryStr = `{"type":"供應商","supplier":"${this.supplier}","telephone":"${this.telephone}","phonenum":"${this.phoneNum}"}`;
      APIParameter += `&search=${encodeURIComponent(queryStr)}`;
      server
        .get(APIUrl + APIParameter)
        .then((res) => {
          console.log(res.data);
          if (
            res != null &&
            res.data != null &&
            res.data.code == 200 &&
            res.data.data != null
          ) {
            this.lists = [];
            this.lists = res.data.data.rows;
            this.totalRows = res.data.data.total;
            this.maxPage = Math.ceil(this.totalRows / this.pageSize) == 0 ? 1 : Math.ceil(this.totalRows / this.pageSize);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    handleSubmit(type) {
      switch (type) {
        case "add":
          this.handleAdd();
          break;
        case "edit":
          this.handleUpdate();
          break;
      }
    },
    handleAdd() {
      let APIUrl = "/material/add";
      console.log("handleAdd");
      server
        .post(APIUrl, this.formData)
        .then((res) => {
          console.log(res);
          this.clearForm();
          this.showModal = false;
          this.GetData();
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    handleUpdate() {
      let APIUrl = "/material/update";
      console.log("handleUpdate");
      server
        .put(APIUrl, this.formData)
        .then((res) => {
          console.log(res);
          if (res != null && res.data != null && res.data.code == 200) {
            this.clearForm();
            this.showModal = false;
            this.GetData();
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    handleDelete(item) {
      let APIUrl = `/material/delete?id=${item.id}`;
      console.log("handleDelete");
      server
        .delete(APIUrl, this.formData)
        .then((res) => {
          console.log(res);
          if (res != null && res.data != null && res.data.code == 200) {
            this.GetData();
            Swal.fire("完成!", "已成功刪除此商品！", "success");
          }
          if (res.data.code == 601) {
            Swal.fire("錯誤!", res.data.data.message, "error");
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    handelCategorySelect(data) {
      console.log(data);
      this.categoryActiveTitle = data.title;
      this.formData.categoryId = data.id;
      this.categoryActiveIsShow = false;
    },
    handelCategorySelectForQuery(data) {
      console.log(data);
      this.categoryTitle = data.title;
      this.categoryId = data.id;
      this.categoryActiveIsShow = false;
    },
    confirmDelete(data) {
      Swal.fire({
        title: "確定刪除？",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        cancelButtonText: "取消",
        confirmButtonText: "確定",
      }).then((result) => {
        console.log(result);
        if (result.value) {
          this.handleDelete(data);
        }
      });
    },
    handlePageChange(value) {
      // currentPage:1,
      // maxPage:10,
      if (value === 'prev') {
        this.currentPage--;
        if (this.currentPage === 1) {
          this.currentPage = 1
        }
      }
      if (value === 'next') {
        this.currentPage++;
        if (this.currentPage === this.maxPage) {
          this.currentPage = this.maxPage
        }
      }
      this.GetData()
    }
  },
  watch: {

    categoryTitle() {
      //console.log("watch categoryTitle", newVal)
      this.GetData();
    },

    showModal(newVal) {
      if (newVal === false) {
        this.clearForm();
      }
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

                    <div class="selectDropDownBox">
                      <div class="mainTitle" @click="categoryActiveIsShow = !categoryActiveIsShow"
                        style="min-width:200px">
                        {{ categoryTitle == '' ? '全部類別' : categoryTitle }}&nbsp;
                        <i class="icon dripicons-arrow-thin-down" v-show="categoryTitle == ''"></i>
                        <i class="icon mdi mdi-close" v-show="categoryTitle != ''"
                          @click="categoryTitle = ''; categoryId = ''; categoryActiveIsShow = true"></i>
                      </div>
                      <div class="dropDownList" v-show="categoryActiveIsShow">
                        <dl>
                          <template v-for="(item, index) in categoryList" :key="index">
                            <dt @click="handelCategorySelectForQuery(item)">
                              {{ item.title }}
                            </dt>
                            <dd v-for="(child, childIndex) in item.children" :key="childIndex"
                              @click="handelCategorySelectForQuery(child)">
                              {{ child.title }}
                            </dd>
                          </template>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="search-box me-2 mb-2 d-inline-block">
                  <div class="position-relative">
                    <input type="text" class="form-control" placeholder="關鍵字(名稱/規格/型號)" v-model="materialParam"
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
                  <button type="button" class="btn btn-success btn-rounded mb-2 me-2" @click="EditOne({ type: 'add' })">
                    <i class="mdi mdi-plus me-1"></i> 新增商品
                  </button>
                </div>
              </div>
              <!-- end col-->
            </div>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap align-middle">
                <thead>
                  <tr>
                    <th width="50">#</th>
                    <th width="300">品名</th>
                    <th width="180">規格</th>
                    <th width="180">型號</th>
                    <th width="120">品號</th>

                    <th width="120">條碼</th>
                    <th width="60">長</th>
                    <th width="60">寬</th>
                    <th width="60">高</th>

                    <th width="60">材積</th>
                    <th width="180">類別</th>
                    <th width="120">儲位</th>
                    <th width="60">狀態</th>
                    <th width="150">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in lists" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td style="white-space: break-spaces">{{ item.name }}</td>
                    <td style="white-space: break-spaces">{{ item.standard }}</td>
                    <td style="white-space: break-spaces">{{ item.model }}</td>
                    <td style="white-space: break-spaces">{{ item.number }}</td>

                    <td style="white-space: break-spaces">{{ item.barcode }}</td>
                    <td>{{ item.length }}</td>
                    <td>{{ item.width }}</td>
                    <td>{{ item.high }}</td>
                    <td>{{ item.volume }}</td>
                    <td style="white-space: break-spaces">{{ item.categoryName }}</td>
                    <td style="white-space: break-spaces">{{ item.counter }}</td>

                    <td>
                      <div class="btn-group btn-group-sm">
                        <span class="btn btn-success" v-if="item.enabled == true">啟用</span>
                        <span class="btn btn-danger" v-if="item.enabled == false">停用</span>
                      </div>
                    </td>
                    <td>
                      <div class="btn-group btn-group-sm">
                        <a class="btn btn-secondary" href="javascript:;"
                          @click="EditOne({ type: 'edit', data: item })">編輯</a>
                        <a class="btn btn-danger" href="javascript:;" @click="confirmDelete(item)">刪除</a>
                      </div>


                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul class="pagination pagination-rounded justify-content-center mb-2">
              <li class="page-item" :class="currentPage == 1 ? 'disabled' : ''">
                <a class="page-link" href="javascript:;" aria-label="Previous" @click="handlePageChange('prev')"><i
                    class="mdi mdi-chevron-left"></i></a>
              </li>
              <li class="page-item" v-for="(pg1, pdx) in [-3, -2, -1, 0, 1, 2, 3]" :key="'page' + pdx"
                :class="pg1 == 0 ? 'active' : ''" v-show="currentPage + pg1 >= 1 && currentPage + pg1 <= maxPage">
                <a class="page-link" href="javascript:;" @click="currentPage = currentPage + pg1; this.GetData()">{{
                  currentPage + pg1 }}</a>
              </li>
              <li class="page-item" :class="currentPage == maxPage ? 'disabled' : ''">
                <a class="page-link" href="javascript:;" aria-label="Next" @click="handlePageChange('next')"><i
                    class="mdi mdi-chevron-right"></i></a>
              </li>
            </ul>
            <b-modal size="xl" v-model="showModal" :title="modelInfo.title" title-class="text-black font-18"
              body-class="p-3" hide-footer>
              <div class="row">
                <div class="col-sm-12 col-md-4 col-lg-3">
                  <label for="name">品名</label>
                  <input id="name" type="text" v-model="formData.name" class="form-control" />
                </div>
                <div class="col-sm-12 col-md-4 col-lg-3">
                  <label for="standard">規格</label>
                  <input id="standard" type="text" v-model="formData.standard" class="form-control" />
                </div>
                <div class="col-sm-12 col-md-4 col-lg-3">
                  <label for="model">型號</label>
                  <input id="model" type="text" v-model="formData.model" class="form-control" />
                </div>

                <div class="col-sm-12 col-md-4 col-lg-3">
                  <label for="model">類別</label>
                  <div class="selectDropDownBox">
                    <div class="mainTitle" @click="categoryActiveIsShow = !categoryActiveIsShow">
                      {{ categoryActiveTitle }}
                      <i class="icon dripicons-arrow-thin-down" v-show="categoryActiveTitle == ''"></i>
                      <i class="icon mdi mdi-close" v-show="categoryActiveTitle != ''"
                        @click="categoryActiveTitle = ''"></i>
                    </div>
                    <div class="dropDownList" v-show="categoryActiveIsShow">
                      <dl>
                        <template v-for="(item, index) in categoryList" :key="index">
                          <dt @click="handelCategorySelect(item)">
                            {{ item.title }}
                          </dt>
                          <dd v-for="(child, childIndex) in item.children" :key="childIndex"
                            @click="handelCategorySelect(child)">
                            {{ child.title }}
                          </dd>
                        </template>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-3">
                  <label for="length">長</label>
                  <input id="length" type="text" v-model="formData.length" class="form-control" @change="calVolume()" />
                </div>
                <div class="col-sm-12 col-md-4 col-lg-3">
                  <label for="width">寬</label>
                  <input id="width" type="text" v-model="formData.width" class="form-control" @change="calVolume()" />
                </div>
                <div class="col-sm-12 col-md-4 col-lg-3">
                  <label for="high">高</label>
                  <input id="high" type="text" v-model="formData.high" class="form-control" @change="calVolume()" />
                </div>

                <div class="col-sm-12 col-md-4 col-lg-3">
                  <label for="volume">材積=((長*寬*高)+基本差異數)/27826</label>
                  <input id="volume" type="text" v-model="formData.volume" class="form-control" />
                </div>
                <div class="col-sm-12 col-md-4 col-lg-3">
                  <label for="model">品號</label>
                  <input id="model" type="text" v-model="formData.number" class="form-control" readonly="readonly" />
                </div>

                <div class="col-sm-12 col-md-4 col-lg-3">
                  <label for="mBarCode">條碼</label>
                  <input id="mBarCode" type="text" v-model="formData.barcode" class="form-control" />
                </div>
                <div class="col-sm-12 col-md-4 col-lg-3">
                  <label for="enabled">狀態</label>
                  <select class="form-select" v-model="formData.enabled">
                    <option value="true">啟用</option>
                    <option value="false">停用</option>
                  </select>
                </div>


                <div class="col-sm-12 col-md-4 col-lg-3">

                  <label for="name">客戶</label>
                  <select class="form-select" v-model="formData.organId">
                    <option :value="u1.id" selected v-for="u1 in supplierlist" :key="'formData_organId' + u1.id">
                      {{ u1.idname }}
                    </option>
                  </select>

                </div>

                <div class="col-sm-12 col-md-4 col-lg-3">
                  <label for="counter">儲位</label>
                  <input id="counter" type="text" v-model="formData.counter" class="form-control" />
                </div>
              </div>

              <div class="text-end pt-5 mt-3">
                <b-button variant="light" @click="showModal = false">
                  關閉
                </b-button>
                <b-button type="submit" variant="success" class="ms-1" @click="handleSubmit(modelInfo.type)">{{
                  modelInfo.submitName }}</b-button>
              </div>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
<style lang="scss" scoped>
.selectDropDownBox {
  z-index: 1;
  position: relative;

  .mainTitle {
    position: relative;
    display: block;
    width: 100%;
    min-height: 36px;
    padding: 0.47rem 1.8rem 0.47rem 0.75rem;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    .icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }

  .dropDownList {
    position: absolute;
    left: 0;
    top: 105%;
    width: 100%;
    height: 150px;
    padding: 12px;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    overflow-y: auto;
    font-size: 13px;

    dt,
    dd {
      cursor: pointer;
      transition: color 0.15s ease-in-out;

      &:hover {
        color: #556ee6;
      }
    }

    dt {
      padding: 3px;
      font-weight: 700;
      border-bottom: 1px solid #ced4da;
    }

    dd {
      padding: 5px;
      font-weight: 400;
      margin-bottom: 5px;

      &::before {
        content: "-";
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
}
</style>
