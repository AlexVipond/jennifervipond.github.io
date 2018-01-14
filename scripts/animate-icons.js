let icons = document.querySelectorAll('.animate');
let windowHeight, windowBottom, animateIconsBreakPoint, iconHeight, iconTop, iconMidpoint, thisDashArray;


function setDasharray(path) {
    path.style['stroke-dasharray'] = path.getTotalLength() * 1.5 + 'px';
}

function getDasharrayNumber(path) {
    return Number(window.getComputedStyle(path).getPropertyValue('stroke-dasharray').replace('px',''));
}

function setMaxDashoffset(path) {
    path.style['stroke-dashoffset'] = (getDasharrayNumber(path) * ((path.classList.contains('reverse')) ? -.99 : 1.01)) + 'px';
}

function setPathTransition(path) {
    path.style['-webkit-transition'] = 'all 2s ease';
    path.style['transition'] = 'all 2s ease';
}

function setMinDashOffset(path) {
    path.style['stroke-dashoffset'] = '0px';
}

function getDimensionsForAnimateIcons() {
    // scrollTop = window.pageYOffset; from transition-nav.js
    windowHeight = window.innerHeight;
    windowBottom = scrollTop + windowHeight;
}

function setAnimateIconsBreakPoint(multiplier) {
    animateIconsBreakPoint = scrollTop + windowHeight * multiplier;
}

function getIconDimensions(icon) {
    iconHeight = icon.getBoundingClientRect().height;
    iconTop = icon.getBoundingClientRect().top + scrollTop;
    iconMidpoint = iconTop + iconHeight / 2;
}

function eraseIcon(icon) {
    icon.querySelectorAll('path').forEach(function(path) {
        getDasharrayNumber(path);
        setMaxDashoffset(path);
    });
}

function drawIcon(icon) {
    icon.querySelectorAll('path').forEach(function(path) {
        setPathTransition(path);
        setMinDashOffset(path);
    });
}

function animateIcons(iconsNodeList) {
    icons.forEach(function(icon) {
        getIconDimensions(icon);

        if(iconMidpoint > animateIconsBreakPoint) {
            eraseIcon(icon);
        } else if(iconMidpoint <= animateIconsBreakPoint) {
            drawIcon(icon);
        }
    });
}

icons.forEach(function(icon) {
    icon.querySelectorAll('path').forEach(function(path) {
        setDasharray(path);
        setMaxDashoffset(path);
    });
});

window.addEventListener('scroll', function() {
    getDimensionsForAnimateIcons();
    setAnimateIconsBreakPoint(.65);
    animateIcons(icons);
});
