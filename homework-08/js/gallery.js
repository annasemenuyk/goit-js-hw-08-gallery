import galleryItems from '../images/app.js'
//console.log(galleryItems);
import refs from '../js/refs.js'
//console.log(refs);
const {list, modal, button} =refs;
//console.log(list, modal, button);
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
console.log (markup)
list.insertAdjacentHTML("afterbegin", markup)
