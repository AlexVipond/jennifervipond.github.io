/* Open and close the menu when the icon is clicked */
let menu = document.querySelector(".menu-wrapper"), menuIcon = document.querySelector(".menu-icon");
menuIcon.onclick = function() {
    menuIcon.classList.toggle("open-menu");
    menu.classList.toggle("open-menu");
}
