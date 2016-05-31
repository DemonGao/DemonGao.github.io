var weather=(function(){
	//模板结构
	var tpl={
		//当天天气模板
		Nowday:[
			'<figure class="weather-nowday">',
				'<p class="title"><span>{#result__data__realtime__date#}</span><span>周{#result__data__weather__0__week#}</span><span >[<i id="cityname">切换</i>]</span><span>{#result__data__realtime__city_name#}</span></p>',
				'<figcaption class="weather-nowday-figcaption">',
					'<h2><span>{#result__data__realtime__weather__temperature#}°</span><span>[<p>{#result__data__realtime__time#}</p>更新]</span></h2>',
					'<p class="info"><img src="img/weatherIcon/{#result__data__realtime__weather__img#}.png"/> <span>{#result__data__realtime__weather__info#}{#result__data__weather__0__info__night__2#}/{#result__data__weather__0__info__day__2#}</span></p>',
					'<div class="state">',
						'<p>空气质量：{#result__data__pm25__pm25__quality#}</p>',
						'<p>湿度：{#result__data__realtime__weather__humidity#}%</p>',
						'<p>{#result__data__realtime__wind__direct#} {#result__data__realtime__wind__power#}</p>',
					'</div>',
				'</figcaption>',
			'</figure>',
		].join(''),
	},
		html='';
	function formateString(str,obj){
		//替换'{#'与'#}'之间的字符串
		return str.replace(/\{#(\w+)#\}/g,function(match,key){
			//创建一个变量,赋值为obj
			var newobj=obj;
			while(key.indexOf("__")>0){
				var index=key.indexOf("__");
				newobj=newobj[key.slice(0,index)];
				key=key.slice(index+2);
			}
			return newobj[key];
		})
	};
	//方法集合
	var Action={
		//创建方法
		create: function(data,view){
			//解析数据 如果数据是一个数组
			if(data.length){
				//遍历数组
				for(var i=0,len=data.length;i<len;i++){
					html+=formateString(tpl[view],data[i]);
				}
			}else{
				//直接格式化字符串缓存到html中
				html+=formateString(tpl[view],data);
			}
		},
		//展示方法
		display: function(container,data,view){
			//如果传入数组
			if(data){
				//根据给定的数据创建视图
				this.create(data,view);
			}
			//展示模块 若container中含有内容
			document.getElementById(container).innerHTML=html;
			//展示后清空缓存字符串
			html='';
		},
		getData:function(cityname){
			$.ajax({
				type:"GET",
				url:"http://op.juhe.cn/onebox/weather/query",
				dataType:'jsonp',
//				jsonp: 'jsoncallback',
				data:{
					cityname:cityname,
					dataType:'json',
					key:"69a45338e81d01fb2b9e3d322fdc9e99"
				},
				success:function(data){
					if(data.error_code==0){
						weather({
							command: 'display',
							param:['weather',data,'Nowday']
						});
						//天气预报重绘后,重新设置 切换城市为false
						_cityname=false;
						return ; 
					}else if(data.error_code==207301){
						alert("错误的查询城市名!");
						
					}else if(data.error_code==207302){
						alert("查询不到该城市的相关信息!");
					}else if(data.error_code==207303){
						alert("网络错误，请重试!");
					}
					Gsc.remove(document.getElementById("weather").getElementsByClassName("weather-nowday")[0].getElementsByClassName("title")[0],document.getElementsByClassName("selectcity")[0]);
					_cityname=false;
				}
			})
		}
	};
	return function init(msg){
		//解析命令  如果msg.param不是数组,则将其转换为数组 apply方法要求第二个参数必须为数组
		msg.param=Object.prototype.toString.call(msg.param)==="[object Array]"?msg.param:[msg.param];
		Action[msg.command].apply(Action,msg.param);
	};
})();
