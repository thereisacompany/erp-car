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
        title: "移倉管理",
        meta: [{ name: "description", content: appConfig.description }],
    },
    components: { Layout, PageHeader },
    data() {
        return {
            chkAll: true,
            SubView: 0,
            materialParam: '',
            queryKeyword: '',
            depotId: '',
            number: '',
            beginTime: '',
            endTime: '',
            MaxFileSize: 0,
            userlist: [],
            accountlist: [],
            organId: '',
            supplierlist: [],
            depotList: [],
            //counterList: [],
            filelist: [],
            customersData: [],
            customersItem: [],
            customersItem_selectindex: -1,
            materialsList: [],
            title: "移倉管理",
            items: [
                {
                    text: "倉庫管理",
                    href: "javascript:;",
                },
                {
                    text: "倉庫別管理",
                    href: "javascript:;",
                },
                {
                    text: "移倉管理",
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
                type: '出庫',//"入库"
                subType: '移倉',//"采购"
                defaultNumber: '',//"CGRK00000000846"
                totalPrice: '',//-11
                accountIdList: '',//""
                accountMoneyList: '',//""
                fileName: '',//""
                status: 0,//"0"
                remark: '',
                mainArrival: '',
                extrasArrival: '',
                agreedDelivery: '',
                delivered: '',

                notiNumber: '',
                taxid: '',
                buyerName: '',
                receiveName: '',
                telephone: '',
                cellphone: '',
                address: '',
                counterId: '',
                counterName: '',
                date2: '',
                time2: '',
                anotherDepotId: '',
                anotherCounterName: '',
                anotherCounterId: '',
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
            organId: { required: helpers.withMessage("請選擇客戶", required), },
            anotherDepotId: { required: helpers.withMessage("請選擇移入倉庫", required), },
            //extrasArrival: {required: helpers.withMessage("請選擇贈品到貨日", required),},
            // agreedDelivery: { required: helpers.withMessage("請選擇約配日", required), },
            // delivered: { required: helpers.withMessage("請選擇配達日", required), },
        },

    },

    mounted() {
        this.$nextTick(() => {
            this.GetUserList();//負責人列表
            this.GetAccountList();//結算人帳號列表
            //this.GetSupplierList();
            server.GetSupplierList((rows) => { this.supplierlist = rows })
            this.GetDepotList();//倉庫別
            //this.GetCounterList();//儲位別
            this.GetMaxFileSize();
            this.GetData();
        })
    },

    watch: {
        chkAll: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    for (let i = 0; i < this.customersData.length; i++) {
                        this.customersData[i].chk = newVal;
                    }
                }
            },
        },
        beginTime: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.GetData();
                }
            },
        },
        endTime: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.GetData();
                }
            },
        },
    },
    methods: {

        /**
         * Modal form submit
         */
        // eslint-disable-next-line no-unused-vars
        handleSubmit(iWay) {
            this.submitted = true;
            // stop here if form is invalid            
            this.v$.$touch();
            if (this.v$.$invalid) {
                return;
            } else {
                //console.log ("this.customers.extrasArrival",this.customers.extrasArrival)
                this.customers.extrasArrival = dayjs(this.customers.extrasArrival).isValid() ? dayjs(this.customers.extrasArrival).format("YYYY-MM-DD") : null;
                if (this.customers.id == null || this.customers.id == 0 || this.customers.id == 0) {

                    let aObj = JSON.parse(JSON.stringify(this.customers))
                    let bObj = JSON.parse(JSON.stringify(this.customersItem))

                    aObj.number = aObj.defaultNumber;
                    aObj.fileName = this.filelist.join(',');
                    aObj.operTime = `${aObj.date2} ${aObj.time2}`
                    aObj.totalPrice = this.customersItemAllPrice;
                    aObj.type = '出庫';
                    aObj.subType = '移倉';
                    delete aObj.id;
                    delete aObj.date2;
                    delete aObj.time2;


                    let errMsg = '';

                    if (bObj.length == 0) {
                        errMsg += '請至少新增一筆商品\n';
                    }
                    if (errMsg == '') {


                        for (let i = 0; i < bObj.length; i++) {
                            let b1 = bObj[i]
                            if (b1.depotId == null || b1.depotId == '') {
                                errMsg += `#${i + 1} 請選擇倉庫別\n`;
                            }
                            if (b1.barCode == null || b1.barCode == '') {
                                errMsg += `#${i + 1} 請選擇商品\n`;
                            }
                            b1.anotherDepotId = this.customers.anotherDepotId;
                            b1.anotherCounterId = this.customers.anotherCounterId;
                            b1.anotherCounterName = this.customers.anotherCounterName;
                        }

                    }
                    if (errMsg != '') {
                        alert(errMsg)
                        return;
                    }
                    this.AddData({ info: JSON.stringify(aObj), rows: JSON.stringify(bObj) });
                } else if (this.customers.id > 0) {

                    let aObj = JSON.parse(JSON.stringify(this.customers))
                    let bObj = JSON.parse(JSON.stringify(this.customersItem))

                    aObj.number = aObj.defaultNumber;
                    aObj.fileName = this.filelist.join(',');
                    aObj.operTime = `${aObj.date2} ${aObj.time2}`
                    aObj.totalPrice = this.customersItemAllPrice;

                    //delete aObj.id;
                    delete aObj.date2;
                    delete aObj.time2;


                    let errMsg = '';

                    if (bObj.length == 0) {
                        errMsg += '請至少新增一筆商品\n';
                    }

                    if (errMsg == '') {


                        for (let i = 0; i < bObj.length; i++) {
                            let b1 = bObj[i]
                            if (b1.depotId == null || b1.depotId == '') {
                                errMsg += `#${i + 1} 請選擇倉庫別\n`;
                            }
                            if (b1.barCode == null || b1.barCode == '') {
                                errMsg += `#${i + 1} 請選擇商品\n`;
                            }
                            b1.anotherDepotId = this.customers.anotherDepotId;
                            b1.anotherCounterId = this.customers.anotherCounterId;
                            b1.anotherCounterName = this.customers.anotherCounterName;

                        }

                    }
                    if (errMsg != '') {
                        alert(errMsg)
                        return;
                    }
                    this.UpdData({ info: JSON.stringify(aObj), rows: JSON.stringify(bObj) });
                }
            }
            this.submitted = false;
        },

        NewRow1(callback) {
            // let obj1 = this.GetNewCustomerItemObj1();
            // obj1.id = new Date().getTime() + Math.random().toString().substr(2, 7);
            // obj1.orderNum = this.customersItem.length + 1;
            // //this.GetMaterialListByRow(this.customers.organId, obj1.depotId, obj1.counterId, obj1.name, (rows) => { obj1.queryMaterialList = rows; this.customersItem.push(obj1); })
            // this.GetMaterialListByRow(this.customers.organId, obj1.depotId, obj1.counterId, obj1.name, (rows) => {

            //     obj1.queryMaterialList = JSON.parse(JSON.stringify(rows));
            //     this.customersItem.push(obj1);
            //     if (callback) {
            //         callback();
            //     }

            // })
            // // this.customersItem.push(obj1);

            let obj1 = this.GetNewCustomerItemObj1();
            obj1.id = new Date().getTime() + Math.random().toString().substr(2, 7);
            obj1.orderNum = this.customersItem.length + 1;
            let wObj = { organId: this.customers.organId, depotId: obj1.depotId, number: obj1.number }
            server.GetMaterialListByRow(wObj, (rows) => {
                obj1.queryMaterialList = rows;
                this.customersItem.push(obj1);
                if (callback) {
                    callback();
                }
            })

        },
        InitEveryRowsProduct() {
            // for (let i = 0; i < this.customersItem; i++) {
            //     let obj1 = this.customersItem[i]
            //     this.GetMaterialListByRow(this.customers.organId, obj1.depotId, obj1.counterId, obj1.name, (rows) => { obj1.queryMaterialList = rows; })
            // }
            for (let i = 0; i < this.customersItem; i++) {
                let obj1 = this.customersItem[i]
                //this.GetMaterialListByRow(this.customers.organId, obj1.depotId, obj1.counterId, obj1.name, (rows) => { obj1.queryMaterialList = rows })
                let wObj = { organId: this.customers.organId, depotId: obj1.depotId, number: obj1.number }
                server.GetMaterialListByRow(wObj, (rows) => { obj1.queryMaterialList = rows; })
            }
        },
        DeleteRow1(SubItem) {

            const filteredArray = this.customersItem.filter(obj => !(obj.id === SubItem.id));
            for (let i = 0; i < filteredArray.length; i++) {
                filteredArray[i].orderNum = (i + 1);
            }
            this.customersItem = filteredArray;

        },
        GetNewCustomerItemObj1() {
            //customersItem
            let NewObj1 = {};
            NewObj1.id = ''; //"16794997361110338834",
            NewObj1.name = ''; //"123",
            NewObj1.standard = ''; //null,
            NewObj1.model = ''; //null,
            NewObj1.color = ''; //null,
            NewObj1.materialOther = ''; //"",
            NewObj1.stock = ''; //2,
            NewObj1.amount = '';
            NewObj1.unit = ''; //"123",
            NewObj1.snList = ''; //"",
            NewObj1.batchNumber = ''; //"",
            NewObj1.expirationDate = ''; //"",
            NewObj1.sku = ''; //"",
            NewObj1.preNumber = ''; //"",
            NewObj1.finishNumber = ''; //"",
            NewObj1.operNumber = ''; //1,數量
            NewObj1.unitPrice = ''; //"100",單價
            NewObj1.allPrice = ''; //100,總價
            NewObj1.taxRate = ''; //0,稅率
            NewObj1.taxMoney = ''; //0,稅價
            NewObj1.taxLastMoney = ''; //100,含稅價
            NewObj1.remark = ''; //"",
            NewObj1.linkId = ''; //"",
            NewObj1.orderNum = ''; //1,
            NewObj1.depotId = ''; //"19", //倉庫ID
            NewObj1.barCode = ''; //"100123445",
            NewObj1.counterId = 0; //"100123445",
            NewObj1.counterName = ''; //"100123445",

            NewObj1.queryMaterialList = [];
            return NewObj1;
        },
        ConfirmOne(RowItem) {
            console.log(RowItem)
        },
        EditOne(RowItem) {

            if (RowItem.number == '') {
                this.SubView = 1;
                for (let key in this.customers) {
                    this.customers[key] = '';
                }


                this.GetBuilderNumber();
                this.filelist = [];
                this.customers.id = 0;
                this.customersItem = [];
                this.customers.date2 = dayjs().format("YYYY-MM-DD");
                this.customers.time2 = dayjs().format("HH:mm:ss");
                this.NewRow1();
                return;
            }
            if (RowItem.number != null && RowItem.number != '') {
                this.EditShow(RowItem, 2)

                return;
            }
        },
        EditShow(RowItem, iEditType) {
            //console.log(RowItem,iEditType)
            this.SubView = iEditType;

            this.filelist = [];
            this.customers.id = RowItem.headerId;
            this.customers.subId = RowItem.subId;
            this.customers.number = RowItem.number;
            this.customers.defaultNumber = this.customers.number;
            this.customersItem = [];
            this.customers.date2 = dayjs(RowItem.operTime).format("YYYY-MM-DD");
            this.customers.time2 = dayjs(RowItem.operTime).format("HH:mm:ss");
            this.customers.anotherDepotId = RowItem.sid
            this.customers.anotherCounterName = RowItem.scounter
            this.customers.anotherCounterId = RowItem.scounterId
            this.customers.remark = RowItem.newRemark;
            this.customers.status = RowItem.status;
            this.customers.organId = RowItem.organId;
            this.NewRow1(() => {
                this.customersItem[0].subId = RowItem.subId; // 細項ID
                this.customersItem[0].name = RowItem.mname; //"123",
                this.customersItem[0].standard = RowItem.standard; //null,
                this.customersItem[0].model = RowItem.model; //null,
                this.customersItem[0].operNumber = RowItem.operNumber; //1,數量
                this.customersItem[0].amount = RowItem.confirmNumber; //1,數量
                this.customersItem[0].unitPrice = RowItem.unitPrice; //"100",單價
                this.customersItem[0].allPrice = RowItem.allPrice; //100,總價
                this.customersItem[0].taxRate = RowItem.taxRate; //0,稅率
                this.customersItem[0].taxMoney = RowItem.taxMoney; //0,稅價
                this.customersItem[0].taxLastMoney = RowItem.taxLastMoney; //100,含稅價                

                this.customersItem[0].depotId = RowItem.did; //"19", //倉庫ID
                this.customersItem[0].categoryName = RowItem.categoryName; //"19", //倉庫ID

                this.customersItem[0].barCode = RowItem.barCode; //"100123445",
                this.customersItem[0].counterId = RowItem.dcounterId; //"100123445",
                this.customersItem[0].counterName = RowItem.dcounter; //"100123445",
                this.customersItem[0].number = RowItem.mnumber;
                this.customersItem[0].stock = RowItem.stock;

            });

        },
        queryMaterial(SubItem, cidx) {

            this.queryMaterialObj.q = SubItem.materialName || '';
            this.queryMaterialObj.categoryId = SubItem.categoryId || '';
            this.queryMaterialObj.depotId = SubItem.depotId || '';
            this.queryMaterialObj.currentPage = 1;
            this.GetMaterialList();
            this.customersItem_selectindex = cidx
            this.showModal = true;
        },
        queryMaterialByRow(SubItem, cidx) {
            // let querymaterialName = SubItem.name || '';
            // let querydepotId = SubItem.depotId || '';

            // this.GetMaterialListByRow(this.customers.organId, querydepotId, SubItem.counterId, querymaterialName, (rows) => {

            //     SubItem.queryMaterialList = rows.filter(x => x.stock > 0);
            //     let F1List = rows.filter(x => String(x.name) == String(querymaterialName))
            //     if (F1List.length != 0) {
            //         if (this.customers.organId != null && this.customers.organId != '' && SubItem.depotId != null && SubItem.depotId != '') {
            //             this.MaterialSelectOneByRow(F1List[0], cidx)
            //         } else {
            //             alert('請先選擇 客戶/倉庫別')
            //             SubItem.name = '';
            //             this.MaterialSelectOneByRow(null, cidx)
            //         }
            //     } else {
            //         this.MaterialSelectOneByRow(null, cidx)
            //     }
            // });
            let wObj = { organId: this.customers.organId, depotId: SubItem.depotId, number: SubItem.number }
            server.GetMaterialListByRow(wObj, (rows) => {
                //SubItem.queryMaterialList = rows;
                SubItem.queryMaterialList = rows.filter(x => x.stock > 0);
                let F1List = rows.filter(x => String(x.number) == String(SubItem.number))
                if (F1List.length != 0) {
                    if (this.customers.organId != null && this.customers.organId != '' && SubItem.depotId != null && SubItem.depotId != '') {
                        this.MaterialSelectOneByRow(F1List[0], cidx)
                    } else {
                        alert('請先選擇 客戶/倉庫別')
                        SubItem.name = '';
                        this.MaterialSelectOneByRow(null, cidx)
                    }
                } else {
                    this.MaterialSelectOneByRow(null, cidx)
                }
            })
        },
        MaterialSelectOneByRow(MaterialSubItem, cidx) {
            //console.log("MaterialSelectOneByRow", cidx)
            if (MaterialSubItem != null) {
                this.customersItem[cidx].name = MaterialSubItem.name;
                this.customersItem[cidx].standard = MaterialSubItem.standard;
                this.customersItem[cidx].model = MaterialSubItem.model;
                this.customersItem[cidx].categoryName = MaterialSubItem.categoryName;
                this.customersItem[cidx].unit = MaterialSubItem.unit;
                this.customersItem[cidx].barCode = MaterialSubItem.mBarCode;
                this.customersItem[cidx].stock = MaterialSubItem.stock;

                this.customersItem[cidx].number = MaterialSubItem.number;
                this.customersItem[cidx].counterName = MaterialSubItem.counter;
                // this.SetMaterialModel(this.customersItem[cidx])
                // this.SetDepotStock(this.customersItem[cidx]);
            } else {
                //this.customersItem[cidx].name = MaterialSubItem.name;
                this.customersItem[cidx].standard = "";
                this.customersItem[cidx].model = "";
                this.customersItem[cidx].categoryName = "";
                this.customersItem[cidx].unit = "";
                this.customersItem[cidx].barCode = "";
                this.customersItem[cidx].stock = "";

                this.customersItem[cidx].number = "";
                this.customersItem[cidx].counterName = "";
                // this.SetMaterialModel(this.customersItem[cidx])
                // this.SetDepotStock(this.customersItem[cidx]);
            }

        },

        SetDepotStock(SubItem) {
            //console.log(SubItem)
            let depotId = SubItem.depotId || 0;
            let barCode = SubItem.barCode || '';
            let organId = this.customers.organId || 0;
            this.FindStockByDepotAndBarCode(depotId, barCode, organId, (depotStock) => {

                if (depotStock != null) {
                    SubItem.stock = depotStock.stock;
                }
            })
        },
        SetMaterialModel(SubItem) {
            //let depotId = SubItem.depotId || 0;
            let barCode = SubItem.barCode || '';
            this.GetMaterialByBarCode(barCode, (Material1) => {

                if (Material1 != null && Material1.length != 0) {
                    SubItem.model = Material1[0].model;
                    SubItem.operNumber = SubItem.operNumber || 1;//1,數量

                    SubItem.unitPrice = Material1[0].purchaseDecimal || 0; //"100",單價
                    SubItem.allPrice = (SubItem.unitPrice || 0) * SubItem.operNumber; //100,總價
                    SubItem.taxRate = SubItem.taxRate || 0; //0,稅率
                    SubItem.taxMoney = Math.round((SubItem.taxMoney || 0) / 100 * SubItem.allPrice); //0,稅價
                    SubItem.taxLastMoney = SubItem.allPrice + SubItem.taxMoney; //100,含稅價

                    this.CalPayMoney();
                }
            })

        },
        BatchSetStatus() {

            if (this.IsGetDataing == true) return;
            let idsList = this.customersData.filter(x => x.chk == true && x.status == 5).map(y => y.subId);


            if (idsList == null || idsList.length == 0) {
                alert('請至少選擇一個單據!')
                return;
            }

            if (confirm(`確認批次完成${idsList.length}筆移倉單?`) != true) {
                return;
            }

            let ids = idsList.join(',')
            this.IsGetDataing = true;
            let data1 = { ids }
            let APIUrl = `/transferDepot/batchSetStatus`;

            server.post(APIUrl, data1)
                .then((res) => {
                    if (res != null && res.data != null && res.data.code == 200) {
                        this.showModal = false;
                        this.$nextTick(() => {
                            this.SubView = 0;
                            this.GetData()
                        });
                    }
                    this.IsGetDataing = false;
                }).catch(function (error) {
                    console.log("error", error);
                    this.IsGetDataing = false;
                    return;
                });

        },
        SingleSetStatus() {
            //單一移倉設置狀態-移倉完成
            if (this.IsGetDataing == true) return;

            if (this.customers.id == null || this.customers.id == 0) {
                alert('請選擇一個單據!')
                return;
            }
            let ConfirmAmount = "";
            if (this.customersItem[0].amount != null && this.customersItem[0].amount != '' && this.customersItem[0].amount >= 0) {
                ConfirmAmount = `\n確認數量:${this.customersItem[0].amount}`;
            }
            if (confirm(`確認完成單號:${this.customers.defaultNumber}移倉單\n商品:${this.customersItem[0].name}?${ConfirmAmount}`) != true) {
                return;
            }


            this.IsGetDataing = true;
            let data1 = {}
            if (ConfirmAmount != '') {
                data1.amount = this.customersItem[0].amount;
            }
            let APIUrl = `/transferDepot/setStatus/${this.customersItem[0].subId}`;

            server.post(APIUrl, data1)
                .then((res) => {
                    if (res != null && res.data != null && res.data.code == 200) {
                        this.showModal = false;
                        this.$nextTick(() => {
                            this.SubView = 0;
                            this.GetData()
                        });
                    }
                    this.IsGetDataing = false;
                }).catch(function (error) {
                    console.log("error", error);
                    this.IsGetDataing = false;
                    return;
                });

        },
        // GetDetailByNumber(number) {
        //     ///jshERP-boot/depotHead/getDetailByNumber?number=CGRK00000000994
        //     let APIUrl = `/depotHead/getDetailByNumber?number=${number}`;
        //     server.get(APIUrl)
        //         .then((res) => {

        //             if (res != null && res.data != null && res.status == 200) {
        //                 let jshdata = res.data.data;
        //                 this.customers = jshdata;
        //                 this.customers.date2 = dayjs(this.customers.operTime).format("YYYY-MM-DD");
        //                 this.customers.time2 = dayjs(this.customers.operTime).format("HH:mm:ss");
        //                 this.customers.mainArrival = dayjs(this.customers.mainArrival).isValid() ? dayjs(this.customers.mainArrival).format("YYYY-MM-DD") : null;
        //                 this.customers.extrasArrival = dayjs(this.customers.extrasArrival).isValid() ? dayjs(this.customers.extrasArrival).format("YYYY-MM-DD") : null;
        //                 this.customers.agreedDelivery = dayjs(this.customers.agreedDelivery).isValid() ? dayjs(this.customers.agreedDelivery).format("YYYY-MM-DD") : null;
        //                 this.customers.delivered = dayjs(this.customers.delivered).isValid() ? dayjs(this.customers.delivered).format("YYYY-MM-DD") : null;

        //                 this.filelist = this.customers.fileName.split(",").filter(x => x != '');
        //             }
        //         }).catch(function (error) {
        //             console.log("error", error);
        //         });
        // },

        GetDetailList(headerId) {
            ///jshERP-boot/depotItem/getDetailList?headerId=289&mpList=%E5%88%B6%E9%80%A0%E5%95%86,%E8%87%AA%E5%AE%9A%E4%B9%891,%E8%87%AA%E5%AE%9A%E4%B9%892,%E8%87%AA%E5%AE%9A%E4%B9%893&linkType=basic&isReadOnly=1
            let APIUrl = `/depotItem/getDetailList?headerId=${headerId}&mpList=3&linkType=basic&isReadOnly=1`;
            server.get(APIUrl)
                .then((res) => {

                    if (res != null && res.data != null && res.status == 200) {
                        let jshdata = res.data.data;
                        this.customersItem = jshdata.rows;
                        this.customersItem.pop();
                    }
                }).catch(function (error) {
                    console.log("error", error);
                });
        },

        GetMaterialList() {
            ////material/findBySelect?q=111&categoryId=26&depotId=19&column=createTime&order=desc&mpList=%E5%88%B6%E9%80%A0%E5%95%86,%E8%87%AA%E5%AE%9A%E4%B9%891,%E8%87%AA%E5%AE%9A%E4%B9%892,%E8%87%AA%E5%AE%9A%E4%B9%893&page=1&rows=10
            let APIUrl = `/material/findBySelect`;
            let Params = `?q=${encodeURIComponent(this.queryMaterialObj.q)}`;
            Params += `&categoryId=${encodeURIComponent(this.queryMaterialObj.categoryId)}`;
            Params += `&depotId=${encodeURIComponent(this.queryMaterialObj.depotId)}`;
            Params += `&page=${encodeURIComponent(this.queryMaterialObj.currentPage)}`;
            Params += `&rows=${encodeURIComponent(this.queryMaterialObj.pageSize)}`;
            Params += `&mpList=`;
            // Params += `&mpList=${encodeURIComponent('制造商')},${encodeURIComponent('自定义1')},${encodeURIComponent('自定义2')},${encodeURIComponent('自定义3')}`;
            // Params += `&t=${new Date().getTime()}&column=createTime&order=desc`;
            APIUrl += Params;

            server.get(APIUrl)
                .then((res) => {

                    if (res != null && res.data != null && res.status == 200) {
                        let jshdata = res.data;
                        this.materialsList = jshdata.rows;
                        this.queryMaterialObj.maxPage = Math.ceil(jshdata.total / this.queryMaterialObj.pageSize) == 0 ? 1 : Math.ceil(jshdata.total / this.queryMaterialObj.pageSize);

                        this.showModal = true;

                    }
                }).catch(function (error) {
                    console.log("error", error);
                });
        },
        GetBuilderNumber() {
            this.customers.defaultNumber = 0;
            ///jshERP-boot/sequence/buildNumber
            let APIUrl = `/sequence/buildNumber`;
            server.get(APIUrl)
                .then((res) => {
                    //{"code":200,"data":{"defaultNumber":"00000000745"}}
                    if (res != null && res.data != null && res.status == 200) {
                        let jshdata = res.data.data;
                        this.customers.defaultNumber = `G${jshdata.defaultNumber}`;
                        //console.log('this.customers.defaultNumber', this.customers.defaultNumber)
                    }
                }).catch(function (error) {
                    console.log("error", error);
                });
        },
        GetMaxFileSize() {

            let APIUrl = `/systemConfig/fileSizeLimit`;
            server.get(APIUrl)
                .then((res) => {

                    if (res != null && res.data != null && res.status == 200) {
                        let jshdata = res.data.data;
                        this.MaxFileSize = jshdata;

                    }
                }).catch(function (error) {
                    console.log("error", error);
                });
        },


        GetMaterialByBarCode(barCode, callback) {
            ///jshERP-boot/material/getMaterialByBarCode?barCode=33333344&mpList=%E5%88%B6%E9%80%A0%E5%95%86,%E8%87%AA%E5%AE%9A%E4%B9%891,%E8%87%AA%E5%AE%9A%E4%B9%892,%E8%87%AA%E5%AE%9A%E4%B9%893&prefixNo=CGRK
            let APIUrl = `/material/getMaterialByBarCode?barCode=${barCode}&mpList=`;
            server.get(APIUrl)
                .then((res) => {
                    //{"code":200,"data":{"defaultNumber":"00000000745"}}
                    if (res != null && res.data != null && res.status == 200) {
                        let jshdata = res.data.data;
                        callback(jshdata);
                    }
                }).catch(function (error) {
                    console.log("error", error);
                    callback(null);
                });
        },
        FindStockByDepotAndBarCode(depotId, barCode, organId, callback) {
            ////jshERP-boot/depotItem/findStockByDepotAndBarCode?depotId=19&barCode=33333344
            let APIUrl = `/depotItem/findStockByDepotAndBarCode?depotId=${depotId}&barCode=${barCode}&organId=${organId}`;
            server.get(APIUrl)
                .then((res) => {
                    //{"code":200,"data":{"defaultNumber":"00000000745"}}
                    if (res != null && res.data != null && res.status == 200) {
                        let jshdata = res.data.data;
                        callback(jshdata);
                    }
                }).catch(function (error) {
                    console.log("error", error);
                    callback(null);
                });
        },

        // SubCounterList(depotId) {
        //     if (depotId == null || depotId == '' || depotId == 0) return this.counterList;
        //     return this.counterList.filter(x => String(x.depotId) == String(depotId));
        // },

        // GetCounterList() {
        //     let APIUrl = `/depot/counter/getAllList?currentPage=1&pageSize=10000`;
        //     server.get(APIUrl)
        //         .then((res) => {
        //             console.log("res", res)
        //             if (res != null && res.data != null && res.status == 200) {
        //                 let jshdata = res.data.data;
        //                 this.counterList = jshdata.rows;
        //             }
        //         }).catch(function (error) {
        //             console.log("error", error);
        //         });
        // },
        GetDepotList() {
            ///jshERP-boot/depot/findDepotByCurrentUser  
            let APIUrl = `/depot/findDepotByCurrentUser`;
            server.get(APIUrl)
                .then((res) => {
                    if (res != null && res.data != null && res.status == 200) {
                        let jshdata = res.data.data;
                        this.depotList = jshdata;
                    }
                }).catch(function (error) {
                    console.log("error", error);
                });
        },
        GetUserList() {

            let APIUrl = `/user/getUserList`;
            server.get(APIUrl)
                .then((res) => {
                    if (res != null && res.data != null && res.status == 200) {
                        let jshdata = res.data;
                        this.userlist = jshdata;
                    }
                }).catch(function (error) {
                    console.log("error", error);
                });
        },
        GetAccountList() {

            let APIUrl = `/account/getAccount`;
            server.get(APIUrl)
                .then((res) => {
                    //console.log("GetAccountList", res, res.code, res.data)
                    if (res != null && res.data != null && res.data.code == 200) {
                        let jshdata = res.data.data;
                        this.accountlist = jshdata.accountList;
                    }
                }).catch(function (error) {
                    console.log("error", error);
                });
        },
        CalPayMoney() {
            if (this.customersItemAllPrice == 0) {
                this.customers.discountLastMone = 0;
                this.customers.changeAmount = 0;
                this.customers.debt = 0;
                return;
            }

            // this.customers.discount=  "12",
            // this.customers.discountMoney=  3.24,
            this.customers.discountLastMoney = this.customersItemAllPrice - this.customers.discountMoney
            //this.customers.otherMoney=  "55"
            this.customers.changeAmount = this.customers.discountLastMoney + this.customers.otherMoney
            this.customers.debt = 0
        },

        GetData() {
            if (this.IsGetDataing == true) return;
            this.IsGetDataing = true;
            let APIUrl = `/depotHead/findAllocationDetail`;
            let APIParameter = `?currentPage=${this.currentPage}&pageSize=${this.pageSize}`;

            //let queryStr = `{"type":"出庫","number":"${this.number}","materialParam":"${this.materialParam}","organId":"${this.organId}","beginTime":"${this.beginTime}","endTime":"${this.endTime}","depotId":"${this.depotId}","keyword":"${this.queryKeyword}"}`;
            //APIParameter += `&search=${encodeURIComponent(queryStr)}`;
            APIParameter += `&subType=${encodeURIComponent('移倉')}&keyword=${this.queryKeyword}&depotId=${this.depotId}&materialParam=${encodeURIComponent(this.materialParam)}&beginTime=${encodeURIComponent(this.beginTime)}&endTime=${encodeURIComponent(this.endTime)}&remark=${encodeURIComponent(this.remark)}&number=${encodeURIComponent(this.number)}`;
            server.get(APIUrl + APIParameter)
                .then((res) => {
                    if (res != null && res.data != null && res.data.code == 200 && res.data.data != null) {
                        let jshdata = res.data.data;
                        this.customersData = jshdata.rows;
                        this.totalRows = jshdata.total;
                        this.maxPage = Math.ceil(this.totalRows / this.pageSize) == 0 ? 1 : Math.ceil(this.totalRows / this.pageSize);
                    }
                    this.IsGetDataing = false;
                    for (let i = 0; i < this.customersData.length; i++) {
                        this.customersData[i].chk = this.chkAll;
                    }
                    //console.log("datalist:", this.customersData)
                }).catch(function (error) {
                    console.log("error", error);
                    this.IsGetDataing = false;
                    return;
                });
        },
        AddData(data1) {
            if (this.IsGetDataing == true) return;
            this.IsGetDataing = true;


            // data1.agreedDelivery = dayjs(data1.agreedDelivery).isValid() ? dayjs(data1.agreedDelivery).format("YYYY-MM-DD") : null;
            // data1.delivered = dayjs(data1.delivered).isValid() ? dayjs(data1.delivered).format("YYYY-MM-DD") : null;

            //let APIUrl = `/depotHead/addDepotHeadAndDetail`;
            let APIUrl = `/transferDepot/add`;
            server.post(APIUrl, data1)
                .then((res) => {
                    if (res != null && res.data != null && res.data.code == 200) {
                        this.showModal = false;
                        this.$nextTick(() => {
                            this.SubView = 0;
                            this.GetData()
                        });
                    } else if (res != null && res.data != null && res.data.code != 200) {
                        alert(res.data.data.message)
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

            data1.agreedDelivery = dayjs(data1.agreedDelivery).isValid() ? dayjs(data1.agreedDelivery).format("YYYY-MM-DD") : null;
            data1.delivered = dayjs(data1.delivered).isValid() ? dayjs(data1.delivered).format("YYYY-MM-DD") : null;

            let APIUrl = `/transferDepot/update`;
            server.put(APIUrl, data1)
                .then((res) => {
                    if (res != null && res.data != null && res.data.code == 200) {
                        this.showModal = false;
                        this.$nextTick(() => {
                            this.SubView = 0;
                            this.GetData()
                        });
                    } else if (res != null && res.data != null && res.data.code != 200) {
                        alert(res.data.data.message)
                    }
                    this.IsGetDataing = false;
                }).catch(function (error) {
                    console.log("error", error);
                    this.IsGetDataing = false;
                    return;
                });
        },

        handleFileUpload: function () {

            for (let i = 0; i < this.$refs.file2.files.length; i++) {
                //this.filelist.push(this.$refs.file2.files[i]);
                //console.log("file1", i, this.$refs.file2.files[i].name, this.$refs.file2.files[i])
                let file1 = this.$refs.file2.files[i];
                if (file1.size <= this.MaxFileSize) {
                    this.UploadFile1("bill", file1, (uploadPath) => {
                        if (uploadPath != null) {
                            this.filelist.push(uploadPath);
                        }
                    })
                }

            }
            this.$refs.file2.value = '';

        },
        UploadFile1(biz, file1, callback) {
            //http://w66.ddns.net:9955/jshERP-boot/systemConfig/upload

            let APIUrl = `/systemConfig/upload`;
            const formData = new FormData();
            formData.append('biz', biz);
            formData.append('file', file1);
            server.post(APIUrl, formData)
                .then((res) => {

                    if (res != null && res.data != null && res.data.code == 200) {
                        let jshdata = res.data;
                        callback(jshdata.data)
                    }
                }).catch(function (error) {
                    console.log("error", error);
                    callback(null)
                    return;
                });

        },
        CheckIsImage(ImageUrl) {
            let filename = this.GetAccessFile1(ImageUrl);
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
            const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
            if (imageExtensions.includes(extension)) {
                return true;
            }
            return false;
        },
        ShowImage(ImageUrl) {
            let filename = this.GetAccessFile1(ImageUrl);

            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
            const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
            if (imageExtensions.includes(extension)) {
                this.showImageURL = filename;
                this.showImageModal = true;
            } else {
                window.open(filename, "file1");
            }


        },
        GetAccessFile1(UrlPath1) {
            ///systemConfig/static/

            let APIUrl = `${process.env.VUE_APP_API_URL}/systemConfig/static/${UrlPath1}`;
            return APIUrl;

        },
        DeleteFile1(file1) {
            const filteredArray = this.filelist.filter(obj => !(obj === file1));

            this.filelist = filteredArray;
        }
    },
};
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row" v-if="SubView == 1 || SubView == 2 || SubView == 3">
            <div class="col-lg-62">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-4">{{ SubView == 1 ? '新增移倉單' : (SubView == 2 ? '修改移倉單' : '查看移倉單') }}</h4>
                        <b-form>

                            <div class="row">
                                <div class="col-sm-12 col-md-6 col-lg-3">

                                    <label for="name">客戶</label>
                                    <select class="form-select" v-model="customers.organId" @change="InitEveryRowsProduct"
                                        :class="{ 'is-invalid': submitted && v$.customers.organId.$error, }">
                                        <option :value="u1.id" selected v-for="u1 in supplierlist"
                                            :key="'customers_organId' + u1.id">
                                            {{ u1.idname }}</option>
                                    </select>
                                    <div v-if="submitted && v$.customers.organId.$error" class="invalid-feedback">
                                        <span v-if="v$.customers.organId.required.$message">{{
                                            v$.customers.organId.required.$message
                                        }}</span>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6 col-lg-3">
                                    <label for="name">單號</label>
                                    <input type="text" class="form-control" readonly v-model="customers.defaultNumber" />
                                </div>
                                <div class="col-sm-12 col-md-6 col-lg-3">
                                    <label for="name">日期</label>
                                    <input type="date" class="form-control" v-model="customers.date2" />
                                </div>
                                <div class="col-sm-12 col-md-6 col-lg-3">
                                    <label for="name">時間</label>
                                    <input type="time" class="form-control" v-model="customers.time2" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="table-responsive">

                                        <table class="table table-centered table-bordered table-nowrap align-middle">
                                            <thead>
                                                <tr>
                                                    <th width="1%">#</th>
                                                    <th width="10%">倉庫</th>
                                                    <th width="10%">品號</th>
                                                    <th width="15%">商品</th>
                                                    <th width="5%">類別</th>
                                                    <th width="5%">規格</th>
                                                    <th width="5%">型號</th>
                                                    <th width="5%">庫存</th>
                                                    <th width="10%">儲位</th>
                                                    <th width="5%">數量</th>
                                                    <th width="5%" v-if="SubView == 2 || SubView == 3">確認數量</th>

                                                    <th width="1%" v-if="SubView == 1">操作</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(SubItem, cidx) in customersItem" :key="'SubItem_depoit' + cidx">
                                                    <td>{{ (currentPage - 1) * pageSize + cidx + 1 }}</td>
                                                    <td>
                                                        <select class="form-select" v-model="SubItem.depotId"
                                                            @change="queryMaterialByRow(SubItem, cidx)">
                                                            <option :value="u1.id" selected v-for="u1 in depotList"
                                                                :key="'customers_depot_id' + cidx + u1.id">
                                                                {{ u1.depotName }}</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <div class="position-relative">
                                                            <input type="text" class="form-control"
                                                                :list="'datalistOptions' + cidx"
                                                                @keyup="queryMaterialByRow(SubItem, cidx)"
                                                                v-model="SubItem.number" />

                                                            <datalist :id="'datalistOptions' + cidx">
                                                                <option v-for="(q1, qdx) in SubItem.queryMaterialList"
                                                                    :value="q1.number"
                                                                    :key="'customer_name_list' + cidx + qdx">
                                                                    {{ q1.number }}
                                                                </option>
                                                            </datalist>
                                                        </div>

                                                    </td>
                                                    <td>{{ SubItem.name }}
                                                    </td>

                                                    <td> {{ SubItem.categoryName }}
                                                    </td>
                                                    <td> {{ SubItem.standard }}
                                                    </td>
                                                    <td> {{ SubItem.model }}
                                                    </td>
                                                    <td> {{ SubItem.stock }}
                                                    </td>
                                                    <td> {{ SubItem.counterName }}
                                                    </td>
                                                    <td>
                                                        <input type="text" class="form-control"
                                                            v-model="SubItem.operNumber">
                                                    </td>
                                                    <td v-if="SubView == 2 || SubView == 3">
                                                        <input type="text" class="form-control" v-model="SubItem.amount">
                                                    </td>

                                                    <td v-if="SubView == 1">
                                                        <div class="button-items">
                                                            <a href="javascript:;" class="btn btn-sm btn-danger"
                                                                @click="DeleteRow1(SubItem)">刪除</a>
                                                        </div>
                                                    </td>


                                                </tr>
                                            </tbody>
                                        </table>
                                        <a href="javascript:;" class="btn btn-sm btn-success" v-if="SubView == 1"
                                            @click="NewRow1()">新增一列商品資料</a>

                                    </div>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-sm-12 col-md-4 col-lg-3">
                                    <label for="name">移入倉庫</label>
                                    <select class="form-select" v-model="customers.anotherDepotId"
                                        :class="{ 'is-invalid': submitted && v$.customers.anotherDepotId.$error, }">
                                        <option :value="u1.id" selected v-for="u1 in depotList"
                                            :key="'customers_anotherDepotId' + u1.id">
                                            {{ u1.depotName }}</option>
                                    </select>
                                    <div v-if="submitted && v$.customers.anotherDepotId.$error" class="invalid-feedback">
                                        <span v-if="v$.customers.anotherDepotId.required.$message">{{
                                            v$.customers.anotherDepotId.required.$message
                                        }}</span>
                                    </div>

                                </div>
                                <div class="col-sm-12 col-md-4 col-lg-3">
                                    <label for="name">移入儲位</label>
                                    <input type="text" class="form-control" v-model="customers.anotherCounterName">
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-sm-12">
                                    <label for="name">備註</label>
                                    <input type="text" class="form-control" v-model="customers.remark">
                                </div>
                            </div>



                        </b-form>
                    </div>
                </div>
            </div>


            <div>
                <div class="button-items">
                    <a href="javascript:;" class="btn btn-primary" @click="handleSubmit(1)" v-if="SubView == 1">新增</a>
                    <a href="javascript:;" class="btn btn-primary" @click="handleSubmit(2)" v-if="SubView == 2">保存</a>
                    <a href="javascript:;" class="btn btn-primary" @click="SingleSetStatus" v-if="SubView == 2">移倉完成</a>

                    <a href="javascript:;" class="btn btn-secondary" @click="SubView = 0">返回</a>
                </div>

            </div>
        </div>


        <b-modal size="xl" v-model="showImageModal" title="顯示圖片" title-class="text-black font-18" body-class="p-3"
            hide-footer>
            <form>
                <div class="row text-center">
                    <div class="col-12">
                        <img :src="showImageURL" max-width="100%" max-height="100%" style="max-width: 100%;">
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
                                    <div class="position-relative">
                                        <label for="name">移倉單號</label>
                                        <input type="text" class="form-control" placeholder="移倉單號" v-model="number"
                                            @keyup.enter="GetData()" />
                                    </div>
                                </div>
                                <div class="search-box me-2 mb-2 d-inline-block">
                                    <div class="position-relative">
                                        <label for="name">商品資料</label>
                                        <input type="text" class="form-control" placeholder="商品資料" @keyup.enter="GetData()"
                                            v-model="materialParam" />
                                    </div>
                                </div>

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
                                    <div class="position-relative">
                                        <label for="name">起始日期</label>
                                        <b-form-input id="date" v-model="beginTime" type="date"
                                            aria-placeholder="日期"></b-form-input>
                                    </div>
                                </div>
                                <div class="search-box me-2 mb-2 d-inline-block">
                                    <div class="position-relative">
                                        <label for="name">結束日期</label>
                                        <b-form-input id="date" v-model="endTime" type="date"
                                            aria-placeholder="日期"></b-form-input>
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
                            <div class="col-sm-4">
                                <div class="text-sm-end">
                                    <button type="button" class="btn btn-success btn-rounded mb-2 me-2"
                                        @click="EditOne({ number: '' })">
                                        <i class="mdi mdi-plus me-1"></i> 新增移倉單
                                    </button>
                                    <button type="button" class="btn btn-success btn-rounded mb-2 me-2"
                                        @click="BatchSetStatus()"> 批次移倉完成
                                    </button>
                                </div>
                            </div>
                            <!-- end col-->
                        </div>
                        <div class="table-responsive">
                            <table class="table table-centered table-nowrap align-middle">
                                <thead>
                                    <tr>
                                        <th width="5px"><input type="checkbox" v-model="chkAll"> </th>
                                        <th width="5px">#</th>

                                        <th>移倉調撥單</th>
                                        <th>時間</th>
                                        <th>商品</th>
                                        <th>品號</th>
                                        <th>數量</th>
                                        <th>移出</th>
                                        <th>移入</th>
                                        <th>備註</th>
                                        <th>狀態</th>
                                        <th>操作</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(SubItem, cidx) in customersData" :key="SubItem.id">
                                        <td><input type="checkbox" v-model="SubItem.chk" :disabled="SubItem.status != 5">
                                        </td>
                                        <td>{{ (currentPage - 1) * pageSize + cidx + 1 }}</td>
                                        <td style="white-space: break-spaces;word-break:break-all">{{ SubItem.number }}</td>
                                        <td style="white-space: break-spaces;word-break:break-all">{{ SubItem.operTime }}
                                        </td>
                                        <td style="white-space: break-spaces;word-break:break-all">
                                            <div v-for="name1 in String(SubItem.mname).split(',')"
                                                :key="'SubItem' + cidx + name1">{{ name1 }}</div>
                                        </td>
                                        <td style="white-space: break-spaces;word-break:break-all">{{ SubItem.mnumber }}
                                        </td>
                                        <td style="white-space: break-spaces;word-break:break-all">{{ SubItem.operNumber }}
                                        </td>

                                        <td>{{ SubItem.dname }}</td>
                                        <td>{{ SubItem.sname }}</td>

                                        <td style="white-space: break-spaces;word-break:break-all">{{ SubItem.newRemark }}
                                        </td>
                                        <td>
                                            <div class="btn-group btn-group-sm">
                                                <span class="btn btn-success" v-if="SubItem.status == 4">已完成</span>
                                                <span class="btn btn-danger" v-if="SubItem.status == 5">移倉中</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="btn-group btn-group-sm">
                                                <a class="btn btn-info" href="javascript:;"
                                                    @click="EditShow(SubItem, 3)">查看</a>
                                                <a class="btn btn-secondary" href="javascript:;" v-if="SubItem.status == 5"
                                                    @click="EditShow(SubItem, 2)">編輯</a>

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
