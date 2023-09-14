export default class Section {
  constructor({item, renderer}, classSelector){
    this._item = item;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector)
  }

  renderer(){
    this._item.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element){
    this._container.append(element);
  }
}