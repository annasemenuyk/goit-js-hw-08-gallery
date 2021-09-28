export default {
list: document.querySelector('.js-gallery'), //загальна галерея
modal: document.querySelector('.js-lightbox'), //модальне вікно
button: document.querySelector('.lightbox__button'), //кнопка закриття модального вікна
modalClose: document.querySelector('[data-action="close-lightbox"]'),//кнопка закриття модального вікна ч/з дата атрибут
modalImage: document.querySelector('.lightbox__image'), //картинка без атрибуту src
modalOverlay: document.querySelector('.lightbox__overlay') //фон в модалці
}