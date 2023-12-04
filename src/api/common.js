var apx = {};
module.exports = apx;

apx.replaceAll = function(str, find, replace) {
    if (str == null) return "";
    return (str + "").trim().replace(new RegExp(find, 'g'), replace);
};

apx.IsNullOrEmpty = function(str) {
    if (str == null) return true;
    if (String(str) == "null" || String(str) == "undefined") return true;
    if ((str + "").trim() == '') return true;
    return false;
};

apx.IsNumber = function(value) {
    if (apx.IsNullOrEmpty(value)) return false;
    return !isNaN(value);
};

apx.IsDate = function(value) {
    if (apx.IsNullOrEmpty(value)) return false;
    switch (typeof value) {
        case 'string':
            return !isNaN(Date.parse(value));
        case 'object':
            if (value instanceof Date) {
                return !isNaN(value.getTime());
            }
            break;
        default:
            return false;
    }
};
apx.IsTime = function(str) {
    if (apx.IsNullOrEmpty(str)) return false;
    let regexp = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;
    if (regexp.test(str)) {
        return true;
    } else {
        return false;
    }
}
apx.IsJson = function(str) {
    str = typeof str !== "string" ? JSON.stringify(str) : str;
    try {
        str = JSON.parse(str);
    } catch (e) {
        return false;
    }

    if (typeof str === "object" && str !== null) {
        return true;
    }

    return false;
}

apx.IsCharOrNumber = function(nubmer) {
    var re = /^[0-9a-zA-Z]*$/; //判断字符串是否为数字和字母组合     
    if (!re.test(nubmer)) {
        return false;
    } else {
        return true;
    }
};

apx.SumArray = function(arr) {

    if (arr == null) return 0;
    if (arr.length == 0) return 0;
    return arr.reduce((a, b) => parseFloat(a) + parseFloat(b));
};
apx.PadLeftZero = function(str, len) {
    str = "" + str;
    var pad = "0000000000000000000000000000000000000000000000000000000000".substring(0, len);
    var ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
};