let icons = document.querySelectorAll('.draw');
let windowHeight, windowBottom, drawPoint, iconHeight, iconTop, iconMidpoint, thisDashArray;

icons.forEach(icon => {
    icon.querySelectorAll('path').forEach(path => {
        path.style['stroke-dasharray'] = path.getTotalLength() * 1.5 + 'px';
        thisDashArray = Number(window.getComputedStyle(path).getPropertyValue('stroke-dasharray').replace('px',''));
        path.style['stroke-dashoffset'] = (thisDashArray * ((path.classList.contains('reverse')) ? -.99 : 1.01)) + 'px';
    });
});

window.addEventListener('scroll', function() {
    // scrollTop = window.pageYOffset; from transition-nav.js
    windowHeight = window.innerHeight;
    windowBottom = scrollTop + windowHeight;
    drawPoint = scrollTop + windowHeight * .65;

    icons.forEach(icon => {
        iconHeight = icon.getBoundingClientRect().height;
        iconTop = icon.getBoundingClientRect().top + scrollTop;
        iconMidpoint = iconTop + iconHeight / 2;

        if(iconMidpoint > drawPoint) {
            icon.querySelectorAll('path').forEach(path => {
                // path.style.transition = 'all 0s ease';
                thisDashArray = Number(window.getComputedStyle(path).getPropertyValue('stroke-dasharray').replace('px',''));
                path.style['stroke-dashoffset'] = (thisDashArray * ((path.classList.contains('reverse')) ? -.99 : 1.01)) + 'px';
            });
        } else if(iconMidpoint <= drawPoint) {
            icon.querySelectorAll('path').forEach(path => {
                path.style.transition = 'all 2s ease';
                path.style['stroke-dashoffset'] = '0px';
            });
        }
    });
});
