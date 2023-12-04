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
    localStorage.removeItem("user_authList")
    return Promise.reject(error);
});




server.GetSupplierList = function(callback) {
    let APIUrl = `/supplier/list`;
    let APIParameter = `?currentPage=1&pageSize=1000`;
    let queryStr = `{"type":"客戶"}`;
    APIParameter += `&search=${encodeURIComponent(queryStr)}`;
    server.get(APIUrl + APIParameter)
        .then((res) => {
            if (res != null && res.data != null && res.data.code == 200 && res.data.data != null) {
                //回傳資料成功
                let jshdata = JSON.parse(JSON.stringify(res.data.data));
                for (let i = 0; i < jshdata.rows.length; i++) {
                    jshdata.rows[i].idname = common.PadLeftZero(jshdata.rows[i].id, 3) + ' ' + jshdata.rows[i].supplier;
                }
                if (callback) callback(jshdata.rows)
                return;
            }
            if (callback) callback(null)
        }).catch(function(error) {
            console.log(error)
            if (callback) callback(null)
            return;
        });


}


server.GetMaterialListByRow = function(wObj, callback) {
    ////material/findBySelect?q=111&categoryId=26&depotId=19&column=createTime&order=desc&mpList=%E5%88%B6%E9%80%A0%E5%95%86,%E8%87%AA%E5%AE%9A%E4%B9%891,%E8%87%AA%E5%AE%9A%E4%B9%892,%E8%87%AA%E5%AE%9A%E4%B9%893&page=1&rows=10

    let APIUrl = `/material/findBySelect`;
    let Params = `?q=${encodeURIComponent(wObj.queryName || '')}`;
    Params += `&categoryId=`;
    Params += `&depotId=${encodeURIComponent(wObj.depotId || '')}`;
    Params += `&organId=${encodeURIComponent(wObj.organId || '')}`;
    Params += `&number=${encodeURIComponent(wObj.number || '')}`;

    Params += `&page=1`;
    Params += `&rows=100`;
    Params += `&mpList=`;

    APIUrl += Params;

    server.get(APIUrl)
        .then((res) => {
            //console.log("GetMaterialList", res)
            if (res != null && res.data != null && res.status == 200) {
                let jshdata = res.data;
                if (callback) callback(jshdata.rows)
                return;
            }
            if (callback) callback(null)
        }).catch(function(error) {
            console.log("error", error);
            if (callback) callback(null)
        });
}

export { server };