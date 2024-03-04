import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-success-msg',
    templateUrl: './success-msg.component.html',
    styleUrls: ['./success-msg.component.scss'],
    standalone: true,
    imports: [RouterLink]
})

// Success Message Component
export class SuccessMsgComponent {
  // set the currenr year
  year: number = new Date().getFullYear();
}
