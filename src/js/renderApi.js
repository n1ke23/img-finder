import apiService from './apiService.js';
import refs from './refs.js';
import template from './../template/template.hbs';
import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';
import './../../node_modules/basiclightbox/dist/basicLightbox.min.js';

refs.galleryList.addEventListener('click', (e)=>{
  const imageModal = document.querySelector('.js-img');
  if(e.target.nodeName === "IMG") {
    modalSrc = e.target.dataset.src
    const instance = basicLightbox.create(`
    <div class="modal">
    <img src='${modalSrc}' alte='' class="js-img">
    </div>
    `)
  }
    
  instance.show();
     })

refs.form.addEventListener('input', 
  debounce(e => {
e.preventDefault();
refs.galleryList.innerHTML = '';
apiService.query = e.target.value
renderApi()
refs.input.value = ""
}, 500),
)

function renderApi(){
  apiService.fetchImages().then(({hits}) => renderImages(hits));
}

const loadMoreBtn = document.createElement('button');
loadMoreBtn.classList.add('loadMore-button')
loadMoreBtn.textContent = "Load mod...";

 function renderImages(data) {
   const item = template(data);
   refs.galleryList.insertAdjacentHTML('beforeend', item)
   if(refs.galleryList !== ""){
     refs.body.insertAdjacentElement('beforeend', loadMoreBtn)
     loadMoreBtn.classList.remove('hidden')
   } else {
     loadMoreBtn.classList.add('hidden')
   }
  }
  loadMoreBtn.addEventListener('click', loadMore)
function loadMore(){
  apiService.setPage()
  apiService.fetchImages().then(({hits}) => renderImages(hits));
  setTimeout(()=>{
  window.scrollTo({
    top: document.documentElement.offsetHeight -1500,
    left: 100,
    behavior: 'smooth'
  });
  }, 500)
}
  