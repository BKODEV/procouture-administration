import { Component } from '@angular/core';

import { EventService } from '../../core/services/event.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RightsidebarComponent } from '../rightsidebar/rightsidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { TwoColumnSidebarComponent } from '../two-column-sidebar/two-column-sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
    selector: 'app-two-column',
    templateUrl: './two-column.component.html',
    styleUrls: ['./two-column.component.scss'],
    standalone: true,
    imports: [TopbarComponent, TwoColumnSidebarComponent, RouterOutlet, FooterComponent, RightsidebarComponent, NgxSpinnerModule]
})

/**
 * TwoColumnComponent
 */
export class TwoColumnComponent {

  constructor(public eventService: EventService) {

  }
  isCondensed = false;

  ngOnInit() {

    window.addEventListener('resize', () => {
      if (document.documentElement.getAttribute('data-layout') == "twocolumn") {
        if (document.documentElement.clientWidth <= 767) {
          this.eventService.broadcast('changeLayout', 'vertical');
          document.documentElement.setAttribute('data-layout', 'vertical');
          document.body.classList.add('twocolumn-panel');
        } else {
          this.eventService.broadcast('changeLayout', 'twocolumn');
          document.documentElement.setAttribute('data-layout', 'twocolumn');
          document.body.classList.remove('twocolumn-panel');
        }
      }
      else {
        if (document.body.classList.contains('twocolumn-panel')) {
          if (document.documentElement.clientWidth <= 767) {
            this.eventService.broadcast('changeLayout', 'vertical');
            document.documentElement.setAttribute('data-layout', 'vertical');
          } else {
            this.eventService.broadcast('changeLayout', 'twocolumn');
            document.documentElement.setAttribute('data-layout', 'twocolumn');
            document.body.classList.remove('twocolumn-panel')
          }
        }
      }
    })
  }


  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {
    if (document.documentElement.clientWidth <= 767) {
      document.body.classList.toggle('vertical-sidebar-enable');
    } else {
      document.body.classList.toggle('twocolumn-panel');
    }
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

}
