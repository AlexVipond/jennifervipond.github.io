let menu = document.querySelector(".menu-wrapper"), menuIcon = document.querySelector(".menu-icon");

menuIcon.onclick = function() {
    menuIcon.classList.toggle("open-menu");
    menu.classList.toggle("open-menu");
}
