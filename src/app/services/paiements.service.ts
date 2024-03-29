import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from '../global-component';
import { map } from 'rxjs';
import { ResponseHttpPaiement } from '../types/paiement.type';


const base_url = GlobalComponent.API_URL
const PAIEMENT_URL = base_url + "/admin/paiements"

@Injectable({
  providedIn: 'root'
})
export class PaiementsService {

  constructor(private http : HttpClient) { }



  getAllPaiements() {
    return this.http.get<ResponseHttpPaiement>(PAIEMENT_URL).pipe(
      map(body => {return body.data.paiements})
    )
  }
}
