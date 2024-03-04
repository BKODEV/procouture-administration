import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-error500',
    templateUrl: './error500.component.html',
    styleUrls: ['./error500.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
  
// Eror 500 component
export class Error500Component {
// set the currenr year
year: number = new Date().getFullYear();
}
