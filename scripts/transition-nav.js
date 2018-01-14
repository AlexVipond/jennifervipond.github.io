let nav = document.querySelector('nav'),
    header = document.querySelector('header'),
    scrollTop, navHeight, headerHeight, navOpacityBreakPoint;

function getDimensionsForTransitionNav() {
    scrollTop = window.pageYOffset;
    navHeight = nav.getBoundingClientRect().height;
    headerHeight = header.getBoundingClientRect().height;
}

function setNavOpacityBreakPoint(multiplier) {
    navOpacityBreakPoint = headerHeight * multiplier;
}

function closeMenu() {
    menu.classList.remove('open-menu');
    menuIcon.classList.remove('open-menu');
} // menu and menuIcon are declared by open-menu.js

function setNavPosition(positionStr) {
    nav.style.position = positionStr;
}

function setNavTop(top) {
    nav.style.top = top.toString() + 'px';
}

function setNavOpacity(opacity) {
    nav.style.opacity = opacity.toString();
}

function addFixedNavStyles() {
    nav.classList.add('fixed');
}

function removeFixedNavStyles() {
    nav.classList.remove('fixed');
}

function pinNavAboveHeader() {
    closeMenu();
    setNavPosition('absolute');
    setNavTop(0);
    setNavOpacity(1);
    removeFixedNavStyles();
}

function pinNavBelowHeader() {
    closeMenu();
    setNavPosition('absolute');
    setNavTop(headerHeight);
    setNavOpacity(0);
    removeFixedNavStyles();
}

function fadeNav() {
    closeMenu();
    setNavPosition('absolute');
    setNavTop(headerHeight);
    setNavOpacity((scrollTop - navOpacityBreakPoint) / (headerHeight - navOpacityBreakPoint));
    addFixedNavStyles();
}

function fixNavToTop() {
    setNavPosition('fixed');
    setNavTop(0);
    setNavOpacity(1);
    addFixedNavStyles();
}

function section1() {return scrollTop < navHeight}
function section2() {return scrollTop > navHeight && scrollTop < navOpacityBreakPoint}
function section3() {return scrollTop > navOpacityBreakPoint && scrollTop < headerHeight}
function section4() {return scrollTop >= headerHeight}

function transitionNav() {
    if(section1()) {
        pinNavAboveHeader();
    } else if(section2()) {
        pinNavBelowHeader();
    } else if(section3()) {
        fadeNav();
    } else if(section4()) {
        fixNavToTop();
    }
}

window.addEventListener('scroll', function() {
    getDimensionsForTransitionNav();
    setNavOpacityBreakPoint(.7);
    transitionNav();
});
