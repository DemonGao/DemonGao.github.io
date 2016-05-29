jsonp({
        url: "http://op.juhe.cn/onebox/weather/query",              //请求地址
        type: "GET",                       //请求方式
        data: { cityname: "烟台",key:"69a45338e81d01fb2b9e3d322fdc9e99"},        //请求参数
        dataType: "json",
        success: function (response, xml) {
            // 此处放成功后执行的代码
            console.log("成功");
        },
        fail: function (status) {
            // 此处放失败后执行的代码
        }
        ,
        callback:function(json){
        }
    });

function jsonp(options) {
        options = options || {};
        if (!options.url || !options.callback) {
            throw new Error("参数不合法");
        }

        //创建 script 标签并加入到页面中
        var callbackName = ('jsonp_' + Math.random()).replace(".", "");
        var oHead = document.getElementsByTagName('head')[0];
        options.data[options.callback] = callbackName;
        var params = formatParams(options.data);
        var oS = document.createElement('script');
        oHead.appendChild(oS);

        //创建jsonp回调函数
        window[callbackName] = function (json) {
        	console.log("创建jsonp回调函数");
            oHead.removeChild(oS);
            clearTimeout(oS.timer);
            window[callbackName] = null;
            options.success && options.success(json);
        };

        //发送请求
        oS.src = options.url + '?' + params;

        //超时处理
        if (options.time) {
            oS.timer = setTimeout(function () {
                window[callbackName] = null;
                oHead.removeChild(oS);
                options.fail && options.fail({ message: "超时" });
            }, time);
        }
    };

    //格式化参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return arr.join('&');
    }