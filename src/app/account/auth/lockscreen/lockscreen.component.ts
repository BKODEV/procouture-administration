import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-lockscreen',
    templateUrl: './lockscreen.component.html',
    styleUrls: ['./lockscreen.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
  
// Lock Screen Component
export class LockscreenComponent {
  // set the currenr year
  year: number = new Date().getFullYear();
}
