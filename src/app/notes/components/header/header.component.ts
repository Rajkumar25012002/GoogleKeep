import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isInputFocus: boolean = false;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  isGridDisplay: boolean = true;
  isChangeDisplayInProgress: boolean = false;
  isChangeDarkModeInProgress: boolean = false;
  searchQuery: string = '';
  isSearchRoute: boolean = false;
  routeParams: any = [];
  isDarkMode: boolean = true;
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
      clickAction: () => {
        if (!this.isChangeDarkModeInProgress) {
          this.toggleDarkMode();
        }
      },
      iconName: 'Dark mode',
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
    this.sharedService.activeRoute$.subscribe((activeRoute) => {
      if (activeRoute?.url === 'searchNote') {
        this.isSearchRoute = true;
        this.isInputFocus = true;
      }
      this.routeParams = activeRoute?.params;
    });
    this.sharedService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      this.navIconsData[3].iconClasses = !isDarkMode
        ? 'fa-solid fa-sun'
        : 'fa-solid fa-circle-half-stroke';
      this.navIconsData[3].iconName = !isDarkMode ? 'Light mode' : 'Dark mode';
    });
  }
  setSearchQuery(): void {
    this.sharedService.setSearchQuery(this.searchQuery);
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
  onInputBlur() {
    setTimeout(() => {
      this.isInputFocus = false;
    }, 250);
  }
  navigateToSearch() {
    if (this.isSearchRoute) return;
    this.router.navigate(['searchNote']);
  }
  clearSearchInput() {
    this.searchQuery = '';
    this.isSearchRoute = false;
    this.routeParams = [];
    this.router.navigate(['/']);
  }
  toggleDarkMode() {
    this.isChangeDarkModeInProgress = true;
    this.sharedService.setIsDarkMode();
    setTimeout(() => {
      this.isChangeDarkModeInProgress = false;
    }, 500);
  }
}
