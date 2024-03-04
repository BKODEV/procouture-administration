import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    standalone: true,
    imports: [RouterLink, NgClass]
})

// Signin Component
export class SigninComponent {
  // set the currenr year
  year: number = new Date().getFullYear();
  fieldTextType!: boolean;

  constructor() {
  }

    /**
   * Password Hide/Show
   */
    toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
    }
}
