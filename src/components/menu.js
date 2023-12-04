export const menuItems = [{
        id: 10001,
        label: "首頁",
        icon: "bx-home-circle",
        link: "/",
    },
    {
        id: 11001,
        label: "人事管理",
        icon: "bxs-user-detail",
        subItems: [

            { id: 11004, label: "客戶管理", link: "/user/customerlist", parentId: 11001 },
            { id: 11006, label: "司機管理", link: "/user/driverlist", parentId: 11001 },
            { id: 12005, label: "車輛管理", link: "/stock/vehiclelist", parentId: 11001 },
        ]
    },
    {
        id: 11101,
        label: "商品管理",
        icon: "bx-box",
        subItems: [
            { id: 11102, label: "商品管理", link: "/product/index", parentId: 11101 },
            { id: 11103, label: "商品類別", link: "/product/category", parentId: 11101 },
        ]
    },
    {
        id: 12001,
        label: "倉庫管理",
        icon: "bx-store",
        subItems: [
            { id: 12002, label: "倉庫別管理", link: "/stock/depotlist", parentId: 12101 },
            { id: 12003, label: "進貨單", link: "/stock/instocklist", parentId: 12001 },
            { id: 12004, label: "配送單", link: "/stock/outstocklist", parentId: 12001 },
            { id: 12005, label: "移倉管理", link: "/stock/movestocklist", parentId: 12001 },
        ]
    },
    {
        id: 13001,
        label: "報表查詢",
        icon: "bxs-report",
        subItems: [
            { id: 13002, label: "進銷存統計", link: "/report/in_out_stock_report", parentId: 13001 },

        ]
    },
    {
        id: 19001,
        label: "系統管理",
        icon: "bxs-user-rectangle",
        subItems: [
            { id: 19002, label: "角色管理", link: "/system/rolelist", parentId: 19001 },
            { id: 19003, label: "用戶管理", link: "/system/userlist", parentId: 19001 },
        ]
    },
];