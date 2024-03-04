import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-error404',
    templateUrl: './error404.component.html',
    styleUrls: ['./error404.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
  
// error 404 component
export class Error404Component {
// set the currenr year
year: number = new Date().getFullYear();
}