<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import { server } from "@/api";
import Swal from "sweetalert2";
// import qs from "qs";

export default {
  components: { Layout, PageHeader },
  data() {
    return {
      showModal: false,
      showModalType: "", //add, edit
      title: "商品類別",
      items: [
        {
          text: "商品類別",
          href: "javascript:;",
        },
        {
          text: "商品列表",
          active: true,
        },
      ],
      lists: [],
      // formData: {
      //   checked: false,//false
      //   children: [] ,//[]
      //   id: null,//24540
      //   key: null,//24540
      //   name: "",//"test123"
      //   parentId: null,//24427
      //   remark: "",//"備註"
      //   serialNo: null,//"123"
      //   sort: "",//"3"
      //   state: "open",//"open"
      //   title: "",//"test123"
      //   value: null,//24540
      // },
      formData: {
        id: null,
        name: "",
        children: [],
        title: "", //分類名稱
        serialNo: null,
        parentId: null, //上層分類ID
        sort: null, //排序
        remark: "", //備註
      },
    };
  },
  mounted() {
    this.handleGetMaterialCategoryTree();
  },
  watch: {
    showModal(newVal) {
      if (newVal === false) {
        this.handleCloseModal();
      }
    },
  },
  computed: {
    formModalButtonName() {
      let result = "新增";
      switch (this.showModalType) {
        case "add":
          result = "新增";
          break;
        case "edit":
          result = "編輯";
          break;
      }
      return result;
    },
  },
  methods: {
    async handleOpenAddCategory() {
      // 開啟新增分類modal
      this.showModalType = "add";
      this.showModal = true;
      const result = await this.handleGetMaterialCategoryTree();
      this.formData.children = [];
      this.formData.children = result.data;
    },
    async handleSubmitAddCategory() {
      // 送出新增分類modal
      let APIUrl = `/materialCategory/add`;
      let queryStr = {
        name: this.formData.title,
        // serialNo: "1234605",
        sort: this.formData.sort,
        // remark: "備註",
        parentId: this.formData.parentId,
      };
      // parentId: 123 //上層目錄
      // let APIParameter = `?info=${encodeURIComponent(queryStr)}`
      try {
        const result = await server.post(APIUrl, queryStr);
        console.log("handleSubmit >>>", result);
        this.clearformData();
        this.handleGetMaterialCategoryTree();
        this.showModal = false;
      } catch (error) {
        console.log(error);
      }
    },
    handleCloseModal() {
      console.log("close");
      this.showModal = false;
      this.clearformData();
    },
    clearformData() {
      this.formData = {
        id: null,
        name: "",
        children: [],
        title: "", //分類名稱
        serialNo: null,
        parentId: null, //上層分類ID
        sort: null, //排序
        remark: "", //備註
      };
      this.showModalType = "";
    },
    async handleOpenEditCategory(item) {
      // 開啟編輯分類modal
      this.showModalType = "edit";
      this.showModal = true;
      let APIUrl = `/materialCategory/findById?id=${item.id}`;
      try {
        const result = await server.get(APIUrl);
        // console.log("handleOpenEditCategory >>>", result);
        const { id, name, serialNo, parentId, sort, remark } = result.data.data;
        let children = this.lists.filter((data) => {
          // console.log(data, item);
          return data.id != item.id;
        });
        console.log(children);
        this.formData["id"] = id;
        this.formData["name"] = name;
        this.formData["children"] = children;
        this.formData["serialNo"] = serialNo;
        this.formData["parentId"] = parentId;
        this.formData["sort"] = sort;
        this.formData["remark"] = remark;
        this.formData["title"] = name;
      } catch (error) {
        console.log(error);
      }
    },
    async handleSubmitEditCategory() {
      // 送出新增分類modal
      let APIUrl = `/materialCategory/update`;
      let queryStr = this.formData;
      queryStr["name"] = this.formData["title"];
      // let queryStr = {
      //   name: this.formData.title,
      //   // serialNo: "1234605",
      //   sort: this.formData.sort,
      //   // remark: "備註",
      //   // parentId: "",
      // };
      try {
        const result = await server.put(APIUrl, queryStr);
        console.log("handleSubmit >>>", result);
        this.clearformData();
        this.handleGetMaterialCategoryTree();
        this.showModal = false;
      } catch (error) {
        console.log(error);
      }
    },
    handleSubmit() {
      switch (this.showModalType) {
        case "add":
          this.handleSubmitAddCategory();
          break;
        case "edit":
          this.handleSubmitEditCategory();
          break;
      }
    },
    async handleGetMaterialCategoryTree() {
      //取得分類列表
      console.log("handleGetMaterialCategoryTree");
      let APIUrl = `/materialCategory/getMaterialCategoryTree?id=`;
      try {
        const result = await server.get(APIUrl);
        // console.log(result);
        this.lists = [];
        this.lists = this.transformtMaterialCategoryTree(result.data);
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
    async handleDeleteData(data) {
      //刪除資料
      console.log(data);
      let APIUrl = `/materialCategory/deleteBatch?ids=${data.id}`;
      try {
        const result = await server.delete(APIUrl);
        console.log(result);
        this.handleGetMaterialCategoryTree();
        Swal.fire("完成!", "已成功刪除此分類！", "success");
        return true;
      } catch (error) {
        console.log(error);
        return error;
      }
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
          this.handleDeleteData(data);
        }
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
            <div class="row">
              <div class="col-sm-3">
                <button type="button" class="btn btn-success btn-rounded mb-2 me-2" @click="handleOpenAddCategory()">
                  <i class="mdi mdi-plus me-1"></i> 新增分類
                </button>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap align-middle">
                <thead>
                  <tr>
                    <th width="50">#</th>
                    <th>分類名稱</th>
                    <th width="150">操作</th>
                  </tr>
                </thead>
                <tbody v-for="(item, index) in lists" :key="index">
                  <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.title }}</td>
                    <td>
                      <div>
                        <a href="javascript:;" style="margin-right: 10px" @click="handleOpenEditCategory(item)">
                          編輯
                        </a>
                        <a v-if="item.children.length > 0" class="link" href="javascript:;"
                          @click="item.childOpen = !item.childOpen" style="margin-right: 10px">下層</a>
                        <a class="link" href="javascript:;" @click="confirmDelete(item)">刪除</a>
                      </div>
                    </td>
                  </tr>
                  <template v-if="item.children.length > 0 && item.childOpen">
                    <tr>
                      <td colspan="3" style="padding: 0">
                        <table class="table table-centered table-nowrap align-middle">
                          <tbody v-for="(child, childIndex) in item.children" :key="childIndex">
                            <tr>
                              <td width="50">-</td>
                              <td>{{ child.title }}</td>
                              <td width="150">
                                <div>
                                  <a href="javascript:;" style="margin-right: 10px"
                                    @click="handleOpenEditCategory(child)">
                                    編輯
                                  </a>
                                  <a class="link" href="javascript:;" @click="confirmDelete(child)">刪除</a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <b-modal v-model="showModal" :title="`${formModalButtonName}分類`" title-class="text-black font-18"
              body-class="p-3" hide-footer bvModalEvent.trigger="handleCloseModal">
              <form @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-12 mb-3">
                    <label for="title">分類名稱</label>
                    <input id="title" type="text" v-model="formData.title" class="form-control" placeholder="分類名稱" />
                  </div>
                  <div class="col-12 mb-3">
                    <label for="title">排序</label>
                    <input id="title" type="text" v-model="formData.sort" class="form-control" placeholder="排序" />
                  </div>
                  <div class="col-12 mb-3">
                    <label for="title">上層分類{{ formData.id }}</label>
                    <select class="form-select" v-model="formData.parentId">
                      <option :value="null" selected>請選擇上層分類</option>
                      <option :value="item.id" v-for="(item, index) in formData.children" :key="index">
                        {{ item.title }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="text-end pt-5 mt-3">
                  <b-button variant="light" @click="handleCloseModal">
                    關閉
                  </b-button>
                  <b-button type="submit" variant="success" class="ms-1">
                    確認
                  </b-button>
                </div>
              </form>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
