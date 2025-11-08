class Stash{
  constructor(name=''){
    try{
      this.cache = caches.open('stash'+String(name));
    }catch(e){
      console.warn(e);
    }
  }
  static urlKey(key){
    const url = new URL('https://stash.store/');
    url.searchParams.set('key',key);
    return String(url);
  }
  async get(key){
    try{
      if(this.cache instanceof Promise){
        this.cache = await this.cache;
      }
      return await this.cache.match(Stash.urlKey(key));
    }catch(e){
      console.warn(e,key);
    }
  }
}
