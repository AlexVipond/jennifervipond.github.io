let nav = document.querySelector('nav'),
    header = document.querySelector('header');

let scrollTop, navHeight, headerHeight, breakPoint;

window.addEventListener('scroll', function() {
    scrollTop = window.pageYOffset;
    navHeight = nav.offsetHeight;
    headerHeight = header.offsetHeight;
    breakPoint = headerHeight * .7;

    if(scrollTop > 0 && scrollTop < navHeight) {
        menu.classList.remove('open-menu'); // menu is declared by open-menu.js
        menuIcon.classList.remove('open-menu'); // menuIcon is declared by open-menu.js
    } else if(scrollTop < navHeight) {
        nav.style.position = 'absolute';
        nav.style.top = '0';
        nav.style.opacity = 1;
        nav.classList.remove('fixed');
    } else if(scrollTop > navHeight && scrollTop < breakPoint) {
        nav.style.position = 'absolute';
        nav.style.top = headerHeight.toString() + 'px';
        nav.style.opacity = '0';
        nav.classList.add('fixed');
        menu.classList.remove('open-menu');
        menuIcon.classList.remove('open-menu');
    } else if(scrollTop > breakPoint && scrollTop < headerHeight) {
        nav.style.position = 'absolute';
        nav.style.top = headerHeight.toString() + 'px';
        nav.style.opacity = ((scrollTop - breakPoint) / (headerHeight - breakPoint)).toString();
        nav.classList.add('fixed');
        menu.classList.remove('open-menu');
        menuIcon.classList.remove('open-menu');
    } else if(scrollTop >= headerHeight) {
        nav.style.position = "fixed";
        nav.style.top = '0';
        nav.style.opacity = '1';
        nav.classList.add('fixed');
    }
});
