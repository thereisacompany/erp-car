<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import dayjs from 'dayjs'
import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import { server } from "@/api";


import appConfig from "@/app.config";

/**
 * Customers component
 */
export default {
    page: {
        title: "進銷存統計",
        meta: [{ name: "description", content: appConfig.description }],
    },
    components: { Layout, PageHeader },
    data() {
        return {

            SubView: 0,
            materialParam: '',
            organId: '',
            depotId: '',
            monthTime: '',
            queryYear: '',
            queryMonth: '',
            number: '',
            beginTime: '',
            endTime: '',
            MaxFileSize: 0,
            userlist: [],
            accountlist: [],
            supplierlist: [],
            depotList: [],
            filelist: [],
            customersData: [],
            customersItem: [],
            customersItem_selectindex: -1,
            materialsList: [],
            title: "進銷存統計",
            items: [
                {
                    text: "報表查詢",
                    href: "javascript:;",
                },
                {
                    text: "進銷存統計",
                    active: true,
                },
            ],
            queryMaterialObj: {
                q: '',
                categoryId: '',
                depotId: '',
                currentPage: 1,
                maxPage: 1,
                pageSize: 10,
            },
            showModal: false,
            submitted: false,
            showImageModal: false,
            customers: {

                id: '',

                organId: '',//57
                operTime: '',//"2023-03-22 17:21:07"
                number: '',//"CGRK00000000846"
                discount: 0,//0
                discountMoney: 0,//0
                discountLastMoney: 0,//11
                otherMoney: 0,//0
                accountId: '',//17
                changeAmount: 0,//-11
                debt: 0,//0
                type: '入庫',//"入库"
                subType: '進貨單',//"采购"
                defaultNumber: '',//"CGRK00000000846"
                totalPrice: '',//-11
                accountIdList: '',//""
                accountMoneyList: '',//""
                fileName: '',//""
                status: 0,//"0"
                remark: '',

                date2: '',
                time2: '',
            },

            name: '',
            remark: '',

            IsGetDataing: false,
            pageSize: 10,
            totalRows: 0,
            currentPage: 1,
            maxPage: 10,
        };
    },
    computed: {
        customersItemAllPrice: function () {
            if (this.customersItem.filter(x => x.allPrice != 0).length == 0) {
                return 0;
            }
            let itemallPrice = this.customersItem.filter(x => x.allPrice != 0).map(y => y.allPrice).reduce((a, b) => a + b);

            return itemallPrice;
        }
    },
    setup() {

        return { v$: useVuelidate() };
    },
    validations: {
        customers: {
            organId: {
                required: helpers.withMessage("請選擇供應商", required),
            },
            accountId: {
                required: helpers.withMessage("請選擇結算帳號", required),
            },

        },

    },
    mounted() {
        this.queryYearList = []
        for (let i = 0; i < 10; i++) {
            this.queryYearList.push(dayjs().year() - i)
        }

        this.$nextTick(() => {
            this.queryYear = dayjs().year();
            this.queryMonth = dayjs().month();
            this.GetDepotList();//倉庫別
            this.GetData();


        })
    },
    methods: {
        /**
         * Modal form submit
         */
        // eslint-disable-next-line no-unused-vars



        GetDepotList() {
            ///jshERP-boot/depot/findDepotByCurrentUser  
            let APIUrl = `/depot/findDepotByCurrentUser`;
            server.get(APIUrl)
                .then((res) => {
                    console.log("res", res)
                    if (res != null && res.data != null && res.status == 200) {
                        let jshdata = res.data.data;
                        this.depotList = jshdata;
                    }
                }).catch(function (error) {
                    console.log("error", error);
                });
        },

        GetData() {
            if (this.IsGetDataing == true) return;
            this.IsGetDataing = true;
            let APIUrl = `/depotItem/findByAll`;

            ///depotItem/findByAll?depotId=&monthTime=2023-07&materialParam=&mpList=&column=createTime&order=desc&depotIds=4&field=id,,rowIndex,barCode,materialName,materialStandard,materialModel,materialOther,unitName,unitPrice,prevSum,inSum,outSum,thisSum,thisAllPrice&currentPage=1&pageSize=10

            let APIParameter = `?currentPage=${this.currentPage}&pageSize=${this.pageSize}&mpList=&order=desc`;
            APIParameter += `&monthTime=${this.queryYear}-${this.queryMonth}&materialParam=${this.materialParam}&depotIds=${this.depotId}`;
            server.get(APIUrl + APIParameter)
                .then((res) => {
                    if (res != null && res.data != null && res.data.code == 200 && res.data.data != null) {
                        let jshdata = res.data.data;
                        this.customersData = jshdata.rows;
                        this.totalRows = jshdata.total;
                        this.maxPage = Math.ceil(this.totalRows / this.pageSize) == 0 ? 1 : Math.ceil(this.totalRows / this.pageSize);
                    }
                    this.IsGetDataing = false;
                    //console.log("datalist:", this.customersData)
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

        <b-modal size="xl" v-model="showImageModal" title="顯示圖片" title-class="text-black font-18" body-class="p-3"
            hide-footer>
            <form>
                <div class="row text-center">
                    <div class="col-12">
                        <img :src="showImageURL" max-width="100%" max-height="100%">
                    </div>
                </div>

                <div class="text-end pt-5 mt-3">
                    <b-button variant="light" @click="showImageModal = false">關閉</b-button>
                </div>
            </form>
        </b-modal>
        <div class="row" v-show="SubView == 0">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row mb-2">
                            <div class="col-sm-8">

                                <div class="search-box me-2 mb-2 d-inline-block">
                                    <label for="name">倉庫別</label>
                                    <select class="form-select" v-model="depotId" @change="GetData()">
                                        <option :value="u1.id" selected
                                            v-for="u1 in [{ id: '', depotName: '全部' }, ...depotList]"
                                            :key="'query_depot_id' + u1.id">
                                            {{ u1.depotName }}</option>
                                    </select>
                                </div>

                                <div class="search-box me-2 mb-2 d-inline-block">
                                    <label for="name">年度</label>
                                    <select class="form-select" v-model="queryYear" @change="GetData()">
                                        <option :value="u1" selected v-for="u1 in queryYearList"
                                            :key="'query_year_id' + u1">
                                            {{ u1 }}</option>
                                    </select>
                                </div>
                                <div class="search-box me-2 mb-2 d-inline-block">
                                    <label for="name">月份</label>
                                    <select class="form-select" v-model="queryMonth" @change="GetData()">
                                        <option :value="u1" selected v-for="u1 in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                                            :key="'query_month_id' + u1.id">
                                            {{ u1 }}</option>
                                    </select>
                                </div>
                                <div class="search-box me-2 mb-2 d-inline-block">
                                    <div class="position-relative">
                                        <label for="name">商品資料</label>
                                        <input type="text" class="form-control" placeholder="商品資料" @keyup.enter="GetData()"
                                            v-model="materialParam" />
                                    </div>
                                </div>
                                <div class="search-box me-2 mb-2 d-inline-block">
                                    <div class="position-relative">
                                        <b-button variant="primary" @click="GetData()">
                                            <i
                                                :class="IsGetDataing ? 'bx bx-loader bx-spin font-size-16 align-middle me-2' : ''">
                                            </i>
                                            查詢
                                        </b-button>
                                    </div>
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
                                        <th>規格</th>
                                        <th>型號</th>
                                        <th>品號</th>
                                        <th>備註</th>
                                        <th>上月結存數量</th>
                                        <th>入庫數量</th>
                                        <th>出庫數量</th>
                                        <th>本月結存數量</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(SubItem, cidx) in customersData" :key="SubItem.id">
                                        <td>{{ (currentPage - 1) * pageSize + cidx + 1 }}</td>
                                        <td style="white-space: break-spaces;word-break:break-all">
                                            {{ SubItem.materialName }}
                                        </td>
                                        <td style="white-space: break-spaces;word-break:break-all">
                                            {{ SubItem.materialStandard }}
                                        </td>
                                        <td style="white-space: break-spaces;word-break:break-all">
                                            {{ SubItem.materialModel }}
                                        </td>
                                        <td style="white-space: break-spaces;word-break:break-all">
                                            {{ SubItem.materialNumber }}
                                        </td>
                                        <td style="white-space: break-spaces;word-break:break-all">
                                            {{ SubItem.materialOther }}
                                        </td>
                                        <td class="text-center">{{ SubItem.prevSum }}</td>
                                        <td class="text-center">{{ SubItem.inSum }}</td>
                                        <td class="text-center">{{ SubItem.outSum }}</td>
                                        <td class="text-center">{{ SubItem.thisSum }}</td>
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
                                :class="pg1 == 0 ? 'active' : ''"
                                v-show="currentPage + pg1 >= 1 && currentPage + pg1 <= maxPage">
                                <a class="page-link" href="javascript:;"
                                    @click="currentPage = currentPage + pg1; this.GetData()">{{
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
