import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { GlobalComponent } from '../global-component';

const base_url = GlobalComponent.API_URL
const FORMULE_URL = base_url + "/abonnement/offres"
const ABONNEMENT_URL = base_url + "/abonnements"


@Injectable({
  providedIn: 'root'
})
export class FormuleAbonnementService {

  constructor(private http : HttpClient) { }


  


  getSubscriptionFormule(){
    return this.http.get<any>(FORMULE_URL)
  }


  addSubscription(data : any){
    return this.http.post<any>(ABONNEMENT_URL,{compte : data.compte, formule : data.formule })
  }


  
}