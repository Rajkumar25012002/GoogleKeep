import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  showLabels:boolean = false;
  private isGridDisplaySubject = new BehaviorSubject<boolean>(true);
  isGridDisplay$ = this.isGridDisplaySubject.asObservable();
  showAllLabels() :void{
    this.showLabels = true; 
  }
  toggleGridDisplay() :void{
    this.isGridDisplaySubject.next(!this.isGridDisplaySubject.getValue());
  }
  hideAllLabels() :void{
    this.showLabels = false;
  }
  toggleAllLabels() :void{
    this.showLabels = !this.showLabels
  }
}
