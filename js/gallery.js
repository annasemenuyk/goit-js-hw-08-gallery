import galleryItems from '../images/app.js'
//console.log(galleryItems);
import refs from './js/refs.js'
//console.log(refs);
const {list, modal, button, modalClose, modalImage, modalOverlay} =refs;
//console.log(list, modal, button);
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const item =
    ` <li class="gallery__item">
        <a
          class="gallery__link"
          href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
        >
          <img
            class="gallery__image"
            src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
            data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
            alt="Tulips"
          />
        </a>
      </li> `
function createItems (arrey) {
    return arrey
    .map((el)=>{
        const {preview, original, description} = el
        //console.log (preview, original, description)
            return `
        <li class="gallery__item">
          <a
        class="gallery__link"
        href=${original}
      >
          <img
                class="gallery__image"
                src=${preview}
                data-source=${original}
                alt=${description}
          />
          </a>
        </li> `
    })
    .join('')
   }
const markup = createItems (galleryItems)
//console.log (markup)
list.insertAdjacentHTML("afterbegin", markup)

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
const items = [...list.children]
/* items.forEach((item)=>observer.observe(item)) */
// Відкриття модального вікна Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна, 
//пока грузится изображение, мы не видели предыдущее.
list.addEventListener('click', onOpenModal)
function onOpenModal(event) {
event.preventDefault();// відміна переходу по ссилці
  modal.classList.add('is-open') //присвоєння класу відкриття модалки
  modalImage.src = event.target.dataset.source //заміна значення картинки
  modalImage.alt = event.target.alt
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowLeftPress);
  window.addEventListener('keydown', onArrowRightPress);
} 
//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
modal.addEventListener('click', onModalCloseClick) 
function onModalCloseClick (event){      
  modal.classList.remove('is-open') //закриття модального вікна
  modalImage.src = '' // очищення значення картинки
  modalImage.alt = ''
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowLeftPress);
  window.removeEventListener('keydown', onArrowRightPress);
}
//Закрытие модального окна по клику на div.lightbox__overlay.
modalOverlay.addEventListener('click', onOverlay)
function onOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    onModalCloseClick();
  }
}
//Закрытие модального окна по нажатию клавиши ESC
function onEscKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const pressEscKey = evt.code === ESC_KEY_CODE;
  if (pressEscKey) {
    onModalCloseClick();
  }
}
 //Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
// вліво
function onArrowLeftPress (evt) {
  const ARR_LEFT_KEY_CODE = 'ArrowLeft'
  const pressArrowLeft = evt.code === ARR_LEFT_KEY_CODE;
  if (pressArrowLeft) {
    const sources = galleryItems.map(({ original }) => original)
    let indexOfCurrentImg = sources.indexOf(modalImage.src)
  if (indexOfCurrentImg === 0) {
      indexOfCurrentImg = sources.length
    }
    modalImage.src = sources[indexOfCurrentImg - 1]
    console.log(indexOfCurrentImg)
  }
}
//вправо
function onArrowRightPress (evt) {
const ARR_RIGHT_KEY_CODE = 'ArrowRight';
const pressArrowRight = evt.code === ARR_RIGHT_KEY_CODE
if (pressArrowRight) {
  const sources = galleryItems.map(({ original }) => original)
  let indexOfCurrentImg = sources.indexOf(modalImage.src)
if (indexOfCurrentImg +1 > sources.length-1) {
    indexOfCurrentImg = -1
  }
  modalImage.src = sources[indexOfCurrentImg + 1]
  console.log(indexOfCurrentImg +1)
}
} 


