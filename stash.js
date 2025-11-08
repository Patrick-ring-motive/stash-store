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
    url.searchParams.set('key',String(key));
    return String(url);
  }
  async get(key){
    try{
      if(this.cache instanceof Promise){
        this.cache = await this.cache;
      }
      const res = await this.cache.match(Stash.urlKey(key));
      return await res.clone().text();
    }catch(e){
      console.warn(e,key);
    }
  }
  async set(key,value){
    try{
      if(this.cache instanceof Promise){
        this.cache = await this.cache;
      }
      return await this.cache.put(Stash.urlKey(key),new Response(value));
    }catch(e){
      console.warn(e,key,value);
    }
  }
  async delete(key){
    try{
      if(this.cache instanceof Promise){
        this.cache = await this.cache;
      }
      return await this.cache.delete(Stash.urlKey(key));
    }catch(e){
      console.warn(e,key);
    }
  }
}
