import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private sharedService: SharedService) {}
  isGridDisplay: boolean = true;
  isChangeDisplayInProgress: boolean = false;
  navIconsData: any[] = [
    {
      iconClasses: 'fa-solid fa-rotate-right',
      clickAction: () => {},
      iconName: 'Refresh',
      showIcon: true,
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-grip',
      clickAction: () => {
        if (!this.isChangeDisplayInProgress) {
          this.changeDisplay();
        }
      },
      iconName: 'Grid view',
      showIcon: this.isGridDisplay,
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-grip-lines',
      clickAction: () => {
        if (!this.isChangeDisplayInProgress) {
          this.changeDisplay();
        }
      },
      iconName: 'List view',
      showIcon: !this.isGridDisplay,
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-circle-half-stroke',
      clickAction: () => {},
      iconName: 'Background mode',
      showIcon: true,
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-user',
      clickAction: () => {},
      iconName: 'Profile',
      showIcon: true,
      showName: false,
    },
  ];
  ngOnInit() {
    this.navIconsData[1].showIcon = this.isGridDisplay;
    this.navIconsData[2].showIcon = !this.isGridDisplay;
    this.sharedService.isGridDisplay$.subscribe((isGridDisplay) => {
      this.isGridDisplay = isGridDisplay;
    });
  }
  showIconName(iconName: string): void {
    this.navIconsData.map((icon) => {
      icon.showName = icon.iconName === iconName;
    });
  }

  hideIconName(): void {
    this.navIconsData.forEach((icon) => {
      icon.showName = false;
    });
  }
  changeDisplay(): void {
    this.isChangeDisplayInProgress = true;
    this.isGridDisplay = !this.isGridDisplay;
    this.sharedService.toggleGridDisplay();
    this.navIconsData[1].showIcon = this.isGridDisplay;
    this.navIconsData[2].showIcon = !this.isGridDisplay;
    setTimeout(() => {
      this.isChangeDisplayInProgress = false;
    }, 500);
  }
  toggleAllLabels() {
    this.sharedService.toggleAllLabels();
  }
}
