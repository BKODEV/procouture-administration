import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-pass-change',
    templateUrl: './pass-change.component.html',
    styleUrls: ['./pass-change.component.scss'],
    standalone: true,
    imports: [NgClass, RouterLink]
})

// Password Chage Component
export class PassChangeComponent {
  // set the currenr year
  year: number = new Date().getFullYear();

  fieldTextType!: boolean;
  fieldTextType1!: boolean;

  /**
 * Password Hide/Show
 */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }
}
