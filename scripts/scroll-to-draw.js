let icons = document.querySelectorAll('svg');

console.log(icons);

icons.forEach(icon => {
    icon.querySelectorAll('path').forEach(path => {
        path.style['stroke-dasharray'] = path.getTotalLength() + 'px';
    });
});

let windowHeight, windowBottom, stopDrawPoint, iconHeight, iconTop, iconMidpoint, thisDashArray, fractionRemaining;

window.addEventListener('scroll', function() {
    // scrollTop = window.pageYOffset; per nav-transition.js
    windowHeight = window.innerHeight;
    windowBottom = scrollTop + windowHeight;
    stopDrawPoint = scrollTop + windowHeight * .65;

    icons.forEach(icon => {
        iconHeight = icon.getBoundingClientRect().height;
        iconTop = icon.getBoundingClientRect().top + scrollTop;
        iconMidpoint = iconTop + iconHeight / 2;

        if(windowBottom < iconTop) {
            icon.querySelectorAll('path').forEach(path => {
                thisDashArray = Number(window.getComputedStyle(path).getPropertyValue('stroke-dasharray').replace('px',''));
                path.style['stroke-dashoffset'] = (thisDashArray * ((path.classList.contains('reverse')) ? -1 : 1)) + 'px';
            });
        } else if(windowBottom > iconTop && stopDrawPoint < iconMidpoint){
            fractionRemaining = (iconMidpoint - stopDrawPoint) / ((1 - (stopDrawPoint - scrollTop) / windowHeight) * windowHeight);
            icon.querySelectorAll('path').forEach(path => {
                path.style['stroke-dashoffset'] = (Number(window.getComputedStyle(path).getPropertyValue('stroke-dasharray').replace('px','')) * (path.classList.contains('reverse')) ? -1 : 1) * fractionRemaining + 'px';
            });
        } else {
            icon.querySelectorAll('path').forEach(path => {
                path.style['stroke-dashoffset'] = '0px';
            });
        }
    });
});
