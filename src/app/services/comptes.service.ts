import { Injectable } from '@angular/core';
import { GlobalComponent } from '../global-component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CompteResponse } from '../types/compte.type';
import { map } from 'rxjs';


const url = GlobalComponent.API_URL


@Injectable({
  providedIn: 'root'
})

export class ComptesService {
  private cachedComptes!: any[]; // Cache for comptes data


  constructor(private http : HttpClient, private router : Router) { }





  getComptes () {
    return this.http.get<CompteResponse>('http://127.0.0.1:8000/api/admin/comptes',)
      .pipe(
        map(response => response.data.comptes)
      )
  }

  
}
