import apiService from './apiService.js';
import refs from './refs.js';
import template from './../template/template.hbs';
import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';
import './../../node_modules/basiclightbox/dist/basicLightbox.min.js';
import "@babel/polyfill";

const loadMoreBtn = document.createElement('button');


refs.galleryList.addEventListener('click', (e)=> {
  e.preventDefault()
  console.log(e);
  if(e.target.nodeName == "IMG") {

    let modalSrc = e.target.dataset.src
    const instance = basicLightbox.create(`
      <div class="modal">
      <img src='${modalSrc}' alte='' class="js-img">
      </div>
      `)
    }
  instance.show();
  })

refs.form.addEventListener('input', debounce(e => {
e.preventDefault();
apiService.query = e.target.value
renderApi()
refs.galleryList.innerHTML = '';
refs.input.value = ""
}, 500))

function renderApi(){
  apiService.fetchImages().then((data) => renderImages(data));
}


function renderImages(data) {
  const item = template(data);
  loadMoreBtn.classList.add('loadMore-button')
  loadMoreBtn.textContent = "Load mod...";
   refs.galleryList.insertAdjacentHTML('beforeend', item)
   if(refs.galleryList != ""){
     refs.body.insertAdjacentElement('beforeend', loadMoreBtn)
     loadMoreBtn.classList.remove('hidden')
   } else {
     loadMoreBtn.classList.add('hidden')
   }
  }
  loadMoreBtn.addEventListener('click', loadMore)
function loadMore(){
  apiService.setPage()
  apiService.fetchImages().then((data) => renderImages(data));
  setTimeout(()=>{
  window.scrollTo({
    top: document.documentElement.offsetHeight -1500,
    behavior: 'smooth'
  });
  }, 500)
}
  