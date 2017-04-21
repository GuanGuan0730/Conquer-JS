/**
 * Created by Jiajia on 11/10/16.
 */

window.onload = function(){
    var time = $('#time');
    var appBody = $('#appBody');
    var msgBoard = $('#msgBoard');
    var textBox = $('#textBox');
    var optionsBtn = $('#optionsBtn');
    var options = optionsBtn.querySelectorAll('li');
    // indicates the posting option selected: false - Enter; true - Ctrl + Enter
    options.status = 0;
    var avSwitcher = $('#avatarSwitcher');
    // indicates the active avatar: 0-j, 1-g
    avSwitcher.active = {i: 0, lookup:['j', 'g']};

    // display time in the iphone-head
    function displayTime(d){
        time.innerHTML = padZero(d.getHours()) + ':' + padZero(d.getMinutes());
    };
    displayTime(new Date());
    
    setInterval(function(){
        displayTime(new Date());
    }, 60000);

    // click on avatarSwitcher to switch avatar
    avSwitcher.onclick = function(){
        var nonActiveIndex = this.active.i == 0 ? 1 : 0;
        this.children[this.active.i].className = this.children[this.active.i].className.slice(0, -7);
        this.children[nonActiveIndex].className += ' active';
        // housing-keeping: change active.i; refocus textBox
        this.active.i = nonActiveIndex;
        textBox.focus();
    };

    // options button as the central control
    optionsBtn.onclick = function(e){
        // click on options btn to toggle options menu
        if(e.target.tagName == 'DIV'){
            // options -> active to show the menu
            if(this.className.indexOf('active') == -1){
                this.className += ' active';
            } else {
                this.className = this.className.slice(0, -7);
            }
        }
        // options menu controls the posting key: [0]-enter [1]-ctrl+enter
        if(e.target.tagName == 'LI'){
            if(e.target != options[options.status]){
                options[options.status].className = options[options.status].className.slice(0, -7);
                e.target.className += ' active';
            }
            options.status = e.target == options[0] ? 0 : 1;
            setTimeout(function(){
                optionsBtn.className = optionsBtn.className.slice(0, -7);
            }, 600);
        }
    };

    // posting msg to app-body
    function postMsg(par, msg, avIndex){
        var newMsg = '<li class="msg-' + avIndex + '">'
                        + '<div class="avatar avatar-' + avIndex + '">' + avIndex.toUpperCase() + '</div>'
                        + '<div class="msg">' + msg + '</div>'
                    +'</li>';
        par.innerHTML += newMsg;
    }
    textBox.onkeydown = function(e){
        if(this.value != '' && e.keyCode == 13){
            // if requires ctrlKey but ctrlKey is false
            if(options.status && !e.ctrlKey) return;
            // post new msg using the postMsg function
            postMsg(msgBoard, this.value, avSwitcher.active.lookup[avSwitcher.active.i]);
            this.value = '';
            // control the scrol position of app-body
            appBody.scrollTop = appBody.scrollHeight - appBody.offsetHeight;
        }
    }

    // // control the scrol position of msgBoard
    // 	   msgBoard.parentNode.onscroll = function(){
    //     msgBoard.parentNode.scrollTop =
    //     console.log("srollHeight", this.scrollHeight);
    //     console.log('scrollTop', this.scrollTop);
    //     console.log('offsetHeight', this.offsetHeight);
    // }
};

// dom helper
function $(selector, ifArr){
    if(ifArr) return document.querySelectorAll(selector);
    return document.querySelector(selector);
};
// helpers function
function padZero(num){
    if(typeof num == 'number' && num<10) num = '0' + num;
    return num + '';
}

var go = document.getElementById('go')
	var user = document.getElementById('user')
	go.onclick = function() {
		window.history.go(-1)
	}

	user.onclick = function() {
		window.location.href = '../../user/index.html'
	}
