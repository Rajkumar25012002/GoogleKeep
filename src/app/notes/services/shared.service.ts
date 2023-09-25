import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  showLabels:boolean = false;
  showAllLabels() :void{
    this.showLabels = true; 
  }

  hideAllLabels() :void{
    this.showLabels = false;
  }
  toggleAllLabels() :void{
    this.showLabels = !this.showLabels
  }
}
