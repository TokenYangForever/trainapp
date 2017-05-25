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

var commonJs = {
    StorageHelp:{
        SetLocalStorage: function(e,g){
            if(window.localStorage){
                localStorage.setItem(e, g);
            }else{//存储cookie
                this.setCookie(e,g)
            }
        },
        SetSessionStorage: function(e,g){
            if(window.sessionStorage){
                localStorage.setItem(e, g);
            }else{//存储cookie
                this.setCookie(e,g)
            }
        },
        GetLocalStorage: function(d){
            if(window.localStorage){
                return localStorage.getItem(d);
            }else{
                return getCookie(d)
            }
        },
        GetSessionStorage: function(d){
            if(window.sessionStorage){
                return localStorage.getItem(d);
            }else{
                return getCookie(d)
            }
        },
        ClearSessionStorage:function(arr){
            if(arr.length && window.sessionStorage){
                for(var i=0;i<arr.length;i++){
                    sessionStorage.removeItem(arr[i]);
                }
            }
        },
        ClearLocalStorage:function(arr){
            if(arr.length && window.localStorage){
                for(var i=0;i<arr.length;i++){
                    localStorage.removeItem(arr[i]);
                }
            }
        },
        setCookie: function(key,val,eday){
            let exdate = new Date();
                eday = eday || 30;
            exdate.setDate(exdate.getDate()+eday);
            document.cookie = key+ "=" + escape(val) + ";expires="+ exdate.toGMTString()
        },
        getCookie: function(key){
           let cookiearr = document.cookie.split("; ");
           for(let j in cookiearr){
                let cookieite = cookiearr[j].split('=');
                if(cookieite[0] == key)
                    return cookieite[1]
                
           }
        },
        clearCookie: function(key){
            this.setCookie(key,'',-1)
        }
    },
    getRequest: function(){
        var searchString = window.location.search.substring(1),
            params = searchString.split("&"),
            hash = {};
        if (searchString == "") return {};
        for (var i = 0; i < params.length; i++) {
            var pos = params[i].indexOf('=');
            if (pos == -1) { continue; }
            var paraName = params[i].substring(0, pos),
                paraValue = params[i].substring(pos + 1);
            hash[paraName] = paraValue;
        }
        return hash;
    },
    extend: function(to,_from) {
        for (var key in _from) {
          to[key] = _from[key];
        }
        return to
    }
}

export default {"commonJs":commonJs}

