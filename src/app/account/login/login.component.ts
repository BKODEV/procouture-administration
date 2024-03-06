import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {  CommonModule, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { GlobalComponent } from 'src/app/global-component';

const base_url = GlobalComponent.API_URL;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgClass, RouterLink]
})
// Login Component
export class LoginComponent {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  a: any = 10;
  b: any = 20;
  toast!: false;

  // set the current year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder,
    private router: Router,
    private http : HttpClient,
    private auth : AuthService
) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') && localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      username: ['username', [Validators.required]],
      password: ['123456', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    const username = this.f['username'].value; // Get the username from the form
    const password = this.f['password'].value; // Get the password from the form

    // Login Api
    this.login(username, password)

        //Redirection
        this.router.navigate(['/'])
  }
  
  login(username: string, password: string) {
    if (username && password) {
      // Perform login
      this.auth.login(username, password).subscribe({
        next : (data : any) => {
          localStorage.setItem('currentUser',JSON.stringify(data.user))
          localStorage.setItem('authToken',data.token)
          this.router.navigate(['/'])
        },
        error : (e) => console.log(e),
      })
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
