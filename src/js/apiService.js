
 const apiKey = '18623544-b4f5dbb9e909edd8c116f4e97';
 const baseURL = "https://pixabay.com/api/";
 // let query = 'js';
 // let page = 1;
 // let perPage = 12;
 
 export default {
   _query: 'cat', 
   page: 1, 
   perPage: 12,
   async fetchImages(){
     let url = `${baseURL}?image_type=photo&orientation=horizontal&q=${this._query}&page=${this.page}&per_page=${this.perPage}&key=${apiKey}`;
     try {
        const res = await fetch(url)
        const getResponse = await res.json()
      }
      catch(error) {throw error}
      return getResponse
  },
  setPage(){
    return this.page++
  },
  get query(){
    return this._query
  },
  set query(newQuery){
    this._query = newQuery;
  },
}
function displayError (error) {
  const errorH2 = document.createElement('h2');
  errorH2.textContent = error;
  // refs.body.insertAdjacentElement('afterbegin', errorH2)
  refs.body.prepend(errorH2)
}
