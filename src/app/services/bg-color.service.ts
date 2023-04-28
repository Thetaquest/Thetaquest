import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BgColorService {

  private _bodyElement;
  private _htmlElement;
  constructor() {
    this._htmlElement = document.getElementsByTagName('html')[0]  
    this._bodyElement = document.getElementsByTagName('body')[0]
  }

  updateBodyClass(customBodyClass: string) {
    this._htmlElement.className = customBodyClass;
    this._bodyElement.className = customBodyClass;
    //this._bodyElement.classList.add(customBodyClass);
  }
}
