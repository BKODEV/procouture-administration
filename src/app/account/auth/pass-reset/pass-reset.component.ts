import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pass-reset',
    templateUrl: './pass-reset.component.html',
    styleUrls: ['./pass-reset.component.scss'],
    standalone: true,
    imports: [RouterLink]
})

// Password Reset 
export class PassResetComponent {
  // set the currenr year
  year: number = new Date().getFullYear();
}
