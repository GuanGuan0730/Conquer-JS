window.onload = function(){
    initBox(document.getElementById('div'), {width: 200, height: 120});

    function initBox(elem, min){
        var posControl = {top: ['n', false, 'clientY'], bottom: ['s', false, 'clientY'], right: ['e', false , 'clientX'], left: ['w', false, 'clientX']};
        elem.onmousemove = function(e){
            var dirLookup = {n: 'ns', s: 'ns', e: 'ew', w: 'ew', ne: 'nesw', sw: 'nesw', nw:'nwse', se:'nwse'};
            var direction = '', position = elem.getBoundingClientRect()
            for(var key in posControl){
                posControl[key][1] = Math.abs(e[posControl[key][2]] - position[key]) < 7 ? true : false;
                if(posControl[key][1]) direction += posControl[key][0];
            }
            elem.style.cursor = direction ? dirLookup[direction] + '-resize' : 'auto';
        };
        elem.onmousedown = function(e){
            var pos = {X: e.clientX, Y: e.clientY};
            var whOffset = {height: elem.offsetHeight, width: elem.offsetWidth};
            var rect = elem.getBoundingClientRect();
            var dirCtrl = {top: {active: false, dir: 'Y', i: -1, wh: 'height', adjust: rect.top}, bottom: {active: false, dir: 'Y', i: 1, wh: 'height'},
                           left: {active: false, dir: 'X', i: -1, wh: 'width', adjust: rect.left}, right: {active: false, dir: 'X', i: 1, wh: 'width'}};

            for(var key in dirCtrl){ dirCtrl[key]['active'] = posControl[key][1]; }

            document.addEventListener('mousemove', resizeCtrl, false);
            document.addEventListener('mouseup', function(){ document.removeEventListener('mousemove', resizeCtrl, false); }, false);
            function resizeCtrl(e){
                for(var key in dirCtrl){
                    if(dirCtrl[key].active){
                        var $ = dirCtrl[key];
                        var change = (e['client' + $.dir] - pos[$.dir]) * $.i;
                        var newDim = change + whOffset[$.wh] < min[$.wh] ? min[$.wh] : change + whOffset[$.wh];
                        if($.i == -1) elem.style[key] = $.adjust + whOffset[$.wh] - newDim + 'px';
                        elem.style[$.wh] = newDim + 'px';
                    }
                }
            }
        };
    }
};

/*
1. 左边和上边定位的计算：

var right = window.innerWidth - elem.getBoundingClientRect().left - w;
elem.style.left = window.innerWidth - right - newWidth + 'px';


2. resizeCtrl的for in原理：

var wchange, hchange, newWidth, newHeight;
if(activeDir.right || activeDir.left){
    wchange = activeDir.right ? e.clientX - posX : -(e.clientX - posX);
    newWidth = wchange + w < minWidth ? minWidth : wchange + w;
    if(activeDir.left) elem.style.left = window.innerWidth - right - newWidth + 'px';
    elem.style.width = newWidth + 'px';
}
if(activeDir.top || activeDir.bottom){
    hchange = activeDir.bottom ? e.clientY - posY : -(e.clientY - posY);
    newHeight = hchange + h <= minHeight ? minHeight : hchange + h;
    if(activeDir.top)
        elem.style.top = window.innerHeight - bottom - newHeight + 'px';
    elem.style.height = newHeight + 'px';
}
*/