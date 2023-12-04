var apx = {};
module.exports = apx;
apx.GetSupplierList = function(callback) {
    let APIUrl = `/supplier/list`;
    let APIParameter = `?currentPage=1&pageSize=3000`;
    let queryStr = `{"type":"客戶"}`;
    APIParameter += `&search=${encodeURIComponent(queryStr)}`;
    server.get(APIUrl + APIParameter)
        .then((res) => {
            if (res != null && res.data != null && res.data.code == 200 && res.data.data != null) {
                //回傳資料成功
                let jshdata = res.data.data;
                if (callback) callback(jshdata.rows)
            }
        }).catch(function(error) {
            console.log(error)
            return;
        });


}