import axios from 'axios';
import common from "@/api/common";
const server = axios.create({
    baseURL: process.env.VUE_APP_API_URL //http://jslerp.ddns.net:9999/jshERP-boot/
});

server.interceptors.request.use(function(config) {
    // 在送出 request 之前可以在這裡攔截處理
    //console.log(config)

    let user = localStorage.getItem('user')
    if (user) {
        let token = JSON.parse(user).token
        if (token) {
            config.headers['X-Access-Token'] = token // 讓每個請求攜帶自定義 token 請根據實際情況自行修改
        }
    }

    return config;
}, function(error) {
    // 如果 request 出現 error
    // 可以在這裡攔截處理
    console.log(error)
    return Promise.reject(error);
});

server.interceptors.response.use(function(response) {
    // 回傳的 status code 在 2xx 區間會觸發這個函式
    // 可以在這裡拿到 response 做處理
    //console.log(response)
    return response;
}, function(error) {
    // 回傳的 status code 不在 2xx 區間會觸發這個函式
    // 可以在這裡拿到 response error 做處理
    console.log(error);
    //回傳錯誤時,清除己登入的資料,會自動回登入頁
    localStorage.removeItem("user");
    return Promise.reject(error);
});






server.GetDepotHeadList = function(wObj, callback) {
    // /frontend/depotHead/list 派發列表
    let currentPage = common.IsNumber(wObj.currentPage) ? Number(wObj.currentPage) : 1;
    let pageSize = common.IsNumber(wObj.pageSize) ? Number(wObj.pageSize) : 10;
    let driverId = common.IsNumber(wObj.driverId) ? Number(wObj.driverId) : 0;

    let APIUrl = `/frontend/depotHead/list`;
    let APIParameter = `?currentPage=${currentPage}&pageSize=${pageSize}`;
    let queryStr = `{"type":"出庫","driverId":${driverId}}`;

    APIParameter += `&search=${encodeURIComponent(queryStr)}`;
    server.get(APIUrl + APIParameter)
        .then((res) => {
            if (res != null && res.data != null && res.status == 200) {
                let jshdata = res.data;
                if (callback) callback(jshdata.data)
            }
        }).catch(function(error) {
            console.log("error", error);
        });
}



server.GetDeliveryData = function(wObj, callback) {
    // /api/frontend/getDeliveryData 取得配送單狀態
    let number = !common.IsNullOrEmpty(wObj.number) ? wObj.number : '';

    let APIUrl = `/frontend/getDeliveryData`;
    let APIParameter = `?number=${encodeURIComponent(number)}`;
    server.get(APIUrl + APIParameter)
        .then((res) => {
            if (res != null && res.data != null && res.status == 200) {
                let jshdata = res.data;
                if (callback) callback(jshdata.data)
            }
        }).catch(function(error) {
            console.log("error", error);
        });
}
server.GetDetailByNumber = function(wObj, callback) {
    // /api/frontend/getDetailByNumber 訂單資訊Detail
    let number = !common.IsNullOrEmpty(wObj.number) ? wObj.number : '';

    let APIUrl = `/frontend/getDetailByNumber`;
    let APIParameter = `?number=${encodeURIComponent(number)}`;
    server.get(APIUrl + APIParameter)
        .then((res) => {
            if (res != null && res.data != null && res.status == 200) {
                let jshdata = res.data;
                if (callback) callback(jshdata.data)
            }
        }).catch(function(error) {
            console.log("error", error);
        });
}

server.GetDetailList = function(wObj, callback) {
    // /api/frontend/getDetailList 商品明细列表
    let headerId = !common.IsNullOrEmpty(wObj.headerId) ? wObj.headerId : '';

    let APIUrl = `/frontend/getDetailList`;
    let APIParameter = `?headerId=${encodeURIComponent(headerId)}&mpList=`;
    server.get(APIUrl + APIParameter)
        .then((res) => {
            if (res != null && res.data != null && res.status == 200) {
                let jshdata = res.data;
                if (callback) callback(jshdata.data)
            }
        }).catch(function(error) {
            console.log("error", error);
        });
}


server.SetOrderStatus = function(wObj, callback) {
    let headerId = !common.IsNullOrEmpty(wObj.headerId) ? wObj.headerId : '';
    let orderStatus = !common.IsNullOrEmpty(wObj.orderStatus) ? wObj.orderStatus : '';

    let APIUrl = `/frontend/order/status`;
    //let APIParameter = `?headerId=${encodeURIComponent(headerId)}&orderStatus=${encodeURIComponent(orderStatus)}`;
    let data2 = { headerId, orderStatus };

    server.put(APIUrl, data2)
        .then((res) => {
            if (res != null && res.data != null && res.status == 200) {
                let jshdata = res.data;
                if (callback) callback(jshdata)
            }
        })
        .catch(function(error) {
            console.log("error", error);
        });
}

server.driverReport = function(wObj, callback) {
    //司機回報功能api
    let detailId = !common.IsNullOrEmpty(wObj.detailId) ? wObj.detailId : '';
    let message = !common.IsNullOrEmpty(wObj.message) ? wObj.message : '';

    let APIUrl = `/frontend/driverReport`;
    let data2 = { detailId, message };
    server.post(APIUrl, data2)
        .then((res) => {
            if (res != null && res.data != null && res.status == 200) {
                let jshdata = res.data;
                if (callback) callback(jshdata)
            }
        })
        .catch(function(error) {
            console.log("error", error);
        });
}

server.GetDriverReport = function(wObj, callback) {
    // 新增api -> 取得司機回報歷程功能 get
    // /jshERP-boot/depotHead/getDeliveryReport?headerId=62
    // headerId : 配送單id

    let headerId = !common.IsNullOrEmpty(wObj.headerId) ? wObj.headerId : '';

    let APIUrl = `/frontend/getDeliveryReport`;
    let APIParameter = `?headerId=${headerId}`;

    server.get(APIUrl + APIParameter)
        .then((res) => {
            if (res != null && res.data != null && res.status == 200) {
                let jshdata = res.data;
                if (callback) callback(jshdata.data)
            }
        }).catch(function(error) {
            console.log("error", error);

            return;
        });
}




server.UpdateDeliveryFile = function(wObj, callback) {
    // 缺少送出修改內容(要保存上傳的照片)

    // /api/frontend/delivery/file/update
    let headerId = !common.IsNullOrEmpty(wObj.headerId) ? wObj.headerId : '';
    let filePath = wObj.filePath

    let APIUrl = `/frontend/delivery/file/update`;
    // const formData = new FormData();
    // formData.append('headerId', headerId);
    // formData.append('filePath', filePath);
    let data2 = { headerId, filePath };

    server.put(APIUrl, data2)
        .then((res) => {
            if (res != null && res.data != null && res.data.code == 200) {
                let jshdata = res.data;
                if (callback) callback(jshdata)
            }
        }).catch(function(error) {
            console.log("error", error);
            return;
        });

}

server.UploadFile1 = function(wObj, callback) {

    let biz = !common.IsNullOrEmpty(wObj.headerId) ? wObj.headerId : '';
    let file = wObj.file

    let APIUrl = `/systemConfig/upload`;
    const formData = new FormData();
    formData.append('biz', biz);
    formData.append('file', file);
    server.post(APIUrl, formData)
        .then((res) => {
            if (res != null && res.data != null && res.data.code == 200) {
                let jshdata = res.data;
                if (callback) callback(jshdata.data)
            }
        }).catch(function(error) {
            console.log("error", error);
            return;
        });

}
export { server };