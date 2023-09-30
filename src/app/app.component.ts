import { Component, HostBinding } from '@angular/core';
import { SharedService } from './notes/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'GoogleKeep';
  constructor(private sharedService: SharedService) {
    this.sharedService.isDarkMode$.subscribe((isDarkMode) => {
      document.documentElement.classList.toggle('light-mode', !isDarkMode);
    });
  }
}
