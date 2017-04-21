var lis = document.querySelectorAll('li');
var $ = function(id) {
	return document.getElementById(id)
};
var bb = 1;

$('zhankai').onclick = function() {
	if(bb) {
		$('ssk').style.display = 'block';
		$('zhankai').innerText = '-';
		bb = 0;
	} else {
		$('ssk').style.display = 'none';
		$('zhankai').innerText = '+';
		bb = 1;

	}
}

lis[0].onmouseover = function() {
	lis[0].className = 'hover';
	lis[1].className = '0';
	$('chazhao').style.display = 'block';
	$('tihuan').style.display = 'none';
}
lis[1].onmouseover = function() {
	lis[1].className = 'hover';
	lis[0].className = '';
	$('chazhao').style.display = 'none';
	$('tihuan').style.display = 'block';
}

// 查找
$('sousuo').onclick = function() {
	var texts = $('text').innerHTML.split(' ');
	var gjz = $('chazhao').firstElementChild.value.trim();
	var result = texts.map(function(item, index, texts) {
		var item = item.replace(gjz, '<mark>' + gjz + '</mark>');
		return item;
	})
	$('text').innerHTML = result.join(' ');
}

//	替换
$('tbtn').onclick = function() {
	var texts = $('text').innerHTML.split(' ');
	var gjz = $('tihuan').children[0].value.trim();
	var tihuan = $('tihuan').children[1].value.trim();
	var result = texts.map(function(item, index, texts) {
		var item = item.replace(gjz, '<mark>' + tihuan + '</mark>');
		return item;
	})
	$('text').innerHTML = result.join(' ');
}
var go = document.getElementById('go')
var user = document.getElementById('user')
go.onclick = function() {
	window.history.go(-1)
}

user.onclick = function() {
	window.location.href = '../../user/index.html'
}