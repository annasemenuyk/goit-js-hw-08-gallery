"use strict";

var _app = _interopRequireDefault(require("../images/app.js"));

var _refs = _interopRequireDefault(require("./js/refs.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//console.log(refs);
var list = _refs["default"].list,
    modal = _refs["default"].modal,
    button = _refs["default"].button,
    modalClose = _refs["default"].modalClose,
    modalImage = _refs["default"].modalImage,
    modalOverlay = _refs["default"].modalOverlay; //console.log(list, modal, button);
// Создание и рендер разметки по массиву данных и предоставленному шаблону.

var item = " <li class=\"gallery__item\">\n        <a\n          class=\"gallery__link\"\n          href=\"https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg\"\n        >\n          <img\n            class=\"gallery__image\"\n            src=\"https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg\"\n            data-source=\"https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg\"\n            alt=\"Tulips\"\n          />\n        </a>\n      </li> ";

function createItems(arrey) {
  return arrey.map(function (el) {
    var preview = el.preview,
        original = el.original,
        description = el.description; //console.log (preview, original, description)

    return "\n        <li class=\"gallery__item\">\n          <a\n        class=\"gallery__link\"\n        href=".concat(original, "\n      >\n          <img\n                class=\"gallery__image\"\n                src=").concat(preview, "\n                data-source=").concat(original, "\n                alt=").concat(description, "\n          />\n          </a>\n        </li> ");
  }).join('');
}

var markup = createItems(_app["default"]); //console.log (markup)

list.insertAdjacentHTML("afterbegin", markup);
/* const options = {
    root: list,
    rootMargin:'0px',
    threshold: 0.5,
}
const observer = new IntersectionObserver (callback, options)
function callback (entries) {
    //console.log(entries)
    entries.forEach((entry)=>{
      console.log(entry)
      entry.isIntersecting?
       entry.target.classList.add('is-open')
      :entry.target.classList.remove('is-open')
    })
} */

var items = _toConsumableArray(list.children);
/* items.forEach((item)=>observer.observe(item)) */
// Відкриття модального вікна Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна, 
//пока грузится изображение, мы не видели предыдущее.


list.addEventListener('click', onOpenModal);

function onOpenModal(event) {
  event.preventDefault(); // відміна переходу по ссилці

  modal.classList.add('is-open'); //присвоєння класу відкриття модалки

  modalImage.src = event.target.dataset.source; //заміна значення картинки

  modalImage.alt = event.target.alt;
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowLeftPress);
  window.addEventListener('keydown', onArrowRightPress);
} //Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].


modal.addEventListener('click', onModalCloseClick);

function onModalCloseClick(event) {
  modal.classList.remove('is-open'); //закриття модального вікна

  modalImage.src = ''; // очищення значення картинки

  modalImage.alt = '';
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowLeftPress);
  window.removeEventListener('keydown', onArrowRightPress);
} //Закрытие модального окна по клику на div.lightbox__overlay.


modalOverlay.addEventListener('click', onOverlay);

function onOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    onModalCloseClick();
  }
} //Закрытие модального окна по нажатию клавиши ESC


function onEscKeyPress(evt) {
  var ESC_KEY_CODE = 'Escape';
  var pressEscKey = evt.code === ESC_KEY_CODE;

  if (pressEscKey) {
    onModalCloseClick();
  }
} //Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
// вліво


function onArrowLeftPress(evt) {
  var ARR_LEFT_KEY_CODE = 'ArrowLeft';
  var pressArrowLeft = evt.code === ARR_LEFT_KEY_CODE;

  if (pressArrowLeft) {
    var sources = _app["default"].map(function (_ref) {
      var original = _ref.original;
      return original;
    });

    var indexOfCurrentImg = sources.indexOf(modalImage.src);

    if (indexOfCurrentImg === 0) {
      indexOfCurrentImg = sources.length;
    }

    modalImage.src = sources[indexOfCurrentImg - 1];
    console.log(indexOfCurrentImg);
  }
} //вправо


function onArrowRightPress(evt) {
  var ARR_RIGHT_KEY_CODE = 'ArrowRight';
  var pressArrowRight = evt.code === ARR_RIGHT_KEY_CODE;

  if (pressArrowRight) {
    var sources = _app["default"].map(function (_ref2) {
      var original = _ref2.original;
      return original;
    });

    var indexOfCurrentImg = sources.indexOf(modalImage.src);

    if (indexOfCurrentImg + 1 > sources.length - 1) {
      indexOfCurrentImg = -1;
    }

    modalImage.src = sources[indexOfCurrentImg + 1];
    console.log(indexOfCurrentImg + 1);
  }
}