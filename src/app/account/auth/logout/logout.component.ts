import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
  
// Logout Component
export class LogoutComponent {
  // set the currenr year
  year: number = new Date().getFullYear();
}
