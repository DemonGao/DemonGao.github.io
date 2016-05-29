//模块实现模块
var ViewCommand = (function(){
	var templet={
		//展示图片结构模板
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
						'<a class="lookall" href="{#href#}">',
							'<span>阅读全文</span>',
						'</a>',
					'</p>',
				'</div>',
				'<div class="datetime"><i class="iconfont">&#xe60b;</i>{#time#}</div>',
			'</div>'
		].join(''),
	},
		html='';
	function formateString(str,obj){
		//替换'{#'与'#}'之间的字符串
		return str.replace(/\{#(\w+)#\}/g,function(match,key){
			return obj[key];
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
			document.getElementById(container).innerHTML+=html;
			//展示后清空缓存字符串
			html='';
		}
	};
	//命令接口
	return function excute(msg){
		//解析命令  如果msg.param不是数组,则将其转换为数组 apply方法要求第二个参数必须为数组
		msg.param=Object.prototype.toString.call(msg.param)==="[object Array]"?msg.param:[msg.param];
		Action[msg.command].apply(Action,msg.param);
	};
})();
