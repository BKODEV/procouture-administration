import { Component } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RightsidebarComponent } from '../rightsidebar/rightsidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HorizontalTopbarComponent } from '../horizontal-topbar/horizontal-topbar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
    selector: 'app-horizontal',
    templateUrl: './horizontal.component.html',
    styleUrls: ['./horizontal.component.scss'],
    standalone: true,
    imports: [TopbarComponent, HorizontalTopbarComponent, RouterOutlet, FooterComponent, RightsidebarComponent, NgxSpinnerModule]
})
export class HorizontalComponent {
  constructor() { }

  isCondensed = false;

  ngOnInit(): void {
  }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
    const rightBar = document.getElementById('theme-settings-offcanvas');
    if (rightBar != null) {
      rightBar.classList.toggle('show');
      rightBar.setAttribute('style', "visibility: visible;");
    }
  }

  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {
    if (document.documentElement.clientWidth <= 1024) {
      document.body.classList.toggle('menu');
    }
  }
}
