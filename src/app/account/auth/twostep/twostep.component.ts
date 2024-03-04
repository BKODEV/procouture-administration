import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
    selector: 'app-twostep',
    templateUrl: './twostep.component.html',
    styleUrls: ['./twostep.component.scss'],
    standalone: true,
    imports: [NgOtpInputModule, RouterLink]
})
  
// Two step component
export class TwostepComponent {
  // set the currenr year
  year: number = new Date().getFullYear();

  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '80px',
      'height': '50px'
    }
  };
  
}
