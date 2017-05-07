
Date.prototype.format = function(b) {
    var c = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds(),
        "w+": Date.getWeek(this.getDay())
    };
    if (/(y+)/.test(b)) {
        b = b.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var a in c) {
        if (new RegExp("(" + a + ")").test(b)) {
            b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[a] : ("00" + c[a]).substr(("" + c[a]).length))
        }
    }
    return b
}
Date.getWeek = function(a) {
    this.aWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return this.aWeek[a]
}
/**
 * storage操作
 * SetStorage方法：设置存储storage的key和value值，如果storage存储失败，则将数据存储在cookie中
 * GetStorage方法：根据key值获取storage相对应的value值，获取失败则从cookie中获取，
 */
var StorageHelp = {
    SetStorage: function (e, g) {
       console.log("set")
    }, 
    GetStorage: function (d) {
       console.log("get")
    },
    SetSessionStorage: function(e,g){
        if(window.localStorage){
            localStorage.setItem(e, g);
        }
    },
    GetSessionStorage: function(d){
        if(window.localStorage){
            return localStorage.getItem(d);
        }
    },
    ClearSessionStorage:function(arr){
       
    }
};
export default {"StorageHelp":StorageHelp}

