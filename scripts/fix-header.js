let page = document.querySelector('html'),
    nav = document.querySelector('nav'),
    header = document.querySelector('header'),
    main = document.querySelector('main'),
    mainPadding = Number(getComputedStyle(main).getPropertyValue('padding-top').replace(/px/,''));

let scrollTop, navHeight, headerHeight, breakPoint;

window.addEventListener('scroll', function() {
    scrollTop = page.scrollTop;
    navHeight = nav.offsetHeight;
    headerHeight = header.offsetHeight;
    breakPoint = headerHeight * .7;

    if(scrollTop < navHeight) {
        nav.style.position = 'relative';
        nav.style.top = '0';
        nav.style.opacity = 1;
        nav.classList.remove('fixed');
    } else if(scrollTop > navHeight && scrollTop < breakPoint) {
        nav.style.position = 'relative';
        nav.style.top = headerHeight.toString() + 'px';
        nav.style.opacity = '0';
        nav.classList.add('fixed');
    } else if(scrollTop > breakPoint && scrollTop < headerHeight) {
        nav.style.position = 'relative';
        nav.style.top = headerHeight.toString() + 'px';
        nav.style.opacity = ((scrollTop - breakPoint) / (headerHeight - breakPoint)).toString();
        nav.classList.add('fixed');
    } else if(scrollTop >= headerHeight) {
        nav.style.position = "fixed";
        nav.style.top = '0';
        nav.style.opacity = '1';
        nav.classList.add('fixed');
    }
});
