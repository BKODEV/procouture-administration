import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from '../global-component';


const base_url = GlobalComponent.API_URL
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }


  login(username : string, password : string) {
     return this.http.post(`${base_url}/admin/login`, {username : username, password : password, role : 'web'})
  }


  logout(){
      // Perform any additional logout logic, e.g., calling an API to invalidate the token
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
  }
}
