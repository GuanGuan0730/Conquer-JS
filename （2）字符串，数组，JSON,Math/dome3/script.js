var $ = function(id) {
	return document.getElementById(id);
}
// 创建空数组存放右边文本区域
// 声明 两个空对象，用于存放字符串数组，和 数组长度
// 点击按钮时调用函数执行定时器，当 执行次数大于 数组长度 清除定时器，
// 写在函数内的变量 作用范围仅可以在 本函数内使用

var spans = document.getElementById('paomadeng').children;
var isStop = true;
var beforeArray = null;
var arrayLength = null;
var afterArray = [];
var btn = $('btn');

btn.addEventListener('click', function() {
	beforeArray = $('leftText').innerText.split('');
	arrayLength = beforeArray.length;

	if(isStop) {
		start(1);
		$('paomadeng').className = 'block';
		$('zonggong').innerText = arrayLength;
		btn.innerText = '暂停';
		isStop = false;
	} else {
		clearInterval(textVary);
		isStop = true;
		btn.innerText = '开始';
	}

})

function start(i) {

	textVary = setInterval(function() {

		for(var b = 0; b < spans.length; b++) {
			spans[b].style.opacity = Math.random();
		};
		i++;

		if(arrayLength + 1 >= i) {

			afterArray.push(beforeArray.shift());
			$('zhuanyi').innerText = i - 1;
			$('leftText').innerText = beforeArray.join('');
			$('rightText').innerText = afterArray.join('');
		} else {
			clearInterval(textVary)
			btn.innerText = '完成';
			$('paomadeng').className = 'none';
		}

	}, 120)

}
var go = document.getElementById('go')
var user = document.getElementById('user')
go.onclick = function() {
	window.history.go(-1)
}

user.onclick = function() {
	window.location.href = '../../user/index.html'
}