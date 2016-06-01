/***
 * 博主信息浮出层
 * 
 */
var base = {
	width: '320px', //浮出层层宽度
	//	min_width:'400px',
	height: '100%', //浮出层高度
	min_height: '300px',
	left: '-320px',
	top: '50px',
	head_height: '260px',
	head_title_content: '<a href="#"><span>关于高世超</span></a>', //浮出层的页头内容
	head_content: '<div class="surface-content-say">' +
		'<h1>执子之手，与子偕老</h1>' +
		'<p>于千万人之中，我遇见了我所遇见的人....</p>' +
		'</div>' +
		'<div class="surface-content-info">' +
		'<p><i class="iconfont">&#xe608;</i>网名: demonGao | 若水犹离</p>' +
		'<p><i class="iconfont">&#xe60a;</i>籍贯: 山东省-济南</p>' +
		'<p><i class="iconfont">&#xe606;</i>电话: 17853593651</p>' +
		'<p><i class="iconfont">&#xe607;</i>邮箱: 750229099@qq.com</p>' +
		'</div>' +
		'<div class="surface-content-shareBox">' +
		'<a href="#" title="分享到QQ空间"></a>' +
		'</div>',
	foot_content: '<p>这是浮出层的页脚</p>',
	showElementL: 'clickbtn', //浮出层显示按钮
	closebtn: false, //关闭按钮是否存在
	foot: false, //页脚是否存在
	ismove: false, //是否可移动
	isresize: false, //是否可以改变大小
};
var surfaced = Surfaced('surface', base);
surfaced.init();
/***
 * 模板
 * 
 */
var articlescrapData = [
	{
		src: 'img/articlescrap/61baby.jpg',
		title: '六·一快乐',
		text: ' 谁说我们不能过6.1儿童节,我们萌着呢!',
		type_href:'www.个人博客.com',
		type_href_title:'个人博客',
		time:'2016-06-01',
	}, 
	{
		src: 'img/articlescrap/IMG_6066.JPG',
		title: 'About Me',
		text: '高世超,男,一个90后程序员,从小学的时候,我就对计算机比较感兴趣,当时参加了学校组织的网页制作校本课程,那时候用的是dreamweaver,都是些托拉拽的操作,那时候还不知道js,只会从网站上赋值粘贴以下代码,然后鼠标后面有了小尾巴,页面上下起了雪花,各种特效...页面布局的时候,还是用table来规划布局,根本就不知道用div+css布局,直到2014年接触了前端,我才终于知道那是html css javascript!2014年接触前端,对前端也有了进一步的了解,学校里开了Web程序设计,老师讲了一些基础知识,如:html,css,javascript,也将我带入了前端世界。2015年,开始了我自学前端的路程...自学了HTML5 CSS3 javaScript设计模式,用bootstrap+jsp+...',
		type_href:'www.个人博客.com',
		type_href_title:'个人博客',
		time:'2016-05-29',
	}, 
	{
		src: 'img/articlescrap/01.jpg',
		title: '住在手机里的朋友',
		text: '通信时代，无论是初次相见还是老友重逢，交换联系方式，常常是彼此交换名片，然后郑重或是出于礼貌用手机记下对方的电话号码。在快节奏的生活里，我们不知不觉中就成为住在别人手机里的朋友。又因某些意外，变成了别人手机里匆忙的过客，这种快餐式的友谊 ...',
		type_href:'www.个人博客.com',
		type_href_title:'个人博客',
		time:'2016-05-28',
	}
];
ViewCommand({
	//参数说明 方法display
	command: 'display',
	//参数说明  parma1 : 元素容器,parma2 : 标题数据,parma3 : 元素模版
	param: ['content-bar', articlescrapData, 'articlescrap']
});

//获取天气数据 并绘制
ViewCommand({
	command:'getWeatherData',
	param:['烟台']
});
//天气切换
var SelectCity={
	tpl:{
		selectcn:[
			'<div class="selectcity">',
				'<input id="Icityname" type="text" placeholder="请输入城市"/>',
				'<button id="weathersearch">查询</button>',
			'</div>',
		].join(''),
	},
	Action:{
		create:function(container){
			container.innerHTML+=SelectCity.tpl.selectcn;
			var weathersearch=document.getElementById("weathersearch");
			addEvent(weathersearch,"click",function(){
				var cityname=document.getElementById("Icityname").value.toString();
				ViewCommand({
					command:'getWeatherData',
					param:[cityname]
				});
			})
		},
	}
};

//天气切换事件绑定 By委托模式
var _cityname=false;
addEvent(document.getElementById("weather"),'click',function(event){
	var event=getEvent(event);
	var target=getTarget(event);
	if(target.id==="cityname"){
		if(_cityname==false){
			SelectCity.Action["create"](target.parentNode.parentNode);
			_cityname=true;
		}
	}
});

//阅读全文事件绑定 by 委托模式
addEvent(document.getElementById("content-bar"),"click",function(event){
	var event=getEvent(event);
	var target=getTarget(event);
	if(target.id==="articleRead"){
		ViewCommand({
			command:'getArticleData',
			param:[target.getAttribute("articlescrap-title")]
		});
	}
});