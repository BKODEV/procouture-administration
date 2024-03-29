import { Injectable } from '@angular/core';
import { GlobalComponent } from '../global-component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommercialHttpResponse, CommercialRequest } from '../types/commerciaux.type';
import { catchError, map, throwError } from 'rxjs';

const baseUrl = GlobalComponent.API_URL
const currentLink = baseUrl + '/admin/commercial'
@Injectable({
  providedIn: 'root'
})
export class CommerciauxService {

  constructor(private http : HttpClient) { }



  getAllCommerciaux() {
    return this.http.get<CommercialHttpResponse>(`${currentLink}`).pipe(
      map( (response) => response.data.commerciaux)
    )
  }

  addCommercial(data : CommercialRequest){
      return this.http.post(currentLink,data).pipe(
        catchError(err => {
          console.log(err);
          throw err;
        })
      )
  }


  updateCommercial(idCommercial : any, data : CommercialRequest){
    return this.http.put<CommercialHttpResponse>(`${currentLink}/${idCommercial}`, data).pipe(
      map( (response) => response.data.commerciaux)
    )
  }


  deleteCommercial(idCommercial : any) {
    return this.http.delete(`${currentLink}/${idCommercial}`)
  }

  restreindreCommercial(idCommercial : any) {
    return this.http.put(`${currentLink}/${idCommercial}/set-inactive`,{})
  }

  activeCommercial(idCommercial : any) {
    return this.http.put(`${currentLink}/${idCommercial}/set-active`,{})
  }

  }




