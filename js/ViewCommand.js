//模块实现模块
var ViewCommand = (function(){
	var templet={
		//博文
		articlescrap:[
			'<div class="articlescrap">',
				'<figure>',
					'<img src="{#src#}" alt="图片无法显示!"/>', 
				'</figure>',
				'<div>',
					'<h3 class="articlescrap-title"><a href="{#href#}">{#title#}</a></h3>',
					'<p class="articlescrap-text">{#text#}</p>',
					'<p class="articlescrap-data">',
						'<span class="type"><i class="iconfont">&#xe60c;</i><a href="{#type_href#}">{#type_href_title#}</a></span>',
						'<span class="time"><i class="iconfont">&#xe60b;</i>{#time#}</span>',
//						'<a class="lookall" id="articleRead">',
//							'<span>阅读全文</span>',
//						'</a>',
						'<span class="lookall" id="articleRead" articlescrap-title="{#title#}">阅读全文</span>',
					'</p>',
				'</div>',
				'<div class="datetime"><i class="iconfont">&#xe60b;</i>{#time#}</div>',
			'</div>'
		].join(''),
		//详细博文内容模板
		article:[
			'<div class="article">',
				'<h1 class="a_nav">',
					'<span>像“草根”一样，紧贴着地面，低调的存在，冬去春来，枯荣无恙。</span>',
					'<a href="index.html">网站首页</a>',
					'<a href="#">{#result__type#}</a>',
				'</h1>',
				'<div class="a_content">',
					'<h2 class="a_c_title">{#result__data__titlename#}</h2>',
					'<div class="a_c_infos">',
						'<p>{#result__data__content#}</p>',
					'</div>',
				'</div>',
			'</div>'
		].join(''),
		//天气预报模板
		weatherNowday:[
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
//		return str.replace(/\{#(\w+)#\}/g,function(match,key){
//			return obj[key];
//		})
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
	}
	//方法集合
	var Action = {
		//创建方法
		create: function(data,view){
			//解析数据 如果数据是一个数组
			if(data.length){
				//遍历数组
				for(var i=0,len=data.length;i<len;i++){
					html+=formateString(templet[view],data[i]);
				}
			}else{
				//直接格式化字符串缓存到html中
				html+=formateString(templet[view],data);
			}
		},
		//展示方法
		display: function(container,data,view){
			//如果传入数组
			if(data){
				//根据给定的数据创建视图
				this.create(data,view);
			}
			//展示模块 若container中含有内容,***
			document.getElementById(container).innerHTML=html;
			//展示后清空缓存字符串
			html='';
		},
		//获取天气预报数据并绘制出来
		getWeatherData:function(cityname){
			$.ajax({
				type:"GET",
				url:"http://op.juhe.cn/onebox/weather/query",
				dataType:'jsonp',
//				jsonp: 'jsoncallback',
				data:{
					cityname:cityname,
					dataType:'jsonp',
					key:"69a45338e81d01fb2b9e3d322fdc9e99"
				},
				success:function(data){
					if(data.error_code==0){
						//绘制天气盒子
						ViewCommand({
							command: 'display',
							param:['weather',data,'weatherNowday']
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
		},
		//获取所选博文的数据
		getArticleData:function(url){
			$.ajax({
				type:"get",
				url:"json/"+url+".json",
				dataType:'json',
				success:function(data){
					if(data.error_code==0){
						ViewCommand({
							command: 'display',
							param:['content-bar',data,'article']
						});
					}
				}
			});
		}
	};
	//命令接口
	return function excute(msg){
		//解析命令  如果msg.param不是数组,则将其转换为数组 apply方法要求第二个参数必须为数组
		msg.param=Object.prototype.toString.call(msg.param)==="[object Array]"?msg.param:[msg.param];
		Action[msg.command].apply(Action,msg.param);
	};
})();
