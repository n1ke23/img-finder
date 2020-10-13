
 // let query = 'js';
 // let page = 1;
 // let perPage = 12;
 
 export default {
   _query: 'cat', 
   page: 1, 
   perPage: 12,
   async fetchImages(){
     this.apiKey = '18623544-b4f5dbb9e909edd8c116f4e97';
     this.baseURL = "https://pixabay.com/api/";
     this.url = `${this.baseURL}?image_type=photo&orientation=horizontal&q=${this._query}&page=${this.page}&per_page=${this.perPage}&key=${this.apiKey}`;
     try {
        this.res = await fetch(this.url)
        this.getResponse = await this.res.json()
      }
      catch(error) {throw displayError(error)}
      return this.getResponse.hits
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
  refs.body.prepend(errorH2)
  
}
