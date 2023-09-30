import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  showLabels: boolean = false;
  private isGridDisplaySubject = new BehaviorSubject<boolean>(true);
  isGridDisplay$ = this.isGridDisplaySubject.asObservable();
  private activeRoute: BehaviorSubject<{
    url: string;
    params: { [x: string]: any };
  } | null> = new BehaviorSubject<{
    url: string;
    params: { [x: string]: any };
  } | null>(null);
  activeRoute$ = this.activeRoute.asObservable();
  searchQuery = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuery.asObservable();
  isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();
  showAllLabels(): void {
    this.showLabels = true;
  }
  toggleGridDisplay(): void {
    this.isGridDisplaySubject.next(!this.isGridDisplaySubject.getValue());
  }
  hideAllLabels(): void {
    this.showLabels = false;
  }
  toggleAllLabels(): void {
    this.showLabels = !this.showLabels;
  }
  setActiveRoute(route: ActivatedRoute): void {
    this.activeRoute.next({
      params: route.snapshot.params,
      url: route.snapshot.url[0].path,
    });
  }
  setSearchQuery(query: string): void {
    this.searchQuery.next(query);
  }
  setIsDarkMode(): void {
    this.isDarkMode.next(!this.isDarkMode.getValue());
  }
}
