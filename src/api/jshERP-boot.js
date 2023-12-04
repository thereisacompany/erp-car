var apx = {};
module.exports = apx;

apx.test = function(wObj) {
    console.log()
    return new Promise(function(resolve) {
        if (wObj.userid =="123"){
            resolve({code:0,data:"OK"});
            return;
        }
        resolve({code:999,data:"error"});
        return;
    });
};
