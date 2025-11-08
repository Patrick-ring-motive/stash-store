class Stash{
  constructor(name=''){
    try{
      this.cache = caches.open('stash'+String(name));
    }catch(e){
      console.warn(e);
    }
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
