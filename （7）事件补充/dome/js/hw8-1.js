/**
 * Created by Jiajia on 11/16/16.
 */

// generic helpers
function $(id){
    return document.getElementById(id);
}
function getRect(elem){
    return elem.getBoundingClientRect();
}

// entry point
window.onload = function(){
    var text = $('text');
    var scroll = {};
    scroll.bar = $('scroll');
    scroll.btn = $('btn-scroll');
    scroll.up = $('btn-up');
    scroll.down = $('btn-down');
    scroll.wrapper = scroll.bar.parentNode;

    // init scroll.btn: the height and drag function
    adjustBtn(scroll.btn, text);

    // drag the scroll btn to scroll
    scroll.btn.onmousedown = function(e){
        var disY = e.clientY - scroll.btn.offsetTop;

        document.onmousemove = function(e){
            var t = e.clientY - disY;
            var scrollMax = scroll.bar.offsetHeight-scroll.btn.offsetHeight;

            t = t < 0 ? 0 : (t > scrollMax-3 ? scrollMax-3 : t);
            scroll.btn.style.top = t + 'px';

            var scale = scroll.btn.offsetTop/scrollMax;
            text.style.top = -scale * (text.scrollHeight - text.parentNode.offsetHeight) + 'px';
        };
        document.onmouseup = function(){
          document.onmousemove = null;
        };
    };

    // click on the scroll bar
    scroll.bar.onmousedown = function(e){
        if(scroll.bar.timer) clearTimeout(scroll.bar.timer);

        if (e.clientY < getRect(scroll.btn).top) {
            verticalMove(scroll.btn, 'up', scrollText);
            scroll.bar.timer = setInterval(function(){
                verticalMove(scroll    .btn, 'up', scrollText);
                if(e.clientY >= getRect(scroll.btn).top) clearTimeout(scroll.bar.timer);
            }, 100);
        }
        else if (e.clientY > getRect(scroll.btn).bottom) {
            verticalMove(scroll.btn, 'down', scrollText);
            scroll.bar.timer = setInterval(function(){
                verticalMove(scroll.btn, 'down', scrollText);
                if(e.clientY <= getRect(scroll.btn).bottom) clearTimeout(scroll.bar.timer);
            }, 100);
        }

        scroll.bar.onmouseup = function(){
            clearInterval(scroll.bar.timer);
        }
    };

    // click on scroll.up / scroll.down btn
    scroll.up.onmousedown = scroll.down.onmousedown = function(e){
        var direction = e.target == scroll.up ? 'up' : 'down';

        if(this.timer) clearTimeout(this.timer);

        verticalMove(scroll.btn, direction, scrollText);

        this.timer = setInterval(function(){
            verticalMove(scroll.btn, direction, scrollText);
        }, 100);

        this.onmouseup = function(){
            clearInterval(this.timer);
        };
    };

    // addwheel control to container
    addWheel(text.parentNode);
    

    // function to adjust the height of scroll.btn according to the height of text
    function adjustBtn(btn, accord){
        var heightScale = accord.parentNode.offsetHeight/accord.scrollHeight;
        btn.style.height = heightScale * btn.parentNode.offsetHeight + 'px';
    }


    // function to change the scroll position of the text, according to the position of scroll.btn
    function scrollText(instant){
        // clear timer to avoid animation accumulation
        if(text.timer) clearInterval(text.timer);

        var scale = scroll.btn.offsetTop/(scroll.bar.offsetHeight - scroll.btn.offsetHeight);
        var textTop = -scale * (text.scrollHeight - text.parentNode.offsetHeight);

        if(!instant){
            move(text, {top: textTop}, 100, 'linear');
        } else {
            text.style.top = textTop + 'px';
        }

    }

    // function to move an element vertically within its parentNode
    function verticalMove(elem, direction, callback){
        // clear timer to avoid animation accumulation
        if(elem.timer) clearInterval(elem.timer);

        var step = direction == 'up' ? -35 : (direction == 'down' ? 35 : direction);

        var parRect = getRect(elem.parentNode);
        var t = getRect(elem).top + step;

        t = t < parRect.top ? parRect.top : t;
        t = t > parRect.bottom-elem.offsetHeight-3 ? parRect.bottom-elem.offsetHeight-3 : t;

        if(direction == 'up' || direction == 'down'){
            // callback as move cb to ensure move to the right position;
            move(elem, {top:t - parRect.top}, 100, 'linear', callback);
        } else{
            // version for wheel
            elem.style.top = t - parRect.top + 'px';
        }
        // independent callback to allow fast response
        callback();
    }

    // wheel control function
    function addWheel(obj){
        // cross-browser compatibility
        obj.onmousewheel = fn;
        obj.addEventListener('DOMMouseScroll', fn);

        function fn(e){
        	console.log('e.weeldata=='+ e.wheelData)
        	console.log('e.weeldetail=='+e.wheelDelta)
        	console.log('e.detal =='+e.detail)
        	if(e.wheelDelta>0 || e.detail<0){
            	
                // scroll up
                // console.log(e.wheelDelta, e.detail);
                verticalMove(scroll.btn, -5, function(){scrollText(true)});
            } else if(e.wheelDelta<0 || e.detail>0){
                // scroll down
                // console.log(e.wheelDelta, e.detail);
                verticalMove(scroll.btn, 5, function(){scrollText(true)});
            }

            e.preventDefault();
            return false;
        }
    }

};