"use strict";
//Код определяет на каком устройстве открыт сайт
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iOS/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());  
    }
};
//=========================================================================================================================================================================
// Класс для перевода url картинки в backgraund родителя 
function ibg(){

	let ibg=document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();
//========================================================================================================================================================
const burgerForm = document.querySelector('.burger__form');
const burger = document.querySelector('.burger');
const headerMenu = document.querySelector('.header__menu');
if (burger){
    burger.addEventListener("click", function(e) {
        burgerForm.classList.toggle('_active');
        burger.classList.toggle('_active');
        headerMenu.classList.toggle('_active');
    });
}
//================================================================================================================================================================
var lastY = 0; // Needed in order to determine direction of scroll.
$(".scroll-container").on('touchstart', function(event) {
    lastY = event.touches[0].clientY;
});

$('.scroller').on('touchmove', function(event) {
    var top = event.touches[0].clientY;

    // Determine scroll position and direction.
    var scrollTop = $(event.currentTarget).scrollTop();
    var direction = (lastY - top) < 0 ? "up" : "down";

    // FIX IT!
    if (scrollTop == 0 && direction == "up") {
      // Prevent scrolling up when already at top as this introduces a freeze.
      event.preventDefault();
    } else if (scrollTop >= (event.currentTarget.scrollHeight - event.currentTarget.outerHeight()) && direction == "down") {
      // Prevent scrolling down when already at bottom as this also introduces a freeze.
      event.preventDefault();
    }

    lastY = top;
});
