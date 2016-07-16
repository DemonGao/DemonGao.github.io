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