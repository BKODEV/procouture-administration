import { Component } from '@angular/core';

@Component({
    selector: 'app-offline',
    templateUrl: './offline.component.html',
    styleUrls: ['./offline.component.scss'],
    standalone: true
})
  
// Offline Component
export class OfflineComponent {
  // set the currenr year
  year: number = new Date().getFullYear();
}
