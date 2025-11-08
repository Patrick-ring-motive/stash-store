class Stash{
  constructor(name=''){
    try{
      this['&cache'] = caches.open('stash'+String(name));
    }catch(e){
      console.warn(e);
    }
  }
}
