/**
 * Created by Jiajia on 11/10/16.
 */
window.onload = function() {
	var icon = document.getElementById('icon');
	var control = { up: false, right: false, down: false, left: false };
	var step = 10;
	var l, t;
	var w = icon.offsetWidth;
	var h = icon.offsetHeight;

	icon.style.left = (window.innerWidth - w) / 2 + 'px';

	l = icon.offsetLeft;
	t = icon.offsetTop;

	document.onkeydown = function(e) {
		switch(e.keyCode) {
			case 38:
				control.up = true;
				break;
			case 39:
				control.right = true;
				break;
			case 40:
				control.down = true;
				break;
			case 37:
				control.left = true;
				break;
		}
	};

	document.onkeyup = function(e) {
		switch(e.keyCode) {
			case 38:
				control.up = false;
				break;
			case 39:
				control.right = false;
				break;
			case 40:
				control.down = false;
				break;
			case 37:
				control.left = false;
				break;
		}
	};

	setInterval(function() {
		// left the control panel control the moving directions
		if(control.up) t = icon.offsetTop - step;
		if(control.right) l = icon.offsetLeft + step;
		if(control.down) t = icon.offsetTop + step;
		if(control.left) l = icon.offsetLeft - step;
		// restrict t & l inside the screen
		t = t < 0 ? 0 : t > window.innerHeight - h ? window.innerHeight - h : t;
		l = l < 0 ? 0 : l > window.innerWidth - w ? window.innerWidth - w : l;
		// set the icon top & left parameters
		icon.style.top = t + 'px';
		icon.style.left = l + 'px';
	}, 30);
	var go = document.getElementById('go')
	var user = document.getElementById('user')
	go.onclick = function() {
		window.history.go(-1)
	}

	user.onclick = function() {
		window.location.href = '../../user/index.html'
	}
};